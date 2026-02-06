# User Management Guide

**How to manage, suspend, and ban users on SingIt Pop.**

---

## 🔐 Your Legal Rights

**You have the legal right to suspend or terminate any user who violates your Terms & Conditions.**

### Covered in Terms & Conditions (Section 7)

> "We reserve the right to suspend or terminate your account if you:
> - Violate these Terms
> - Engage in fraudulent or illegal activity
> - Fail to pay subscription fees"

**This applies to ALL users, regardless of login method:**
- Email/password users
- Google OAuth users
- Any future OAuth providers (Apple, Facebook, etc.)

**UK Law:** You have the contractual right to terminate service for breach of terms. This is standard practice and legally enforceable.

---

## 👥 User Tiers

### Current Tiers
1. **Free** - Preview access only (30 seconds)
2. **Insider** - Full streaming + monthly downloads
3. **VIP** - All Insider benefits + early access + high-res downloads

### Where Tier is Stored
- **Clerk:** Handles authentication (login/signup)
- **Your Database (Supabase):** Stores user tier, status, permissions

---

## 🚫 How to Suspend a User

### Option 1: Database Flag (Recommended)

**Step 1: Add Status Field to Database**

If not already added, update your user schema:

```sql
ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active';
ALTER TABLE users ADD COLUMN suspended_reason TEXT;
ALTER TABLE users ADD COLUMN suspended_at TIMESTAMP;
```

**Step 2: Update User Status**

```sql
UPDATE users 
SET status = 'suspended',
    suspended_reason = 'Abusive behavior in community features',
    suspended_at = NOW()
WHERE clerk_id = 'user_abc123';
```

**Step 3: Add Middleware Check**

In your protected routes, check user status:

```typescript
// src/middleware.ts or in API routes
import { auth } from '@clerk/nextjs';

export async function checkUserStatus(userId: string) {
    const user = await db.users.findUnique({ 
        where: { clerkId: userId } 
    });
    
    if (user?.status === 'suspended' || user?.status === 'banned') {
        return {
            allowed: false,
            reason: user.suspendedReason || 'Account suspended'
        };
    }
    
    return { allowed: true };
}
```

**Step 4: Display Message to Suspended User**

```tsx
// In protected pages
const { allowed, reason } = await checkUserStatus(user.id);

if (!allowed) {
    return (
        <div className="suspended-notice">
            <h1>Account Suspended</h1>
            <p>{reason}</p>
            <p>Contact: <a href="mailto:legal@singitpop.com">legal@singitpop.com</a></p>
        </div>
    );
}
```

---

### Option 2: Clerk Ban (Nuclear Option)

**Use this only for severe cases (fraud, illegal activity).**

```typescript
import { clerkClient } from '@clerk/nextjs/server';

// Completely ban user from Clerk (they can't sign in at all)
await clerkClient.users.banUser('user_abc123');

// Unban later if needed
await clerkClient.users.unbanUser('user_abc123');
```

**Difference:**
- **Database flag:** User can still sign in, but can't access content
- **Clerk ban:** User can't sign in at all

**Recommendation:** Use database flag for most cases. It's more flexible.

---

## 📧 Suspension Notification Email

**Always notify users when you suspend them.**

### Email Template

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
- Appeal this decision: complaints@singitpop.com
- Request account deletion: privacy@singitpop.com

If you believe this is a mistake, please contact us within 14 days.

Best regards,
SingIt Pop Team

---
This is an automated message. For questions: legal@singitpop.com
```

---

## 🔍 Finding Users to Suspend

### In Clerk Dashboard

1. Go to https://dashboard.clerk.com
2. Navigate to "Users"
3. Search by email or name
4. Copy their `User ID` (starts with `user_`)

### In Your Database

```sql
-- Find user by email
SELECT * FROM users WHERE email = 'problem@example.com';

-- Find users with multiple failed payments
SELECT * FROM users WHERE payment_failures > 3;

