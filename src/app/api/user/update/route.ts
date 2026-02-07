import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { birthday } = body;

        // Basic validation
        if (!birthday) {
            return new NextResponse("Birthday is required", { status: 400 });
        }

        const client = await clerkClient();

        await client.users.updateUser(userId, {
            unsafeMetadata: {
                birthday: birthday
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[USER_UPDATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
