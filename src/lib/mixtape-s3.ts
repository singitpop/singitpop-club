import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
});

const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const PREFIX = "shop/mixtapes/";

export interface Mixtape {
    id: string; // UUID
    to: string;
    from: string;
    occasion: string;
    message: string;
    tracks: string[]; // List of track unique IDs ("album-track")
    createdAt: string;
    theme: 'pink' | 'purple' | 'gold' | 'cyan';
    orderId?: string; // Stripe Session ID
}

export async function saveMixtape(mixtape: Partial<Mixtape>): Promise<string | null> {
    try {
        const id = mixtape.id || uuidv4();
        const fullMixtape: Mixtape = {
            id,
            to: mixtape.to || "Someone Special",
            from: mixtape.from || "A Fan",
            occasion: mixtape.occasion || "Just Because",
            message: mixtape.message || "Enjoy this custom music selection!",
            tracks: mixtape.tracks || [],
            createdAt: mixtape.createdAt || new Date().toISOString(),
            theme: mixtape.theme || 'pink',
            orderId: mixtape.orderId
        };

        const key = `${PREFIX}${id}.json`;

        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: JSON.stringify(fullMixtape),
            ContentType: "application/json",
            CacheControl: "max-age=31536000, immutable" // Gift links are permanent
        });

        await s3Client.send(command);
        return id;
    } catch (error) {
        console.error("Error saving mixtape:", error);
        return null;
    }
}

export async function getMixtape(id: string): Promise<Mixtape | null> {
    try {
        const key = `${PREFIX}${id}.json`;
        const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
        const res = await s3Client.send(cmd);

        if (res.Body) {
            const str = await res.Body.transformToString();
            return JSON.parse(str) as Mixtape;
        }
        return null;
    } catch (e) {
        console.error(`Mixtape ${id} not found:`, e);
        return null;
    }
}