-- Find users with suspicious activity
SELECT * FROM users WHERE created_at > NOW() - INTERVAL '1 day' AND downloads > 100;
```

---

## ⚖️ Suspension Reasons & Severity

### Immediate Suspension (Severe)
- **Fraud:** Chargebacks, stolen credit cards
- **Illegal Activity:** Piracy, hacking attempts
- **Harassment:** Abusive messages to other users
- **Bot Activity:** Automated scraping, mass downloads

### Warning First (Moderate)
- **Excessive Downloads:** Unusual download patterns
- **Account Sharing:** Multiple IPs, suspicious login locations
- **Spam:** Posting spam in community features

### No Action Needed (Minor)
- **Payment Failures:** Give them time to update payment method
- **Accidental Violations:** Educate, don't punish

---

## 🔄 Reinstatement Process

### If User Appeals

1. **Review the case** - Check logs, evidence
2. **Respond within 7 days** - Acknowledge their appeal
3. **Make a decision:**
   - **Uphold suspension:** Explain why
   - **Reinstate:** Apologize, restore access

### How to Reinstate

```sql
UPDATE users 
SET status = 'active',
    suspended_reason = NULL,
    suspended_at = NULL
WHERE clerk_id = 'user_abc123';
```

**Send confirmation email:**

```
Subject: Account Reinstated - SingIt Pop

Dear [User Name],

Your SingIt Pop account has been reinstated.

You now have full access to your [Tier] membership benefits.

We appreciate your understanding and look forward to having you back.

Best regards,
SingIt Pop Team
```

---

## 📊 Tracking Suspensions

### Create Suspension Log Table

```sql
CREATE TABLE suspension_log (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    action VARCHAR(20) NOT NULL, -- 'suspended', 'reinstated', 'banned'
    reason TEXT,
    performed_by VARCHAR(255), -- admin user ID
    performed_at TIMESTAMP DEFAULT NOW()
);
```

### Log Every Action

```sql
INSERT INTO suspension_log (user_id, action, reason, performed_by)
VALUES ('user_abc123', 'suspended', 'Abusive behavior', 'admin_xyz');
```

---

## 🛡️ Best Practices

### 1. **Be Transparent**
- Always explain why you suspended them
- Provide evidence if possible
- Give them a chance to appeal

### 2. **Be Consistent**
- Apply rules equally to all users
- Document your decision-making process

### 3. **Be Fair**
- Give warnings for first-time offenses
- Permanent bans only for severe cases

### 4. **Be Compliant**
- Follow GDPR (they can still request data deletion)
- Honor their consumer rights
- Keep suspension records for 6 months minimum

### 5. **Communicate**
- Send suspension email immediately
- Respond to appeals within 7 days
- Update them on status changes

---

## 🚨 Emergency Suspension

### If Immediate Action Required

**Example:** User is actively attacking your system

1. **Clerk Ban (immediate):**
   ```bash
   # Via Clerk Dashboard
   Users → [User] → Actions → Ban User
   ```

2. **Database Update (backup):**
   ```sql
   UPDATE users SET status = 'banned' WHERE clerk_id = 'user_abc123';
   ```

3. **Notify Team:**
   - Email legal@singitpop.com
   - Document the incident
   - Prepare evidence

4. **Follow Up:**
   - Send suspension email within 24 hours
   - Review logs for other affected users
   - Consider reporting to authorities (if illegal)

---

## 📞 Support Contacts

**For User Management Issues:**
- **Legal Questions:** legal@singitpop.com
- **Technical Issues:** (Your tech support email)
- **Clerk Support:** https://clerk.com/support

**For Users to Contact:**
- **Appeals:** complaints@singitpop.com
- **General:** info@singitpop.com

---

## 📝 Checklist: Suspending a User

- [ ] Verify violation (check logs, evidence)
- [ ] Determine severity (warning vs suspension vs ban)
- [ ] Update database status
- [ ] Send suspension notification email
- [ ] Log the action in suspension_log table
- [ ] Pause their subscription (if applicable)
- [ ] Document the reason
- [ ] Set reminder to review in 30 days (if temporary)

---

**Last Updated:** 6 February 2026  
**Review:** Quarterly or when policies change
