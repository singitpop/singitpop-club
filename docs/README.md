# SingIt Pop Documentation

**Complete documentation for managing and operating the SingIt Pop website.**

---

## 📚 Documentation Structure

### 1. Legal Compliance (`/docs/legal/`)
- **[Complete Legal Compliance Walkthrough](./legal/complete-legal-compliance.md)** - Overview of all 7 legal pages
- **[Additional Legal Requirements](./legal/additional-legal-requirements.md)** - DMCC Act 2024 compliance details
- **[Google Sign-In & User Suspension](./legal/google-signin-user-suspension.md)** - OAuth setup + legal rights to suspend users

### 2. Setup & Configuration (`/docs/setup/`)
- **[Google OAuth Setup Guide](./setup/google-oauth-setup.md)** - Step-by-step Google sign-in integration
- **[Email Aliases Configuration](./setup/email-aliases.md)** - All required email addresses
- **[Environment Variables](./setup/environment-variables.md)** - Required .env configuration

### 3. Features & Enhancements (`/docs/features/`)
- **[Feature Suggestions by Tier](./features/tier-based-suggestions.md)** - Ideas for Free, Insider, VIP members
- **[Roadmap](./features/roadmap.md)** - Planned features and priorities

### 4. Operations (`/docs/operations/`)
- **[User Management](./operations/user-management.md)** - How to suspend/ban users
- **[Content Updates](./operations/content-updates.md)** - Adding music, albums, projects
- **[Deployment Guide](./operations/deployment.md)** - How to deploy changes
- **[Troubleshooting](./operations/troubleshooting.md)** - Common issues and fixes

---

## 🚀 Quick Start

### For Legal Compliance
1. Read: [Complete Legal Compliance Walkthrough](./legal/complete-legal-compliance.md)
2. Action: Set up email aliases (already done ✅)
3. Action: Fill in Company Info placeholders

### For Adding Google Sign-In
1. Read: [Google OAuth Setup Guide](./setup/google-oauth-setup.md)
2. Estimated time: 35 minutes
3. No code changes required

### For Managing Users
1. Read: [User Management](./operations/user-management.md)
2. Learn how to suspend abusive users
3. Understand your legal rights

---

## 📋 Action Items Checklist

### Immediate (Before Next Sale)
- [x] Set up 6 email aliases (@singitpop.com)
- [ ] Fill in Company Info page placeholders:
  - [ ] Business structure (Sole Trader or Limited Company)
  - [ ] Company registration number
  - [ ] VAT number (if applicable)
  - [ ] Registered address
  - [ ] ICO registration number (if applicable)
  - [ ] ADR provider name and details

### Before Autumn 2026 (DMCC Act Deadline)
- [ ] Implement subscription renewal reminder emails (7 days before payment)
- [ ] Add easy cancellation button in account settings
- [ ] Add checkout consent checkboxes for digital downloads
- [ ] Track cooling-off periods (14 days)

### Optional Enhancements
- [ ] Enable Google sign-in (see setup guide)
- [ ] Add Apple sign-in for iOS users
- [ ] Implement feature suggestions from tier-based guide

---

## 🔗 External Resources

- **Clerk Dashboard:** https://dashboard.clerk.com
- **Google Cloud Console:** https://console.cloud.google.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repository:** https://github.com/singitpop/singitpop-club
- **UK GDPR Guidance:** https://ico.org.uk
- **Consumer Rights:** https://citizensadvice.org.uk

---

## 📧 Contact Emails

All emails are aliases to your main account:

- **privacy@singitpop.com** - Privacy & GDPR inquiries
- **legal@singitpop.com** - Terms & legal matters
- **accessibility@singitpop.com** - Accessibility feedback
- **refunds@singitpop.com** - Refund requests
- **info@singitpop.com** - General inquiries
- **complaints@singitpop.com** - Formal complaints

---

## 🛠️ Technical Stack

- **Frontend:** Next.js 14 (App Router)
- **Authentication:** Clerk
- **Payments:** Stripe
- **Database:** Supabase (PostgreSQL)
- **Storage:** AWS S3
- **Hosting:** Vercel
- **Email:** (Your email provider)

---

## 📝 Document Maintenance

**Last Updated:** 6 February 2026

**Update Frequency:**
- Legal docs: Review quarterly or when legislation changes
- Setup guides: Update when services change (Clerk, Google, etc.)
- Feature suggestions: Update monthly based on user feedback
- Operations: Update as processes evolve

---

## 🆘 Getting Help

If you need assistance:

1. **Check documentation** in this folder first
2. **Search GitHub issues** for similar problems
3. **Contact support:**
   - Clerk: https://clerk.com/support
   - Vercel: https://vercel.com/support
   - Stripe: https://support.stripe.com

---

**Version:** 1.0  
**Created:** 6 February 2026  
**Maintained by:** Gary Birrell
