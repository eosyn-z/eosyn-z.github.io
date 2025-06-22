# Discord Status System

This system allows your website to display your Discord status by reading from a local JSON file that's updated by a Node.js script.

## Setup Instructions

### 1. Get Your Discord User ID
1. Enable Developer Mode in Discord (User Settings > Advanced > Developer Mode)
2. Right-click on your username and select "Copy ID"
3. Replace `YOUR_DISCORD_USER_ID` in `status-fetcher.js` with your actual Discord user ID

### 2. Install Node.js
Make sure you have Node.js installed on your computer.

### 3. Run the Status Fetcher
You have several options:

#### Option A: Manual Updates
- Double-click `update-status.bat` to run the script once
- Run it whenever you want to update your status

#### Option B: Continuous Updates
1. Open `status-fetcher.js`
2. Uncomment the last line: `// setInterval(fetchDiscordStatus, 30000);`
3. Run the script and it will update every 30 seconds

#### Option C: Windows Task Scheduler
1. Open Task Scheduler
2. Create a new task that runs `update-status.bat` every few minutes
3. This way it updates automatically in the background

### 4. How It Works
1. The `status-fetcher.js` script fetches your Discord status using the Lanyard API
2. It writes the status to `status.json`
3. Your website reads from `status.json` and displays your current status
4. The status updates every 30 seconds on your website

### 5. Files
- `status-fetcher.js` - Node.js script that fetches Discord status
- `update-status.bat` - Windows batch file to run the script
- `status.json` - JSON file containing your current status (auto-generated)
- `README.md` - This file

### 6. Troubleshooting
- If you get errors, check that your Discord user ID is correct
- Make sure Node.js is installed
- Check that the `status.json` file is being created in the `discord` folder
- The website will show "Status unavailable" if it can't read the file

### 7. Customization
You can modify the update frequency by changing the interval in `status-fetcher.js` (currently 30 seconds). 