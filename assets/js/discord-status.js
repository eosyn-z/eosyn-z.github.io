// Discord Status API Integration
class DiscordStatusChecker {
    constructor() {
        this.userId = 'eosyn'; // Discord username
        this.statusWidget = document.getElementById('discord-status-widget');
        this.statusIndicator = document.getElementById('discord-status-indicator');
        this.statusText = document.getElementById('discord-status-text');
        this.activityText = document.getElementById('discord-activity-text');
        
        // Discord API endpoints
        this.discordApiUrl = 'https://discord.com/api/v10';
        
        // Initialize the status checker
        this.init();
    }

    async init() {
        if (!this.statusWidget) return;
        
        // Set initial loading state
        this.setStatus('loading', 'Checking status...', '');
        
        try {
            await this.updateStatus();
            
            // Update status every 30 seconds
            setInterval(() => {
                this.updateStatus();
            }, 30000);
            
        } catch (error) {
            console.error('Failed to initialize Discord status:', error);
            this.setStatus('offline', 'Status unavailable', '');
        }
    }

    async updateStatus() {
        try {
            // First, get the user ID from username
            const userResponse = await fetch(`${this.discordApiUrl}/users/${this.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!userResponse.ok) {
                throw new Error('User not found or API error');
            }

            const userData = await userResponse.json();
            const userId = userData.id;

            // Now get the user's presence/status
            // Note: This requires a bot token and proper permissions
            // For now, we'll use a public API service or fallback
            await this.getUserPresence(userId);

        } catch (error) {
            console.error('Error updating Discord status:', error);
            this.setStatus('offline', 'Offline', '');
        }
    }

    async getUserPresence(userId) {
        try {
            // Using a public Discord presence API service
            // You can replace this with your own bot implementation
            const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Presence API error');
            }

            const data = await response.json();
            const presence = data.data;

            if (presence && presence.discord_status) {
                const status = presence.discord_status;
                const activities = presence.activities || [];
                const currentActivity = activities.find(activity => activity.type === 0) || null;

                let statusText = this.getStatusText(status);
                let activityText = '';

                if (currentActivity) {
                    activityText = currentActivity.name;
                    if (currentActivity.details) {
                        activityText += ` - ${currentActivity.details}`;
                    }
                }

                this.setStatus(status, statusText, activityText);
            } else {
                this.setStatus('offline', 'Offline', '');
            }

        } catch (error) {
            console.error('Error fetching presence:', error);
            this.setStatus('offline', 'Offline', '');
        }
    }

    getStatusText(status) {
        const statusMap = {
            'online': 'Online',
            'idle': 'Idle',
            'dnd': 'Do Not Disturb',
            'offline': 'Offline'
        };
        return statusMap[status] || 'Offline';
    }

    setStatus(status, statusText, activityText) {
        if (!this.statusIndicator || !this.statusText || !this.activityText) return;

        // Remove all status classes
        this.statusIndicator.classList.remove('online', 'idle', 'dnd', 'offline', 'loading');
        
        // Add current status class
        this.statusIndicator.classList.add(status);
        
        // Update text
        this.statusText.textContent = statusText;
        this.activityText.textContent = activityText;
        
        // Show/hide activity text based on whether there's activity
        this.activityText.style.display = activityText ? 'block' : 'none';
    }
}

// Initialize Discord status checker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new DiscordStatusChecker();
}); 