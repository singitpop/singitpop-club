
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3";

const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const KEY = "analytics/visits.json";

export interface AnalyticsData {
    [date: string]: number;
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

export async function incrementDailyVisit(): Promise<void> {
    try {
        // 1. Get current data
        const data = await getDailyVisits();

        // 2. Increment today's count
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        data[today] = (data[today] || 0) + 1;

        // 3. Save back to S3
        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: KEY,
            Body: JSON.stringify(data),
            ContentType: "application/json",
            CacheControl: "no-cache"
        });

        await s3Client.send(command);
        // console.log(`[Analytics] Incremented visit for ${today}. New count: ${data[today]}`);
    } catch (error) {
        console.error("[Analytics] Failed to increment visit:", error);
    }
}
