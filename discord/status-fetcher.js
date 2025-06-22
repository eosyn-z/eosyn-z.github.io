const fs = require('fs');
const path = require('path');

// Configuration
const DISCORD_USER_ID = 'YOUR_DISCORD_USER_ID'; // Replace with your Discord user ID
const LANYARD_API_URL = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;
const OUTPUT_FILE = path.join(__dirname, 'status.json');

async function fetchDiscordStatus() {
    try {
        console.log('Fetching Discord status...');
        
        const response = await fetch(LANYARD_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const presence = data.data;
        
        // Extract status information
        const statusInfo = {
            timestamp: new Date().toISOString(),
            status: presence.discord_status || 'offline',
            statusText: getStatusText(presence.discord_status),
            activities: presence.activities || [],
            currentActivity: null
        };
        
        // Find current activity (playing, listening, etc.)
        const currentActivity = presence.activities?.find(activity => activity.type === 0);
        if (currentActivity) {
            statusInfo.currentActivity = {
                name: currentActivity.name,
                details: currentActivity.details,
                state: currentActivity.state,
                type: currentActivity.type
            };
        }
        
        // Write to file
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(statusInfo, null, 2));
        console.log('Status updated successfully:', statusInfo.status);
        
    } catch (error) {
        console.error('Error fetching Discord status:', error);
        
        // Write error status
        const errorStatus = {
            timestamp: new Date().toISOString(),
            status: 'offline',
            statusText: 'Status unavailable',
            activities: [],
            currentActivity: null,
            error: error.message
        };
        
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(errorStatus, null, 2));
    }
}

function getStatusText(status) {
    const statusMap = {
        'online': 'Online',
        'idle': 'Idle',
        'dnd': 'Do Not Disturb',
        'offline': 'Offline'
    };
    return statusMap[status] || 'Offline';
}

// Run the fetch
fetchDiscordStatus();

// If you want to run this continuously, uncomment the following:
// setInterval(fetchDiscordStatus, 30000); // Update every 30 seconds 