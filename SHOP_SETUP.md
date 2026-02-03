# Shop & Merch Setup Guide

This guide explains how to set up your **Merchandise (Printful)** products and link them to your website.

---

## 2. Vinyl Record (Diggers Factory)
*Strategy: " The Vinyl Edit" (Single LP)*

Since a standard Vinyl LP holds max **22 mins per side (44 mins total)** and your full albums are ~54 mins (Double LP = expensive ~£35), we will create a special **"Vinyl Edit"**.

### Step 1: Create Your "Vinyl Edit" (Audio)
1.  **Select Tracks:** Pick your best ~10-12 tracks to fit under **42 minutes** total (for best quality).
2.  **Order:** Arrange them into Side A and Side B (max 21 mins each).
3.  **Marketing:** Label this as the *"Audiophile Master"* or *"Director's Cut"* of the album. Buyers get the full digital version as a bonus.

### Step 2: Set up Diggers Factory
1.  Go to [diggersfactory.com](https://www.diggersfactory.com/) and create an artist account.
2.  **Create Project:** Choose "Vinyl Project matches".
3.  **Config:**
    *   **Format:** 12" LP (Standard)
    *   **Sleeve:** Select **"Color"** (Standard 350gsm Jacket).
        *   *Why?* "Gatefold" is for double albums and costs way more. "Color" is the standard professional album cover.
    *   **Color:** Black (Cheapest) or Color (Slightly more).
    *   **Quantity:** Set goal to 100 units (Standard accessible goal).
    *   **Price:** Aim for **£20 - £25** retail price.
    *   **Audio Options:** Select **BOTH** "Listenable" (Previews) and "Digital Download".
        *   *Why?* Previews help sell the record. The download gives them the high-quality **"Vinyl Master"** of these selected tracks.
    *   **Copyright / Mechanical Rights:**
        *   Select **YES** (Since you are registered with **ASCAP**).
        *   *Note:* Clicking "No" would charge you extra fees (~€100) for them to handle rights manually. Since you own your music and are with ASCAP, you handle this yourself.
    *   **Pre-Launch Checklist:**
        *   **Bio & Photo:** You MUST have a profile picture and short bio in your Artist Profile.
        *   **Project Description:** Must be >5 lines. Use the album description we wrote.
4.  **Launch:** Once approved, you will get a Public Project Link.

### Step 3: Link to Website
1.  Copy your Diggers Factory project URL.
2.  Open `src/data/shopProducts.ts`.
3.  Find the `vinyl` product and paste the URL into `link: "..."`.

---

## 3. Merch (T-Shirts, Hoodies)
Use an external dedicated store for best management.

1.  **Create Store:** Use [Big Cartel](https://bigcartel.com) (Free for 5 products) or [Shopify Starter].
2.  **Connect Printful:** Use [Printful](https://printful.com) to design/dropship items.
3.  **Get Links:** Copy the product URLs from your Big Cartel/Shopify store.
4.  **Update Website:** Paste these URLs into `src/data/shopProducts.ts` for each item.

## 3. Ringtones (Digital Download)
*   **Status:** Fully Automated & Integrated.
*   **Managed By:** The website itself (via Stripe).
*   **Process:** No external setup needed. The system automatically sells and emails links.
