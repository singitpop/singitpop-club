# Google Sign-In & User Suspension Rights - Implementation Guide

## ✅ Legal Rights Confirmation

### You CAN Suspend/Terminate Abusive Users (Regardless of Login Method)

**Your Terms & Conditions (Section 7) already cover this:**

> "We reserve the right to suspend or terminate your account if you:
> - Violate these Terms
> - Engage in fraudulent or illegal activity
> - Fail to pay subscription fees"

**This applies to ALL users, regardless of how they sign in:**
- Email/password
- Google OAuth
- Any future OAuth providers (Apple, Facebook, etc.)

**UK Law Perspective:**
- ✅ You have the **contractual right** to terminate service for breach of terms
- ✅ This is **standard practice** and legally enforceable in the UK
- ✅ **No discrimination**: Applies equally to all authentication methods
- ✅ **GDPR compliant**: You can still process data for legitimate interests (fraud prevention, security)

**Important:** When you suspend a user:
1. They lose access to your service
2. Their Clerk account remains (Clerk manages authentication)
3. You control access via your database (user tier, status flags)
4. You should notify them of the reason (transparency requirement)

---

## 🔐 Adding Google Sign-In with Clerk

### Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com
   - Select your project or create a new one

2. **Enable Google+ API:**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

3. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   
4. **Configure OAuth Consent Screen** (if not done):
   - User type: "External"
   - App name: "SingIt Pop"
   - User support email: info@singitpop.club
   - Developer contact: info@singitpop.club
   - Scopes: Add `email` and `profile`
   - Save

