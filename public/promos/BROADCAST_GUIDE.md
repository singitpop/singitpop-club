# 📡 Singitpop Radio: 24/7 Broadcast Stability Guide

This guide covers the "Local Hardening" and "Cloud Continuity" options to ensure your "Country Signal" stream never goes down.

---

## 🏗️ Phase 1: Local Stability (Keeping your Mac Awake)
If you want to run the stream from your own Mac, you must ensure it **never** sleeps, even with the lid closed.

### 🏎️ 1. The Terminal "Caffeine" Fix (Immediate)
Run this command in any terminal window and **leave it open**. It will prevent sleep as long as the terminal is active.
```bash
caffeinate -dums
```
- `-d`: Prevent display sleep.
- `-u`: Declare user activity.
- `-m`: Prevent disk sleep.
- `-s`: Prevent system sleep when on AC power.

### 💊 2. The "Amphetamine" App (Recommended)
Free on the Mac App Store. This is the industry standard for streamers.
- **Set a session**: "Indefinite".
- **Lid Closed Mode**: Go to Settings > System > Uncheck "Allow system sleep when display is closed".
- **Why?**: It’s more visual and reliable than system settings alone.

### 💻 3. MacBook "Clamshell" Mode
If using a MacBook with the lid closed:
1.  Connect a **Power Adapter**.
2.  Connect an **External Display** (or a "HDMI Display Emulator" plug).
3.  Connect an external keyboard/mouse.

---

## 🏗️ Phase 2: Local Locking (The Bulletproof Setup)
Since we are staying local, we need to ensure the Mac **never** sleeps, even if you go to bed or the lid is closed.

### 🏎️ 1. The Terminal "Caffeine" Fix (Pro)
Run this command to force the system to stay awake indefinitely. 
```bash
caffeinate -disu &
```
- `-d`: Prevent display sleep.
- `-i`: Prevent idle sleep.
- `-s`: Prevent system sleep on AC power.
- `-u`: Declare user activity.
- `&`: Runs this in the background.

### 💊 2. The "Amphetamine" App (Free & Highly Recommended)
Download this from the Mac App Store. It is much more reliable than macOS system settings alone.
- **Start a session**: Set it to "Indefinitly".
- **Lid Closed Mode**: In Amphetamine preferences, ensure "Allow system sleep when display is closed" is **Unchecked**.

### 💻 3. MacBook "Clamshell" Requirements
If you close the lid on a MacBook, it **will** sleep unless these three things are true:
1.  **Power**: It must be plugged into its charger.
2.  **Display**: It must have an external monitor (or a $5 "Dummy HDMI" plug) connected.
3.  **Peripherals**: An external mouse or keyboard must be connected (to signal it's being used as a desktop).

---

## 🚨 Final Sync: OBS Verification
Before you step away, check these two things in OBS:
1.  **Auto Reconnect**: Go to **Settings > Advanced > Network** and ensure "Keep trying to reconnect" is **ON**.
2.  **High-Priority**: In the same menu, set "Process Priority" to **High**. This ensures your Mac gives all its power to the music signal first.

**Your station is now locked. Ready to take over the airwaves?** 🎙️🚀📻
