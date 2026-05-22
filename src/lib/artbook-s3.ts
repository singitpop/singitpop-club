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
const PREFIX = "shop/artbook_access/";

export interface ArtbookAccess {
    id: string; // Token UUID
    albumId: string;
    customerEmail: string;
    purchasedAt: string;
}

export async function createArtbookAccess(albumId: string, email: string): Promise<string | null> {
    try {
        const id = uuidv4();
        const access: ArtbookAccess = {
            id,
            albumId,
            customerEmail: email,
            purchasedAt: new Date().toISOString()
        };

        const key = `${PREFIX}${id}.json`;

        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: JSON.stringify(access),
            ContentType: "application/json",
            CacheControl: "max-age=31536000, immutable" 
        });

        await s3Client.send(command);
        return id;
    } catch (error) {
        console.error("Error creating artbook access:", error);
        return null;
    }
}

export async function getArtbookAccess(token: string): Promise<ArtbookAccess | null> {
    try {
        const key = `${PREFIX}${token}.json`;
        const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
        const res = await s3Client.send(cmd);

        if (res.Body) {
            const str = await res.Body.transformToString();
            return JSON.parse(str) as ArtbookAccess;
        }
        return null;
    } catch (e) {
        return null;
    }
}