5. **Create OAuth Client ID:**
   - Application type: "Web application"
   - Name: "SingIt Pop - Clerk"
   - **Authorized JavaScript origins:**
     - `https://singitpop.club`
     - `https://www.singitpop.club`
     - `http://localhost:3000` (for development)
   - **Authorized redirect URIs:**
     - Get this from Clerk Dashboard (see Step 2)
     - Format: `https://[your-clerk-frontend-api]/v1/oauth_callback`
   - Click "Create"
   - **Save the Client ID and Client Secret** (you'll need these)

---

### Step 2: Clerk Dashboard Setup

1. **Log in to Clerk Dashboard:**
   - Visit: https://dashboard.clerk.com
   - Select your "SingIt Pop" application

2. **Navigate to Social Connections:**
   - Go to "User & Authentication" → "Social Connections"
   - Or direct link: https://dashboard.clerk.com/apps/[your-app-id]/instances/[instance-id]/social-connections

3. **Enable Google:**
   - Find "Google" in the list
   - Toggle "Enable for sign-up and sign-in" to ON

4. **Use Custom Credentials:**
   - Toggle "Use custom credentials" to ON
   - **Client ID:** Paste from Google Cloud Console (Step 1.5)
   - **Client Secret:** Paste from Google Cloud Console (Step 1.5)
   - Click "Save"

5. **Copy Redirect URI:**
   - Clerk will show you the redirect URI
   - Format: `https://[your-frontend-api].clerk.accounts.dev/v1/oauth_callback`
   - **Go back to Google Cloud Console** and add this to "Authorized redirect URIs" (Step 1.5)

---

### Step 3: Test the Integration

**No code changes needed!** Clerk automatically adds Google as a sign-in option.

1. **Local Testing:**
   - Run `npm run dev`
   - Go to http://localhost:3000/sign-in
   - You should see a "Continue with Google" button

2. **Production Testing:**
   - Deploy to Vercel (already done automatically via GitHub)
   - Visit https://singitpop.club/sign-in
   - Test "Continue with Google"

3. **Verify User Data:**
   - Sign in with Google
   - Check Clerk Dashboard → "Users"
   - User should appear with Google as the authentication method

---

## 🎨 Customizing the Sign-In UI (Optional)

If you want to customize the Google button appearance:

### Option 1: Use Clerk's Default (Recommended)
- No changes needed
- Clerk automatically styles the Google button
- Matches your existing sign-in UI

### Option 2: Custom Button (Advanced)
```tsx
import { useSignIn } from '@clerk/nextjs';

export default function CustomGoogleButton() {
    const { signIn } = useSignIn();

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/club'
        });
    };

    return (
        <button onClick={signInWithGoogle} className="google-btn">
            <img src="/google-icon.svg" alt="Google" />
            Continue with Google
        </button>
    );
}
```

---

## 🚨 User Suspension Implementation

### How to Suspend a User (Regardless of Login Method)

**Current Implementation:**
Your app already uses Clerk for authentication. User access is controlled by:
1. **Clerk:** Handles authentication (email, Google, etc.)
2. **Your Database:** Stores user tier, status, permissions

**To Suspend a User:**

#### Option 1: Database Flag (Recommended)
Add a `status` field to your user records:

```typescript
// In your database schema
interface User {
    clerkId: string;
    email: string;
    tier: 'free' | 'insider' | 'vip';
    status: 'active' | 'suspended' | 'banned'; // NEW
    suspendedReason?: string; // NEW
    suspendedAt?: Date; // NEW
}
```

**Middleware Check:**
```typescript
// src/middleware.ts or in protected routes
import { auth } from '@clerk/nextjs';

export async function checkUserStatus(userId: string) {
    const user = await db.users.findUnique({ where: { clerkId: userId } });
    
    if (user?.status === 'suspended' || user?.status === 'banned') {
        return {
            allowed: false,
            reason: user.suspendedReason || 'Account suspended for Terms violation'
        };
    }
    
    return { allowed: true };
}
```

#### Option 2: Clerk Ban (Nuclear Option)
```typescript
import { clerkClient } from '@clerk/nextjs/server';

// Completely ban user from Clerk (they can't sign in at all)
await clerkClient.users.banUser(userId);

// Unban later if needed
await clerkClient.users.unbanUser(userId);
```

**Recommendation:** Use Option 1 (database flag) for most cases. It's more flexible and allows you to:
- Suspend temporarily
- Show custom messages
- Track suspension history
- Reinstate easily

---

## 📧 Suspension Notification Template

When you suspend a user, send them an email:

```
Subject: Account Suspended - SingIt Pop

Dear [User Name],

Your SingIt Pop account has been suspended due to a violation of our Terms & Conditions.

Reason: [Specific reason - e.g., "Abusive behavior in community features"]

What this means:
- You can no longer access premium content
- Your subscription has been paused (no further charges)
- Your data remains secure

What you can do:
- Review our Terms & Conditions: https://singitpop.club/terms
- Appeal this decision: complaints@singitpop.club
- Request account deletion: privacy@singitpop.club

If you believe this is a mistake, please contact us within 14 days.

Best regards,
SingIt Pop Team

---
This is an automated message. For questions: legal@singitpop.club
```

---

## ✅ Compliance Checklist

| Requirement | Status | Notes |
|-------------|--------|-------|
| Terms cover suspension rights | ✅ Yes | Section 7 - Termination |
| Applies to all login methods | ✅ Yes | No discrimination |
| GDPR compliant | ✅ Yes | Legitimate interest (security, fraud) |
| User notification required | ⚠️ Implement | Email template above |
| Appeal process | ✅ Yes | Complaints Procedure page |
| Data retention after suspension | ⚠️ Define | Recommend 90 days, then delete |

---

## 🔐 Google Sign-In Benefits

1. **Easier Onboarding:**
   - Users don't need to create a password
   - Faster sign-up process
   - Reduces friction

2. **Better Security:**
   - Google handles 2FA
   - No password storage on your end
   - OAuth 2.0 standard

3. **Trust:**
   - Users trust Google authentication
   - Reduces "yet another password" fatigue

4. **User Data:**
   - You get verified email
   - Profile picture (optional)
   - Name (optional)

---

## 🚀 Deployment Steps

### 1. Enable Google in Clerk Dashboard
- Follow Step 2 above
- **Estimated time:** 10 minutes

### 2. Configure Google Cloud Console
- Follow Step 1 above
- **Estimated time:** 15 minutes

### 3. Test Locally
- No code changes needed
- Just test the sign-in flow
- **Estimated time:** 5 minutes

### 4. Deploy to Production
- Already auto-deployed via Vercel
- Test on live site
- **Estimated time:** 5 minutes

**Total time:** ~35 minutes

---

## ❓ FAQ

**Q: Can users who signed up with email also link their Google account?**
A: Yes! Clerk supports account linking. If a user signs in with Google using the same email as their existing account, Clerk will merge them.

**Q: What if I suspend a user and they try to sign in with Google?**
A: They'll authenticate with Google successfully, but your middleware/database check will block access to protected content.

**Q: Can I add other OAuth providers (Apple, Facebook)?**
A: Yes! Same process in Clerk Dashboard. Apple Sign-In is recommended for iOS users.

**Q: Does this cost extra?**
A: Clerk's free tier includes social sign-ins. Google OAuth is free. No extra costs.

**Q: What data does Google share?**
A: Email (verified), name, profile picture. You can request additional scopes if needed.

---

## 📚 Resources

- **Clerk Google OAuth Docs:** https://clerk.com/docs/authentication/social-connections/google
- **Google Cloud Console:** https://console.cloud.google.com
- **Clerk Dashboard:** https://dashboard.clerk.com
- **UK GDPR Guidance:** https://ico.org.uk
- **Your Terms & Conditions:** https://singitpop.club/terms (Section 7)
