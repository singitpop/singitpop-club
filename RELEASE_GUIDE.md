# 🚀 The Foolproof Magic Button Guide to Releasing Music

This guide is designed to be completely foolproof. It explains exactly how to release a new album or single to the live website without ever touching confusing databases, AWS S3, or Stripe. 

Just follow these 5 steps!

---

## 📁 Step 1: Put the Files in the Correct Folder
Everything begins in a special folder on your Mac Desktop. You must put your new music files here first.

1. Open **Finder** on your Mac.
2. Go to `Desktop` ➡️ `Singitpop` ➡️ `READY FOR WEBSITE`
3. **The Spreadsheet (Crucial):** Make sure your master Excel spreadsheet is saved inside this folder. The spreadsheet *must* contain the exact details of the new album (Album Name, Tracks, Release Date, etc). 
   * *Magic Trick: If you set the `Release Date` to a future day (e.g., next month), the system will automatically hide the album in the "VIP Vault" until that day arrives!*
4. **The Music Files:** Create a folder for your new album right next to the spreadsheet (e.g., a folder named `Before the Light`). Place your high-quality `.wav` or `.mp3` audio files inside this folder. **Make sure the folder name exactly matches the Album Title you typed into the Excel spreadsheet.**

---

## 💻 Step 2: Open the Code Window (Terminal)
To tell the computer to update the website, you need to open the code editor.

1. Open the app called **Visual Studio Code** (VS Code) on your Mac.
2. Go to the top menu bar, click **Terminal** and select **New Terminal**.
3. A black box will appear at the bottom of the screen. In this box, type the following exact command and hit **Enter**:
   ```bash
   cd /Users/garybirrell/Desktop/Singitpop/website
   ```
4. Now, type this second exact command and hit **Enter**:
   ```bash
   npm run dev
   ```
   *(This safely starts up an invisible sandbox version of the website on your Mac so you can push the update).*

---

## 🪄 Step 3: Press the Magic Button
Now you just need to click the button that does all the heavy lifting.

1. Open your internet browser (Chrome, Safari, etc).
2. Type this exact web address into the top bar and hit enter: 
   **[http://localhost:3000/admin/content](http://localhost:3000/admin/content)**
3. This opens your private Admin Console. Look for the big blue button labeled **"Sync Local Content"** and click it.
4. You will instantly see a green popup saying "Sync Successful!". **Do not close the browser window yet.**

---

## ⏳ Step 4: Let the Robot Do the Work
Take a sip of coffee. For the next 1 to 3 minutes, the system is invisibly sprinting around the internet doing all of this for you:

1. **Reading Excel:** It reads your spreadsheet and spots the new songs.
2. **Making Ringtones:** It finds any track marked "Single" and automatically chops out a 29-second `.m4r` file (for iPhones) and an `.mp3` file (for Androids).
3. **Uploading to AWS:** It grabs your massive `.wav` files and ringtones from your Mac and shoves them straight up into your live Amazon database.
4. **Setting up Stripe:** It quietly talks to Stripe and says *"Hey, create a $0.99 product for these new ringtones."*
5. **Updating the Live Website:** Finally, it uploads a glowing master file (`albums.json`) that instantly tells the live public website about your new music.

---

## ✅ Step 5: Check the Live Website!
You are completely finished.

1. You never have to manually log into AWS. 
2. You never have to log into Stripe.
3. You do not even have to update the website on Vercel.

Because of the magic button you just clicked, your live website (`singitpop.club`) automatically updates itself. 
Just browse to your live website and verify the new album is sitting proudly in the **Discography** (or safely locked away in the **VIP Vault** if you picked a future release date).

If it's there, you successfully released an entire album to the world in 5 clicks! 🌟

---

### ⚠️ Troubleshooting
If something doesn't show up correctly:
Go back to **VS Code** and look at the black Terminal box where you typed `npm run dev`. The script leaves a very clear trail of breadcrumbs showing exactly what it did. Look for red `❌` errors—most of the time, it just means a track name in the Excel sheet had a typo and didn't match the actual audio file name in the folder!
