// Unified ticker system for all pages
async function initializeUnifiedTicker() {
    const tickerContent = document.getElementById('ticker-content');
    if (!tickerContent) return;

    let items = [];

    // Add page-specific info first
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const pageInfo = {
        'art': 'ART GALLERY • Random works of mine',
        'games': 'GAMES • Play browser games',
        'shop': 'SHOP • Support my work',
        'irc': 'IRC CHAT • Server: irc.libera.chat • Channel: #eosyn',
        'media': 'MEDIA • Gallery, playlists, and discoveries',
        'music': 'MUSIC • Playlists and musical discoveries',
        'watchlist': 'WATCHLIST • Movies, shows, and videos',
        'nature': 'NATURE • Natural beauty and landscapes',
        'sites': 'SITES • Curated collection of useful websites',
        'situation': 'MONITORING THE SITUATION',
        'dev': 'DEV • Projects, code, and technical writing'
    };

    if (pageInfo[currentPage]) {
        items.push(pageInfo[currentPage]);
    }

    // Load site settings for MOTD
    try {
        const settingsResponse = await fetch('../config/settings.txt');
        if (settingsResponse.ok) {
            const settings = await settingsResponse.text();
            const lines = settings.split('\n');
            lines.forEach(line => {
                if (line.startsWith('MOTD:')) {
                    const motd = line.substring(5).trim();
                    if (motd) {
                        items.push(` ${motd}`);
                    }
                }
            });
        }
    } catch (error) {
        console.log('Could not load MOTD');
    }

    // Load Discord status
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/177923398635184129`);
        const data = await response.json();

        if (data.success) {
            const userData = data.data;
            const status = userData.discord_status || 'offline';

            // Discord status with color and clickable link
            const statusColors = {
                online: '#50fa7b',
                idle: '#f1fa8c',
                dnd: '#ff5555',
                offline: '#6272a4'
            };
            const statusColor = statusColors[status] || statusColors.offline;
            const discordUserId = '177923398635184129';
            const discordProfileUrl = `https://discord.com/users/${discordUserId}`;
            items.push(`<a href="${discordProfileUrl}" class="ticker-link discord-link" target="_blank" rel="noopener noreferrer">Discord: <span style="color: ${statusColor};">● ${status.toUpperCase()}</span></a>`);

            // Custom status
            if (userData.activities) {
                const customStatus = userData.activities.find(a => a.type === 4);
                if (customStatus && customStatus.state) {
                    items.push(customStatus.state);
                }

                // Game activities
                const gameActivities = userData.activities.filter(a => a.type === 0);
                if (gameActivities.length > 0) {
                    let activityNames = [];

                    for (const activity of gameActivities) {
                        if (activity.state && activity.state.toLowerCase().startsWith('with ') && !activity.name) {
                            activityNames.push(activity.state);
                        } else if (activity.name) {
                            activityNames.push(activity.name);
                        }
                    }

                    let activityText = '';
                    if (activityNames.length === 1) {
                        if (activityNames[0].toLowerCase().startsWith('with ')) {
                            activityText = `Playing ${activityNames[0]}`;
                        } else {
                            activityText = `Playing ${activityNames[0]}`;
                        }
                    } else if (activityNames.length === 2) {
                        activityText = `Playing ${activityNames.join(' and ')}`;
                    } else if (activityNames.length > 2) {
                        const lastActivity = activityNames.pop();
                        activityText = `Playing ${activityNames.join(', ')}, and ${lastActivity}`;
                    }

                    if (activityText) {
                        items.push(activityText);
                    }
                }

                // Spotify
                const spotify = userData.activities.find(a => a.type === 2 && a.name === 'Spotify');
                if (spotify && userData.spotify) {
                    items.push(` ${userData.spotify.song} — ${userData.spotify.artist}`);
                }
            }
        }
    } catch (error) {
        console.log('Could not load Discord status');
    }

    // Load most recent page from manifest
    try {
        const manifestResponse = await fetch('../data/manifest.json');
        if (manifestResponse.ok) {
            const manifest = await manifestResponse.json();
            if (manifest.pages && manifest.pages.length > 0) {
                const recentPage = manifest.pages[0];
                const sectionName = recentPage.section.charAt(0).toUpperCase() + recentPage.section.slice(1);
                // Create clickable Obsidian-like reference
                const articleUrl = `../index.html#${recentPage.section}/${recentPage.slug}`;
                items.push(`Most recent: <a href="${articleUrl}" class="ticker-link obsidian-link">[[${recentPage.title}]]</a> <span class="ticker-section">[${sectionName}]</span>`);
            }
        }
    } catch (error) {
        console.log('Could not load manifest');
    }

    // If no items, add default
    if (items.length === 0) {
        items.push('Welcome to EOSYN.NET');
    }

    // Create ticker HTML with duplication for smooth scrolling
    const tickerHTML = items.map(item => `<span class="ticker-item">${item}</span>`).join('');
    tickerContent.innerHTML = tickerHTML + tickerHTML; // Duplicate for seamless loop
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUnifiedTicker);
} else {
    initializeUnifiedTicker();
}

// Update ticker every 30 seconds
setInterval(initializeUnifiedTicker, 30000);