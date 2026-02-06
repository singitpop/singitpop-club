# Additional UK Legal Requirements - Implementation Plan

## 🎯 Objective

Implement additional UK legal documentation required for selling digital goods (ringtones, downloads), providing services (song requests), and streaming music subscriptions.

---

## 📋 Research Findings

### Critical New Requirements (2026)

#### 1. **Digital Markets, Competition and Consumers Act 2024 (DMCC Act)**
**Effective: Autumn 2026**

**Subscription-Specific Requirements:**
- Clear pre-contract information before subscription
- Renewal reminders before payment due
- Easy online cancellation (must match signup method)
- Additional 14-day cooling-off periods for:
  - Start of new subscription
  - Renewals of 12+ months
  - After free trial ends
- Written cancellation confirmation

**Penalties:** CMA can fine up to 10% of global annual turnover

#### 2. **Consumer Rights Act 2015 - Digital Content**
**Applies to: Downloads, ringtones, streaming**

**Requirements:**
- Digital content must be satisfactory quality, fit for purpose, as described
- Right to repair/replacement if faulty
- Explicit consent required to waive 14-day cooling-off for immediate downloads
- Consumer must acknowledge loss of cancellation right

#### 3. **Distance Selling Regulations 2013**
**Applies to: All online sales**

**Requirements:**
- Clear product descriptions
- Total price including VAT
- Delivery/access information
- Cancellation rights clearly stated
- Complaint handling procedure

---

## 📝 Pages to Create

### 1. **Refund & Cancellation Policy** ✅ REQUIRED
**Why:** DMCC Act 2024 + Consumer Contracts Regulations

**Must Include:**
- Subscription cancellation process
- Cooling-off periods (14 days)
- Digital download refund policy (no refunds after access)
- Faulty content remedies
- How to request refunds
- Processing timeframes

### 2. **Digital Content Rights Notice** ✅ REQUIRED
**Why:** Consumer Rights Act 2015

**Must Include:**
- What rights consumers have for digital downloads
- Quality standards
- Repair/replacement process
- Waiver of cooling-off for immediate downloads
- Acknowledgment checkbox on checkout

### 3. **Company Information Page** ✅ REQUIRED
**Why:** E-Commerce Regulations 2002

**Must Include:**
- Company name and registration number (if registered)
- Trading address
- Contact email
- VAT number (if applicable)
- Regulatory body (if applicable)

### 4. **Complaints Procedure** ✅ REQUIRED
**Why:** Alternative Dispute Resolution Regulations 2015

**Must Include:**
- How to make a complaint
- Response timeframes
- Escalation process
- ADR provider information
- EU Online Dispute Resolution link (if selling to EU)

---

## 🔧 Implementation Tasks

### Phase 1: Core Legal Pages
- [x] Privacy Policy
- [x] Terms & Conditions
- [x] Cookie Policy
- [x] Accessibility Statement
- [ ] Refund & Cancellation Policy
- [ ] Digital Content Rights Notice
- [ ] Company Information
- [ ] Complaints Procedure

### Phase 2: Checkout Integration
- [ ] Add "Digital Content Rights" checkbox to download checkout
- [ ] Add "Subscription Terms" acceptance to membership signup
- [ ] Display cooling-off waiver for immediate downloads
- [ ] Add cancellation link to subscription confirmation emails

### Phase 3: Subscription Compliance (DMCC Act)
- [ ] Implement renewal reminder emails (before payment)
- [ ] Add easy cancellation button in account settings
- [ ] Provide written cancellation confirmation
- [ ] Track cooling-off periods (14 days at start, renewals)

### Phase 4: Footer & Navigation
- [ ] Add "Refund Policy" link to footer
- [ ] Add "Company Info" link to footer
- [ ] Add "Complaints" link to footer
- [ ] Ensure all legal pages linked in checkout flow

---

## ⚠️ Critical Compliance Points

### For Digital Downloads (Ringtones, Tracks)
1. **Before purchase:**
   - Display clear price including VAT
   - Show file format, size, compatibility
   - Checkbox: "I consent to immediate download and waive my 14-day cancellation right"
   
2. **After purchase:**
   - Provide download link valid for 24-48 hours
   - No refunds after download accessed
   - Refunds available if content is faulty

### For Subscriptions (Insider, VIP)
1. **Before signup:**
   - Clear pricing (monthly/annual)
   - What's included in each tier
   - Renewal terms
   - Cancellation process

2. **During subscription:**
   - Reminder email 7 days before renewal
   - Easy "Cancel Subscription" button in account
   - Immediate written confirmation of cancellation

3. **Cooling-off periods:**
   - 14 days at start of subscription
   - 14 days after free trial ends
   - 14 days for annual renewals

### For Song Requests (Service)
1. **Before request:**
   - Clear pricing
   - Delivery timeframe
   - What consumer receives
   - Refund policy if not delivered

---

## 📧 Additional Email Addresses Needed

- **refunds@singitpop.club** - Refund requests
- **complaints@singitpop.club** - Formal complaints
- **info@singitpop.club** - General company information

---

## 🚨 High Priority Actions

1. **Immediate (Before Next Sale):**
   - Create Refund & Cancellation Policy page
   - Add Digital Content Rights checkbox to checkout
   - Create Company Information page

2. **Before Autumn 2026 (DMCC Act Deadline):**
   - Implement subscription renewal reminders
   - Add easy cancellation flow
   - Track cooling-off periods
   - Automated cancellation confirmations

3. **Ongoing:**
   - Review policies quarterly
   - Update for legislative changes
   - Monitor CMA guidance

---

## 📚 Legal Framework Summary

| Legislation | Applies To | Key Requirement |
|-------------|------------|-----------------|
| Consumer Rights Act 2015 | Digital downloads | Quality standards, repair/replacement |
| Consumer Contracts Regs 2013 | All online sales | 14-day cooling-off, clear info |
| DMCC Act 2024 | Subscriptions | Renewal reminders, easy cancellation |
| E-Commerce Regs 2002 | Website | Company info, contact details |
| ADR Regulations 2015 | Disputes | Complaints procedure, ADR provider |

---

## ✅ Success Criteria

- All required legal pages live and accessible
- Checkout flow includes necessary consents
- Subscription cancellation takes < 2 clicks
- Renewal reminders sent automatically
- All policies reviewed by legal professional (recommended)
