
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3";

const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const KEY = "analytics/visits.json";

export interface AnalyticsDay {
    total: number;
    countries: Record<string, number>;
}

export interface AnalyticsData {
    [date: string]: number | AnalyticsDay;
}

export async function getDailyVisits(): Promise<AnalyticsData> {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: KEY,
        });

        const response = await s3Client.send(command);
        const str = await response.Body?.transformToString();

        if (!str) return {};
        return JSON.parse(str);
    } catch (error: any) {
        if (error.name === "NoSuchKey") {
            return {};
        }
        console.error("[Analytics] Failed to fetch visits:", error);
        return {};
    }
}

export async function incrementDailyVisit(country?: string): Promise<void> {
    try {
        // 1. Get current data
        const data = await getDailyVisits();

        // 2. Increment today's count
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        
        let dayData = data[today];

        // Migration/Normalization: Convert number to AnalyticsDay
        if (typeof dayData === 'number' || !dayData) {
            dayData = {
                total: (dayData as number) || 0,
                countries: {}
            };
        }

        dayData.total += 1;
        if (country && country !== 'unknown') {
            dayData.countries[country] = (dayData.countries[country] || 0) + 1;
        }

        data[today] = dayData;

        // 3. Save back to S3
        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: KEY,
            Body: JSON.stringify(data),
            ContentType: "application/json",
            CacheControl: "no-cache"
        });

        await s3Client.send(command);
    } catch (error) {
        console.error("[Analytics] Failed to increment visit:", error);
    }
}
