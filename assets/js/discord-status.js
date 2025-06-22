// Discord Status - Local File Reader
class DiscordStatusChecker {
    constructor() {
        this.statusWidget = document.getElementById('discord-status-widget');
        this.statusIndicator = document.getElementById('discord-status-indicator');
        this.statusText = document.getElementById('discord-status-text');
        this.activityText = document.getElementById('discord-activity-text');
        
        // Path to the local status file
        this.statusFileUrl = '/discord/status.json';
        
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
            const response = await fetch(this.statusFileUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Add cache busting to ensure fresh data
                cache: 'no-cache'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const statusData = await response.json();
            
            // Check if the status is recent (within last 5 minutes)
            const statusAge = Date.now() - new Date(statusData.timestamp).getTime();
            const maxAge = 5 * 60 * 1000; // 5 minutes
            
            if (statusAge > maxAge) {
                console.warn('Discord status data is stale:', statusAge / 1000, 'seconds old');
            }
            
            // Extract status information
            const status = statusData.status || 'offline';
            const statusText = statusData.statusText || 'Offline';
            let activityText = '';
            
            // Get current activity if available
            if (statusData.currentActivity) {
                const activity = statusData.currentActivity;
                activityText = activity.name;
                if (activity.details) {
                    activityText += ` - ${activity.details}`;
                }
                if (activity.state) {
                    activityText += ` (${activity.state})`;
                }
            }
            
            this.setStatus(status, statusText, activityText);
            
        } catch (error) {
            console.error('Error updating Discord status:', error);
            this.setStatus('offline', 'Status unavailable', '');
        }
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