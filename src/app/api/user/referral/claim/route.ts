import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const cookieStore = await cookies();
        const referralCode = cookieStore.get('referral_code')?.value;

        if (!referralCode) {
            return NextResponse.json({ message: 'No referral code found' });
        }

        const client = await clerkClient();
        const user = await client.users.getUser(userId);

        // check if already referred
        if (user.publicMetadata.referredBy) {
            // Clear cookie since they are already processed
            cookieStore.delete('referral_code');
            return NextResponse.json({ message: 'Already referred' });
        }

        // Prevent self-referral
        if (user.username === referralCode || user.id.endsWith(referralCode)) {
            cookieStore.delete('referral_code');
            return NextResponse.json({ message: 'Cannot refer self' });
        }

        // Find referrer by matching username (or ID slice logic if we used that)
        // Since useReferral uses username OR id slice, this lookup is tricky without a DB.
        // LIMITATION: Clerk Users API search is limited. 
        // We will assume code = username for now, or we have to search.
        // For Scale: We would use a lookup table. 
        // For MVP: We search users by username.

        const referrerList = await client.users.getUserList({
            username: [referralCode],
            limit: 1
        });

        let referrer = referrerList.data[0];

        // If not found by username, try to see if it matches an ID (fallback logic from hook)
        // This part is hard without iterating. 
        // We will stick to Username = Code for the MVP.

        if (!referrer) {
            console.log(`Referrer ${referralCode} not found`);
            cookieStore.delete('referral_code');
            return NextResponse.json({ message: 'Referrer not found' });
        }

        // Update Referrer Count
        const currentCount = (referrer.publicMetadata.referralCount as number) || 0;
        await client.users.updateUserMetadata(referrer.id, {
            publicMetadata: {
                referralCount: currentCount + 1
            }
        });

        // Update New User Metadata
        await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                referredBy: referralCode
            }
        });

        // Consume cookie
        cookieStore.delete('referral_code');

        return NextResponse.json({ success: true, referrer: referrer.username });

    } catch (error) {
        console.error("Referral Claim Error:", error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
