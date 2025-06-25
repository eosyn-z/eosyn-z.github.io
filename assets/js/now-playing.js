// Now Playing Component - Discord Rich Presence Integration
class NowPlaying {
    constructor() {
        this.currentTrack = null;
        this.isPlaying = false;
        this.albumArt = null;
        this.progress = 0;
        this.duration = 0;
        this.artist = '';
        this.title = '';
        this.album = '';
        this.isVisible = false;
        this.container = null;
        this.animationFrame = null;
        this.lastUpdate = 0;
        
        this.init();
    }

    init() {
        this.createComponent();
        this.setupEventListeners();
        this.startPolling();
        
        // Load saved state
        this.loadState();
    }

    createComponent() {
        this.container = document.createElement('div');
        this.container.id = 'now-playing-widget';
        this.container.className = 'now-playing-widget';
        this.container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            background: var(--glass-bg-heavy);
            backdrop-filter: var(--glass-blur-heavy);
            border: 1px solid var(--glass-border-light);
            border-radius: 12px;
            padding: 16px;
            box-shadow: var(--glass-shadow-medium);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: none;
        `;

        this.container.innerHTML = `
            <div class="now-playing-header">
                <div class="now-playing-title">
                    <span class="music-icon">🎵</span>
                    <span class="status-text">Now Playing</span>
                </div>
                <button class="now-playing-close" title="Close">×</button>
            </div>
            
            <div class="now-playing-content">
                <div class="album-art-container">
                    <div class="album-art-placeholder">
                        <span class="music-note">♪</span>
                    </div>
                    <img class="album-art" src="" alt="Album Art" style="display: none;">
                    <div class="play-pause-overlay">
                        <button class="play-pause-btn">▶️</button>
                    </div>
                </div>
                
                <div class="track-info">
                    <div class="track-title" title="">Loading...</div>
                    <div class="track-artist" title="">Unknown Artist</div>
                    <div class="track-album" title="">Unknown Album</div>
                    
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <div class="time-info">
                            <span class="current-time">0:00</span>
                            <span class="total-time">0:00</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="now-playing-controls">
                <button class="control-btn prev-btn" title="Previous">⏮️</button>
                <button class="control-btn play-pause-btn-main" title="Play/Pause">▶️</button>
                <button class="control-btn next-btn" title="Next">⏭️</button>
                <button class="control-btn volume-btn" title="Volume">🔊</button>
            </div>
            
            <div class="now-playing-footer">
                <div class="source-info">
                    <span class="source-icon">🎧</span>
                    <span class="source-text">Discord Rich Presence</span>
                </div>
                <button class="toggle-visibility-btn" title="Toggle Visibility">👁️</button>
            </div>
        `;

        document.body.appendChild(this.container);
        this.setupStyles();
    }

    setupStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .now-playing-widget {
                color: var(--text-primary);
            }

            .now-playing-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
                padding-bottom: 8px;
                border-bottom: 1px solid var(--glass-border-light);
            }

            .now-playing-title {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 600;
                font-size: 14px;
            }

            .music-icon {
                font-size: 16px;
            }

            .now-playing-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 18px;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: all 0.2s ease;
            }

            .now-playing-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-primary);
            }

            .now-playing-content {
                display: flex;
                gap: 12px;
                margin-bottom: 12px;
            }

            .album-art-container {
                position: relative;
                width: 60px;
                height: 60px;
                border-radius: 8px;
                overflow: hidden;
                background: var(--glass-bg-medium);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .album-art-placeholder {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--theme-accent), var(--theme-accent-secondary));
                color: white;
                font-size: 24px;
            }

            .album-art {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .play-pause-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.2s ease;
            }

            .album-art-container:hover .play-pause-overlay {
                opacity: 1;
            }

            .play-pause-btn {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
            }

            .track-info {
                flex: 1;
                min-width: 0;
            }

            .track-title {
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 4px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: var(--text-primary);
            }

            .track-artist {
                font-size: 12px;
                color: var(--text-secondary);
                margin-bottom: 2px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .track-album {
                font-size: 11px;
                color: var(--text-secondary);
                margin-bottom: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .progress-container {
                margin-top: 8px;
            }

            .progress-bar {
                width: 100%;
                height: 4px;
                background: var(--glass-bg-medium);
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 4px;
            }

            .progress-fill {
                height: 100%;
                background: var(--theme-accent);
                border-radius: 2px;
                transition: width 0.1s ease;
                width: 0%;
            }

            .time-info {
                display: flex;
                justify-content: space-between;
                font-size: 10px;
                color: var(--text-secondary);
            }

            .now-playing-controls {
                display: flex;
                justify-content: center;
                gap: 8px;
                margin-bottom: 8px;
            }

            .control-btn {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 16px;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.2s ease;
            }

            .control-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-primary);
                transform: scale(1.1);
            }

            .now-playing-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 8px;
                border-top: 1px solid var(--glass-border-light);
                font-size: 11px;
                color: var(--text-secondary);
            }

            .source-info {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .toggle-visibility-btn {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: all 0.2s ease;
            }

            .toggle-visibility-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-primary);
            }

            /* Animation for when music is playing */
            .now-playing-widget.playing .music-icon {
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            /* Responsive design */
            @media (max-width: 768px) {
                .now-playing-widget {
                    width: calc(100vw - 40px);
                    right: 20px;
                    left: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Close button
        this.container.querySelector('.now-playing-close').addEventListener('click', () => {
            this.hide();
        });

        // Toggle visibility button
        this.container.querySelector('.toggle-visibility-btn').addEventListener('click', () => {
            this.toggleVisibility();
        });

        // Play/pause buttons
        const playPauseBtns = this.container.querySelectorAll('.play-pause-btn, .play-pause-btn-main');
        playPauseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.togglePlayPause();
            });
        });

        // Control buttons (these would need actual implementation for media control)
        this.container.querySelector('.prev-btn').addEventListener('click', () => {
            this.previousTrack();
        });

        this.container.querySelector('.next-btn').addEventListener('click', () => {
            this.nextTrack();
        });

        this.container.querySelector('.volume-btn').addEventListener('click', () => {
            this.toggleMute();
        });
    }

    startPolling() {
        // Poll for Discord Rich Presence data every 2 seconds
        setInterval(() => {
            this.checkDiscordRichPresence();
        }, 2000);

        // Update progress every second
        setInterval(() => {
            this.updateProgress();
        }, 1000);
    }

    checkDiscordRichPresence() {
        // This would integrate with Discord Rich Presence API
        // For now, we'll simulate data or check for actual Discord presence
        
        // Check if Discord is running and has Rich Presence data
        if (window.DiscordRPC) {
            // Real Discord Rich Presence integration would go here
            this.updateFromDiscordRPC();
        } else {
            // Fallback: check for any music-related browser tabs or simulate data
            this.checkBrowserMusicTabs();
        }
    }

    updateFromDiscordRPC() {
        // This would be the actual Discord Rich Presence integration
        // For now, this is a placeholder
        console.log('Discord Rich Presence integration would go here');
    }

    checkBrowserMusicTabs() {
        // Check if any music streaming sites are active
        const musicSites = [
            'spotify.com',
            'youtube.com',
            'soundcloud.com',
            'apple.com/music',
            'tidal.com'
        ];

        // This is a simplified check - in a real implementation,
        // you'd need to communicate with browser extensions or use
        // the Web Audio API to detect audio playback
        
        // For demo purposes, we'll simulate some data
        if (Math.random() > 0.7) {
            this.updateTrack({
                title: 'Simulated Track',
                artist: 'Demo Artist',
                album: 'Demo Album',
                albumArt: 'https://via.placeholder.com/60x60/6366f1/ffffff?text=♪',
                isPlaying: Math.random() > 0.5,
                progress: Math.random() * 100,
                duration: 180
            });
        }
    }

    updateTrack(trackData) {
        const wasPlaying = this.isPlaying;
        
        this.currentTrack = trackData;
        this.title = trackData.title || 'Unknown Track';
        this.artist = trackData.artist || 'Unknown Artist';
        this.album = trackData.album || 'Unknown Album';
        this.albumArt = trackData.albumArt || null;
        this.isPlaying = trackData.isPlaying || false;
        this.progress = trackData.progress || 0;
        this.duration = trackData.duration || 0;

        this.updateUI();
        
        // Show widget if we have track data and it's not visible
        if (this.title !== 'Unknown Track' && !this.isVisible) {
            this.show();
        }

        // Save state
        this.saveState();
    }

    updateUI() {
        // Update track info
        this.container.querySelector('.track-title').textContent = this.title;
        this.container.querySelector('.track-title').title = this.title;
        this.container.querySelector('.track-artist').textContent = this.artist;
        this.container.querySelector('.track-artist').title = this.artist;
        this.container.querySelector('.track-album').textContent = this.album;
        this.container.querySelector('.track-album').title = this.album;

        // Update album art
        const albumArtImg = this.container.querySelector('.album-art');
        const albumArtPlaceholder = this.container.querySelector('.album-art-placeholder');
        
        if (this.albumArt) {
            albumArtImg.src = this.albumArt;
            albumArtImg.style.display = 'block';
            albumArtPlaceholder.style.display = 'none';
        } else {
            albumArtImg.style.display = 'none';
            albumArtPlaceholder.style.display = 'flex';
        }

        // Update play/pause state
        const playPauseBtns = this.container.querySelectorAll('.play-pause-btn, .play-pause-btn-main');
        playPauseBtns.forEach(btn => {
            btn.textContent = this.isPlaying ? '⏸️' : '▶️';
        });

        // Update progress
        this.updateProgress();

        // Update playing state class
        this.container.classList.toggle('playing', this.isPlaying);
    }

    updateProgress() {
        if (!this.isPlaying || !this.duration) return;

        // Simulate progress update
        const now = Date.now();
        if (this.lastUpdate === 0) {
            this.lastUpdate = now;
        }

        const elapsed = (now - this.lastUpdate) / 1000;
        this.progress = Math.min(this.progress + elapsed, this.duration);
        this.lastUpdate = now;

        // Update progress bar
        const progressFill = this.container.querySelector('.progress-fill');
        const progressPercent = (this.progress / this.duration) * 100;
        progressFill.style.width = `${progressPercent}%`;

        // Update time display
        const currentTime = this.container.querySelector('.current-time');
        const totalTime = this.container.querySelector('.total-time');
        
        currentTime.textContent = this.formatTime(this.progress);
        totalTime.textContent = this.formatTime(this.duration);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    show() {
        this.isVisible = true;
        this.container.style.display = 'block';
        setTimeout(() => {
            this.container.style.transform = 'translateX(0)';
        }, 10);
        this.updateToggleButton();
    }

    hide() {
        this.isVisible = false;
        this.container.style.transform = 'translateX(100%)';
        setTimeout(() => {
            this.container.style.display = 'none';
        }, 300);
        this.updateToggleButton();
    }

    toggleVisibility() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    updateToggleButton() {
        const toggleBtn = document.getElementById('now-playing-toggle');
        if (toggleBtn) {
            toggleBtn.classList.toggle('active', this.isVisible);
        }
        
        // Update system tray button state
        const trayBtn = document.getElementById('music-player-button');
        if (trayBtn) {
            trayBtn.classList.toggle('active', this.isVisible);
        }
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        this.updateUI();
        this.saveState();
    }

    previousTrack() {
        // This would integrate with actual media controls
        console.log('Previous track');
    }

    nextTrack() {
        // This would integrate with actual media controls
        console.log('Next track');
    }

    toggleMute() {
        // This would integrate with actual media controls
        console.log('Toggle mute');
    }

    saveState() {
        const state = {
            isVisible: this.isVisible,
            currentTrack: this.currentTrack,
            isPlaying: this.isPlaying,
            progress: this.progress
        };
        localStorage.setItem('nowPlayingState', JSON.stringify(state));
    }

    loadState() {
        const saved = localStorage.getItem('nowPlayingState');
        if (saved) {
            const state = JSON.parse(saved);
            this.isVisible = state.isVisible || false;
            
            if (state.currentTrack) {
                this.updateTrack(state.currentTrack);
            }
            
            if (this.isVisible) {
                this.show();
            }
        }
        
        // Check if there's a default visibility setting
        const defaultVisible = localStorage.getItem('musicPlayerDefaultVisible');
        if (defaultVisible === 'true' && !this.isVisible && this.title !== 'Unknown Track') {
            this.show();
        }
    }

    // Public method to manually update track data
    setTrackData(trackData) {
        this.updateTrack(trackData);
    }

    // Public method to show/hide the widget
    setVisible(visible) {
        if (visible) {
            this.show();
        } else {
            this.hide();
        }
    }

    // Public method to set default visibility
    setDefaultVisible(visible) {
        localStorage.setItem('musicPlayerDefaultVisible', visible.toString());
    }

    // Public method to get default visibility
    getDefaultVisible() {
        return localStorage.getItem('musicPlayerDefaultVisible') === 'true';
    }
}

// Initialize Now Playing widget
document.addEventListener('DOMContentLoaded', () => {
    window.nowPlaying = new NowPlaying();
    
    // Add a global method to update track data from external sources
    window.updateNowPlaying = (trackData) => {
        if (window.nowPlaying) {
            window.nowPlaying.setTrackData(trackData);
        }
    };
}); 