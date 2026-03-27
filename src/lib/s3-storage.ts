import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const SPONSORSHIPS_KEY = "data/sponsorships.json";

export async function getSponsorships(): Promise<Record<string, any>> {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: SPONSORSHIPS_KEY,
        });

        const response = await s3Client.send(command);
        const content = await response.Body?.transformToString();
        return content ? JSON.parse(content) : {};
    } catch (error: any) {
        if (error.name === "NoSuchKey") {
            return {};
        }
        console.error("Error fetching sponsorships from S3:", error);
        return {};
    }
}

export async function saveSponsorship(trackId: string, sponsorName: string, tier: string): Promise<boolean> {
    try {
        const currentSponsorships = await getSponsorships();
        currentSponsorships[trackId] = { name: sponsorName, tier };

        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: SPONSORSHIPS_KEY,
            Body: JSON.stringify(currentSponsorships, null, 2),
            ContentType: "application/json",
        });

        await s3Client.send(command);
        return true;
    } catch (error) {
        console.error("Error saving sponsorship to S3:", error);
        return false;
    }
}

const LICENSES_KEY = "data/issued_licenses.json";

export async function getIssuedLicenses(): Promise<any[]> {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: LICENSES_KEY,
        });
        const response = await s3Client.send(command);
        const content = await response.Body?.transformToString();
        return content ? JSON.parse(content) : [];
    } catch (error: any) {
        if (error.name === "NoSuchKey") return [];
        return [];
    }
}

export async function saveIssuedLicense(license: any): Promise<boolean> {
    try {
        const current = await getIssuedLicenses();
        current.push({
            ...license,
            issuedAt: new Date().toISOString()
        });

        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: LICENSES_KEY,
            Body: JSON.stringify(current, null, 2),
            ContentType: "application/json",
        });

        await s3Client.send(command);
        return true;
    } catch (error) {
        console.error("Error saving license to S3:", error);
        return false;
    }
}

const ARTBOOKS_KEY = "data/artbooks.json";

export async function getArtbookAccess(): Promise<Record<string, any>> {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: ARTBOOKS_KEY,
        });

        const response = await s3Client.send(command);
        const content = await response.Body?.transformToString();
        return content ? JSON.parse(content) : {};
    } catch (error: any) {
        if (error.name === "NoSuchKey") return {};
        console.error("Error fetching artbook access from S3:", error);
        return {};
    }
}

export async function saveArtbookAccess(token: string, albumId: string, customerEmail: string): Promise<boolean> {
    try {
        const currentData = await getArtbookAccess();
        currentData[token] = { 
            albumId, 
            email: customerEmail, 
            grantedAt: new Date().toISOString() 
        };

        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: ARTBOOKS_KEY,
            Body: JSON.stringify(currentData, null, 2),
            ContentType: "application/json",
        });

        await s3Client.send(command);
        return true;
    } catch (error) {
        console.error("Error saving artbook access to S3:", error);
        return false;
    }
}
