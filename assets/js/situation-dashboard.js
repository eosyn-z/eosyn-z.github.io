class SituationDashboard {
    constructor() {
        this.widgets = new Map();
        this.widgetInstances = [];
        this.userLocation = null;
        this.gridContainer = null;
        this.isDragging = false;
        this.isResizing = false;
        this.currentDragWidget = null;
        this.init();
    }
    init() {
        this.loadUserLocation();
        this.loadWidgetDefinitions();
        this.loadSavedLayout();
        this.setupEventListeners();
    }
    loadUserLocation() {
        const saved = localStorage.getItem('situation_location');
        if (saved) {
            this.userLocation = JSON.parse(saved);
        } else {

            this.userLocation = {
                lat: 40.7128,
                lon: -74.0060,
                city: 'New York',
                autoDetected: false
            };
        }
    }
    saveUserLocation() {
        localStorage.setItem('situation_location', JSON.stringify(this.userLocation));
    }
    async detectLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    try {
                        const city = await this.reverseGeocode(lat, lon);
                        this.userLocation = { lat, lon, city, autoDetected: true };
                        this.saveUserLocation();
                        resolve(this.userLocation);
                    } catch (e) {
                        this.userLocation = { lat, lon, city: 'Unknown', autoDetected: true };
                        this.saveUserLocation();
                        resolve(this.userLocation);
                    }
                },
                (error) => reject(error)
            );
        });
    }
    async reverseGeocode(lat, lon) {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data = await response.json();
        return data.address.city || data.address.town || data.address.village || 'Unknown';
    }
    loadWidgetDefinitions() {

        this.widgetCatalog = [
            {
                id: 'discord-status',
                name: 'Discord Status',
                icon: '',
                iconUrl: 'https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico',
                description: 'Your Discord presence & activity',
                defaultSize: { w: 5, h: 4 },
                category: 'personal'
            },
            {
                id: 'local-weather',
                name: 'Weather',
                icon: '',
                iconUrl: 'https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png',
                description: 'Current weather conditions',
                defaultSize: { w: 5, h: 4 },
                category: 'local',
                requiresLocation: true
            },
            {
                id: 'iss-tracker',
                name: 'ISS',
                icon: '',
                iconUrl: 'https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg',
                description: 'International Space Station',
                defaultSize: { w: 5, h: 3 },
                category: 'flight'
            },
            {
                id: 'earthquake-tracker',
                name: 'Earthquakes',
                icon: '',
                iconUrl: 'https://earthquake.usgs.gov/theme/images/usgs-logo.svg',
                description: 'Recent seismic activity',
                defaultSize: { w: 6, h: 5 },
                category: 'weather'
            },
            {
                id: 'downdetector',
                name: 'Down Detector',
                icon: '',
                iconUrl: 'https://downdetector.com/apple-icon-57x57.png',
                description: 'Service outage tracker',
                defaultSize: { w: 12, h: 8 },
                category: 'infrastructure'
            },
            {
                id: 'weather-radar',
                name: 'Radar',
                icon: '',
                iconUrl: 'https://www.windy.com/img/logo201802/logo-icon-blue-48.png',
                description: 'Live precipitation radar',
                defaultSize: { w: 12, h: 8 },
                category: 'weather',
                requiresLocation: true
            },
            {
                id: 'flight-tracker',
                name: 'Flights',
                icon: '',
                iconUrl: 'https://www.adsbexchange.com/wp-content/uploads/cropped-Favicon-site-192x192.png',
                description: 'Real-time flight positions',
                defaultSize: { w: 12, h: 8 },
                category: 'flight'
            },
            {
                id: 'github-status',
                name: 'GitHub',
                icon: '',
                iconUrl: 'https://github.githubassets.com/favicons/favicon.svg',
                description: 'GitHub service status',
                defaultSize: { w: 4, h: 3 },
                category: 'infrastructure'
            },
            {
                id: 'service-status',
                name: 'Service Status Grid',
                icon: '',
                iconUrl: 'https://www.statuspage.io/favicon.ico',
                description: 'Major service status overview',
                defaultSize: { w: 8, h: 5 },
                category: 'infrastructure'
            },
            {
                id: 'air-quality',
                name: 'Air Quality',
                icon: '',
                iconUrl: 'https://openaq.org/favicon.ico',
                description: 'Local air quality index',
                defaultSize: { w: 4, h: 3 },
                category: 'local',
                requiresLocation: true
            },
            {
                id: 'crypto-panic',
                name: 'Crypto Fear & Greed',
                icon: '',
                iconUrl: 'https://alternative.me/favicon.ico',
                description: 'Cryptocurrency sentiment index',
                defaultSize: { w: 4, h: 3 },
                category: 'internet'
            },
            {
                id: 'pentagon-pizza',
                name: 'Pentagon Pizza Tracker',
                icon: '',
                iconUrl: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%2275%22 font-size=%2275%22%3E%3C/text%3E%3C/svg%3E',
                description: 'DEFCON PIZZA - Threat level indicator',
                defaultSize: { w: 3, h: 3 },
                category: 'fun'
            }
        ];
    }
    loadSavedLayout() {
        const saved = localStorage.getItem('situation_layout');
        if (saved) {
            const parsed = JSON.parse(saved);
            const hasOldLayout = parsed.every(w => w.x < 12);
            if (hasOldLayout && parsed.length > 0) {

                console.log('Detected old 12-column layout, migrating to 24-column grid');
                localStorage.removeItem('situation_layout');
                this.widgetInstances = this.getDefaultLayout();
            } else {
                this.widgetInstances = parsed;
            }
        } else {
            this.widgetInstances = this.getDefaultLayout();
        }
    }
    getDefaultLayout() {
        return [
            // Status widgets
            { id: 'widget-0', type: 'discord-status', x: 0, y: 0, w: 5, h: 4, settings: {} },
            { id: 'widget-1', type: 'local-weather', x: 5, y: 0, w: 5, h: 4, settings: {} },
            { id: 'widget-2', type: 'air-quality', x: 10, y: 0, w: 3, h: 3, settings: {} },
            { id: 'widget-3', type: 'pentagon-pizza', x: 13, y: 0, w: 3, h: 3, settings: {} },
            { id: 'widget-4', type: 'crypto-panic', x: 16, y: 0, w: 4, h: 3, settings: {} },
            { id: 'widget-5', type: 'github-status', x: 20, y: 0, w: 4, h: 3, settings: {} },
            // Larger tracking widgets
            { id: 'widget-6', type: 'iss-tracker', x: 0, y: 4, w: 6, h: 4, settings: {} },
            { id: 'widget-7', type: 'service-status', x: 6, y: 4, w: 9, h: 5, settings: {} },
            { id: 'widget-8', type: 'earthquake-tracker', x: 15, y: 4, w: 9, h: 5, settings: {} },
            { id: 'widget-9', type: 'weather-radar', x: 0, y: 9, w: 12, h: 7, settings: {} },
            { id: 'widget-10', type: 'flight-tracker', x: 12, y: 9, w: 12, h: 7, settings: {} }
        ];
    }
    saveLayout() {
        localStorage.setItem('situation_layout', JSON.stringify(this.widgetInstances));
    }
    render(containerId) {
        this.gridContainer = document.getElementById(containerId);
        if (!this.gridContainer) {
            console.error('Grid container not found:', containerId);
            return;
        }
        this.gridContainer.innerHTML = '';
        if (this.widgetInstances.length === 0) {
            this.renderEmptyState();
            return;
        }
        this.widgetInstances.forEach(instance => {
            const widgetEl = this.createWidgetElement(instance);
            this.gridContainer.appendChild(widgetEl);
            this.widgets.set(instance.id, widgetEl);
            this.loadWidgetContent(instance.id);
        });
    }
    renderEmptyState() {
        this.gridContainer.innerHTML = `
            <div class="dashboard-empty">
                <h2> No Widgets Yet</h2>
                <p>Click "Add Widget" to start monitoring the situation!</p>
            </div>
        `;
    }
    createWidgetElement(instance) {
        const definition = this.widgetCatalog.find(w => w.id === instance.type);
        if (!definition) {
            console.error('Widget type not found:', instance.type);
            return null;
        }
        const widget = document.createElement('div');
        widget.className = 'widget';
        widget.id = instance.id;
        widget.dataset.type = instance.type;
        widget.dataset.x = instance.x;
        widget.dataset.y = instance.y;
        widget.dataset.w = instance.w;
        widget.dataset.h = instance.h;
        widget.style.gridColumn = `${instance.x + 1} / span ${instance.w}`;
        widget.style.gridRow = `${instance.y + 1} / span ${instance.h}`;
        const iconHTML = definition.iconUrl
            ? `<img src="${definition.iconUrl}" class="widget-icon-img" alt="${definition.name}" onerror="this.style.display='none'">`
            : `<span class="widget-icon">${definition.icon}</span>`;
        widget.innerHTML = `
            <div class="widget-header">
                <h3 class="widget-title">
                    ${iconHTML}
                    ${definition.name}
                </h3>
                <div class="widget-controls">
                    <button class="widget-control-btn settings" title="Settings">⚙️</button>
                    <button class="widget-control-btn refresh" title="Refresh">🔄</button>
                    <button class="widget-control-btn remove" title="Remove">✕</button>
                </div>
            </div>
            <div class="widget-content">
                <div class="widget-loading">Loading...</div>
            </div>
            <div class="resize-handle se"></div>
            <div class="resize-handle e"></div>
            <div class="resize-handle s"></div>
        `;
        return widget;
    }
    setupEventListeners() {

        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove')) {
                const widget = e.target.closest('.widget');
                if (widget) this.removeWidget(widget.id);
            }
            if (e.target.classList.contains('refresh')) {
                const widget = e.target.closest('.widget');
                if (widget) this.refreshWidget(widget.id);
            }
        });
    }
    handleMouseDown(e) {
        // Don't allow dragging/resizing if dashboard is locked
        const container = document.querySelector('.dashboard-container');
        if (container && container.classList.contains('dashboard-locked')) {
            return;
        }

        if (e.target.classList.contains('resize-handle')) {
            e.stopPropagation();
            e.preventDefault();
            this.isResizing = true;
            this.isDragging = false;
            this.currentDragWidget = e.target.closest('.widget');
            if (e.target.classList.contains('se')) {
                this.resizeDirection = 'se';
            } else if (e.target.classList.contains('e')) {
                this.resizeDirection = 'e';
            } else if (e.target.classList.contains('s')) {
                this.resizeDirection = 's';
            }
            this.startX = e.clientX;
            this.startY = e.clientY;
            this.startW = parseInt(this.currentDragWidget.dataset.w);
            this.startH = parseInt(this.currentDragWidget.dataset.h);
            this.currentDragWidget.classList.add('resizing');
            return;
        }
        const header = e.target.closest('.widget-header');
        if (header && !e.target.classList.contains('widget-control-btn') && !e.target.closest('.widget-control-btn')) {
            const widget = header.closest('.widget');
            if (widget) {
                e.preventDefault();
                this.isDragging = true;
                this.isResizing = false;
                this.currentDragWidget = widget;
                this.startX = e.clientX;
                this.startY = e.clientY;
                this.dragStartX = parseInt(widget.dataset.x);
                this.dragStartY = parseInt(widget.dataset.y);
                widget.classList.add('dragging');
            }
        }
    }
    handleMouseMove(e) {
        if (this.isDragging && this.currentDragWidget) {
            e.preventDefault();
            const deltaX = e.clientX - this.startX;
            const deltaY = e.clientY - this.startY;
            const gridRect = this.gridContainer.getBoundingClientRect();
            const gap = 3;
            const cellWidth = (gridRect.width - (23 * gap)) / 24;
            const cellHeight = 60;
            const deltaCols = Math.round(deltaX / (cellWidth + gap));
            const deltaRows = Math.round(deltaY / (cellHeight + gap));

            let newX = Math.max(0, Math.min(23, this.dragStartX + deltaCols));
            let newY = Math.max(0, this.dragStartY + deltaRows);
            const w = parseInt(this.currentDragWidget.dataset.w);
            const h = parseInt(this.currentDragWidget.dataset.h);

            // Keep widget within grid bounds
            newX = Math.min(newX, 24 - w);

            this.currentDragWidget.dataset.x = newX;
            this.currentDragWidget.dataset.y = newY;
            this.currentDragWidget.style.gridColumn = `${newX + 1} / span ${w}`;
            this.currentDragWidget.style.gridRow = `${newY + 1} / span ${h}`;
            this.currentDragWidget.style.opacity = '0.7';
            return;
        }
        if (this.isResizing && this.currentDragWidget) {
            const deltaX = e.clientX - this.startX;
            const deltaY = e.clientY - this.startY;
            const gridRect = this.gridContainer.getBoundingClientRect();
            const gap = 3;
            const cellWidth = (gridRect.width - (23 * gap)) / 24;
            const cellHeight = 60;
            const deltaCols = Math.round(deltaX / (cellWidth + gap));
            const deltaRows = Math.round(deltaY / (cellHeight + gap));
            if (Math.abs(deltaCols) === 0 && Math.abs(deltaRows) === 0) return;
            const x = parseInt(this.currentDragWidget.dataset.x);
            const y = parseInt(this.currentDragWidget.dataset.y);
            if (this.resizeDirection === 'e' || this.resizeDirection === 'se') {
                const rightEdge = x + this.startW;
                const adjacentRight = this.widgetInstances.find(w =>
                    w.id !== this.currentDragWidget.id &&
                    w.x === rightEdge &&
                    w.y < y + this.startH &&
                    w.y + w.h > y
                );
                let newW = Math.max(1, this.startW + deltaCols);
                newW = Math.max(1, Math.min(24 - x, newW));
                this.currentDragWidget.dataset.w = newW;
                this.currentDragWidget.style.gridColumn = `${x + 1} / span ${newW}`;
                if (adjacentRight) {
                    const rightWidget = this.widgets.get(adjacentRight.id);
                    if (rightWidget) {
                        const newRightW = Math.max(1, adjacentRight.w - deltaCols);
                        const newRightX = x + newW;
                        rightWidget.dataset.w = newRightW;
                        rightWidget.dataset.x = newRightX;
                        rightWidget.style.gridColumn = `${newRightX + 1} / span ${newRightW}`;
                        adjacentRight.w = newRightW;
                        adjacentRight.x = newRightX;
                    }
                }
            }
            if (this.resizeDirection === 's' || this.resizeDirection === 'se') {
                const bottomEdge = y + this.startH;
                const adjacentBottom = this.widgetInstances.find(w =>
                    w.id !== this.currentDragWidget.id &&
                    w.y === bottomEdge &&
                    w.x < x + this.startW &&
                    w.x + w.w > x
                );
                let newH = Math.max(1, this.startH + deltaRows);
                newH = Math.max(1, Math.min(20, newH));
                this.currentDragWidget.dataset.h = newH;
                this.currentDragWidget.style.gridRow = `${y + 1} / span ${newH}`;
                if (adjacentBottom) {
                    const bottomWidget = this.widgets.get(adjacentBottom.id);
                    if (bottomWidget) {
                        const newBottomH = Math.max(1, adjacentBottom.h - deltaRows);
                        const newBottomY = y + newH;
                        bottomWidget.dataset.h = newBottomH;
                        bottomWidget.dataset.y = newBottomY;
                        bottomWidget.style.gridRow = `${newBottomY + 1} / span ${newBottomH}`;
                        adjacentBottom.h = newBottomH;
                        adjacentBottom.y = newBottomY;
                    }
                }
            }
        }
    }
    handleMouseUp(e) {
        if (this.isDragging) {
            this.currentDragWidget.classList.remove('dragging');
            this.currentDragWidget.style.opacity = '1';
            this.updateInstanceFromElement(this.currentDragWidget);
            this.saveLayout();
            this.isDragging = false;
            this.currentDragWidget = null;
        }
        if (this.isResizing) {
            this.currentDragWidget.classList.remove('resizing');
            this.isResizing = false;
            this.updateInstanceFromElement(this.currentDragWidget);
            this.saveLayout();
            this.refreshWidget(this.currentDragWidget.id);
            this.currentDragWidget = null;
        }
    }
    updateInstanceFromElement(element) {
        const instance = this.widgetInstances.find(w => w.id === element.id);
        if (instance) {
            instance.x = parseInt(element.dataset.x);
            instance.y = parseInt(element.dataset.y);
            instance.w = parseInt(element.dataset.w);
            instance.h = parseInt(element.dataset.h);
        }
    }
    addWidget(typeId) {
        const definition = this.widgetCatalog.find(w => w.id === typeId);
        if (!definition) return;
        const newWidget = {
            id: `widget-${Date.now()}`,
            type: typeId,
            x: 0,
            y: 0,
            w: definition.defaultSize.w,
            h: definition.defaultSize.h,
            settings: {}
        };
        this.widgetInstances.push(newWidget);
        this.saveLayout();
        this.render('widget-grid');
    }
    removeWidget(widgetId) {
        this.widgetInstances = this.widgetInstances.filter(w => w.id !== widgetId);
        this.widgets.delete(widgetId);
        this.saveLayout();
        this.render('widget-grid');
    }
    refreshWidget(widgetId) {
        this.loadWidgetContent(widgetId);
    }
    async loadWidgetContent(widgetId) {
        const instance = this.widgetInstances.find(w => w.id === widgetId);
        if (!instance) return;
        const element = this.widgets.get(widgetId);
        if (!element) return;
        const contentDiv = element.querySelector('.widget-content');
        try {
            switch (instance.type) {
                case 'discord-status':
                    await this.loadDiscordStatus(contentDiv);
                    break;
                case 'local-weather':
                    await this.loadLocalWeather(contentDiv);
                    break;
                case 'iss-tracker':
                    await this.loadISSTracker(contentDiv);
                    break;
                case 'earthquake-tracker':
                    await this.loadEarthquakeTracker(contentDiv);
                    break;
                case 'downdetector':
                    this.loadDownDetector(contentDiv);
                    break;
                case 'weather-radar':
                    this.loadWeatherRadar(contentDiv);
                    break;
                case 'flight-tracker':
                    this.loadFlightTracker(contentDiv);
                    break;
                case 'github-status':
                    await this.loadGitHubStatus(contentDiv);
                    break;
                case 'service-status':
                    await this.loadServiceStatusGrid(contentDiv);
                    break;
                case 'air-quality':
                    await this.loadAirQuality(contentDiv);
                    break;
                case 'crypto-panic':
                    await this.loadCryptoPanic(contentDiv);
                    break;
                case 'pentagon-pizza':
                    await this.loadPentagonPizza(contentDiv);
                    break;
                default:
                    contentDiv.innerHTML = '<div class="widget-error">Widget type not implemented yet</div>';
            }
        } catch (error) {
            console.error('Error loading widget:', error);
            contentDiv.innerHTML = `<div class="widget-error">Failed to load data<br><small>${error.message}</small></div>`;
        }
    }
    async loadDiscordStatus(container) {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/177923398635184129`);
            const data = await response.json();

            if (data.success) {
                const userData = data.data;
                const status = userData.discord_status || 'offline';

                // Status colors
                const statusColors = {
                    online: '#50fa7b',
                    idle: '#f1fa8c',
                    dnd: '#ff5555',
                    offline: '#6272a4'
                };

                const statusColor = statusColors[status] || statusColors.offline;

                let activities = [];

                // Custom status
                if (userData.activities) {
                    const customStatus = userData.activities.find(a => a.type === 4);
                    if (customStatus && customStatus.state) {
                        activities.push({
                            type: 'custom',
                            text: customStatus.state,
                            emoji: customStatus.emoji?.name || ''
                        });
                    }

                    // Playing activity
                    const gameActivity = userData.activities.find(a => a.type === 0);
                    if (gameActivity) {
                        activities.push({
                            type: 'playing',
                            text: gameActivity.name,
                            details: gameActivity.details || '',
                            emoji: ''
                        });
                    }

                    // Spotify
                    const spotify = userData.activities.find(a => a.type === 2 && a.name === 'Spotify');
                    if (spotify && userData.spotify) {
                        activities.push({
                            type: 'spotify',
                            text: `${userData.spotify.song}`,
                            details: userData.spotify.artist,
                            emoji: ''
                        });
                    }
                }

                container.innerHTML = `
                    <div style="padding: 0.5rem; height: 100%; display: flex; flex-direction: column;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <img src="https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png"
                                 alt="Avatar"
                                 style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid ${statusColor};">
                            <div>
                                <div style="font-weight: bold; color: var(--text-primary);">${userData.discord_user.username}</div>
                                <div style="display: flex; align-items: center; gap: 0.25rem;">
                                    <span style="color: ${statusColor}; font-size: 0.8rem;">●</span>
                                    <span style="color: var(--text-secondary); font-size: 0.75rem;">${status}</span>
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1; overflow-y: auto; font-size: 0.8rem;">
                            ${activities.length > 0 ? activities.map(activity => `
                                <div style="padding: 0.25rem 0; border-top: 1px solid var(--border-color);">
                                    <div style="color: var(--text-primary);">
                                        <span>${activity.emoji}</span>
                                        ${activity.text}
                                    </div>
                                    ${activity.details ? `<div style="color: var(--text-secondary); font-size: 0.7rem; margin-left: 1.2rem;">${activity.details}</div>` : ''}
                                </div>
                            `).join('') : '<div style="color: var(--text-secondary); padding: 0.5rem;">No current activity</div>'}
                        </div>
                    </div>
                `;
            } else {
                throw new Error('Failed to fetch Discord status');
            }
        } catch (error) {
            container.innerHTML = `
                <div style="text-align: center; padding: 1rem; color: var(--text-secondary);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;"></div>
                    <div>Discord Status</div>
                    <div style="font-size: 0.7rem; margin-top: 0.5rem;">Unable to load</div>
                </div>
            `;
        }
    }

    async loadLocalWeather(container) {

        const { lat, lon, city } = this.userLocation;
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`
        );
        const data = await response.json();
        const temp = Math.round(data.current.temperature_2m);
        const feelsLike = Math.round(data.current.apparent_temperature);
        const humidity = data.current.relative_humidity_2m;
        const windSpeed = Math.round(data.current.wind_speed_10m);
        const weatherCode = data.current.weather_code;
        const weatherEmoji = this.getWeatherEmoji(weatherCode);
        container.innerHTML = `
            <div style="text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 0.25rem;">
                <div style="font-size: 2rem; margin-bottom: 0.25rem;">${weatherEmoji}</div>
                <div style="font-size: 1.75rem; font-weight: bold; color: var(--text-primary);">${temp}°F</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">Feels ${feelsLike}°F</div>
                <div style="font-size: 0.8rem; color: var(--text-primary); margin: 0.25rem 0;">${city}</div>
                <div style="display: flex; justify-content: space-around; font-size: 0.7rem; color: var(--text-secondary); gap: 0.5rem;">
                    <div>${humidity}%</div>
                    <div>${windSpeed}mph</div>
                </div>
            </div>
        `;
    }
    getWeatherEmoji(code) {

        if (code === 0) return '';
        if (code <= 3) return '';
        if (code <= 49) return '';
        if (code <= 59) return '';
        if (code <= 69) return '';
        if (code <= 79) return '';
        if (code <= 84) return '';
        if (code <= 99) return '';
        return '';
    }
    async loadISSTracker(container) {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        const lat = data.latitude.toFixed(2);
        const lon = data.longitude.toFixed(2);
        const altitude = Math.round(data.altitude);
        const velocity = Math.round(data.velocity);
        container.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 0.5rem;">
                <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8;">
                    <div><strong>Position:</strong> ${lat}°, ${lon}°</div>
                    <div><strong>Altitude:</strong> ${altitude} km</div>
                    <div><strong>Velocity:</strong> ${velocity} km/h</div>
                </div>
            </div>
        `;
        setTimeout(() => this.refreshWidget(container.closest('.widget').id), 5000);
    }
    async loadEarthquakeTracker(container) {
        const response = await fetch(
            'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
        );
        const data = await response.json();
        const earthquakes = data.features
            .sort((a, b) => b.properties.mag - a.properties.mag)
            .slice(0, 5);
        if (earthquakes.length === 0) {
            container.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-secondary);">No earthquakes in the last 24 hours</div>';
            return;
        }
        const listHTML = earthquakes.map(eq => {
            const mag = eq.properties.mag.toFixed(1);
            const place = eq.properties.place;
            const time = new Date(eq.properties.time).toLocaleTimeString();
            const color = mag >= 5 ? '#ef4444' : mag >= 3 ? '#f59e0b' : '#10b981';
            return `
                <div style="padding: 0.5rem; border-bottom: 1px solid var(--border-color);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold; color: ${color}; font-size: 1.1rem;">M${mag}</span>
                        <span style="font-size: 0.75rem; color: var(--text-tertiary);">${time}</span>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${place}</div>
                </div>
            `;
        }).join('');
        container.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div style="font-size: 0.8rem; color: var(--text-secondary); padding: 0.5rem; text-align: center; border-bottom: 1px solid var(--border-color);">
                    Top 5 / ${data.features.length} total (24h)
                </div>
                <div style="flex: 1; overflow: hidden;">
                    ${listHTML}
                </div>
            </div>
        `;
    }
    loadDownDetector(container) {

        container.innerHTML = `
            <iframe
                src="https://downdetector.com/"
                style="width: 100%; height: 100%; border: none;"
                sandbox="allow-same-origin allow-scripts">
            </iframe>
        `;
    }
    loadWeatherRadar(container) {
        const { lat, lon } = this.userLocation;
        container.innerHTML = `
            <iframe
                src="https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=6&level=surface&overlay=radar&product=radar&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
                style="width: 100%; height: 100%; border: none;">
            </iframe>
        `;
    }
    loadFlightTracker(container) {
        container.innerHTML = `
            <iframe
                src="https://globe.adsbexchange.com/"
                style="width: 100%; height: 100%; border: none;"
                sandbox="allow-same-origin allow-scripts">
            </iframe>
        `;
    }
    async loadGitHubStatus(container) {
        const response = await fetch('https://www.githubstatus.com/api/v2/status.json');
        const data = await response.json();
        const statusColor = data.status.indicator === 'none' ? '#10b981' :
                           data.status.indicator === 'minor' ? '#f59e0b' : '#ef4444';
        const statusText = data.status.description;
        container.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0.25rem;">
                <div style="width: 20px; height: 20px; border-radius: 50%; background: ${statusColor}; margin-bottom: 0.35rem;"></div>
                <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-primary); line-height: 1.2;">${statusText}</div>
            </div>
        `;
    }
    async loadServiceStatusGrid(container) {

        const services = [
            { name: 'AWS', url: 'https://status.aws.amazon.com/', logo: 'https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico', statusUrl: null },
            { name: 'Azure', url: 'https://status.azure.com/', logo: 'https://azure.microsoft.com/favicon.ico', statusUrl: null },
            { name: 'GCP', url: 'https://status.cloud.google.com/', logo: 'https://www.gstatic.com/devrel-devsite/prod/v2210deb8920cd4a55bd580441aa58e7853afc04b39a9d9ac4198e1cd7fbe04ef/cloud/images/favicons/onecloud/favicon.ico', statusUrl: null },
            { name: 'Cloudflare', url: 'https://www.cloudflarestatus.com/api/v2/status.json', logo: 'https://www.cloudflare.com/favicon.ico', statusUrl: 'api' },
            { name: 'GitHub', url: 'https://www.githubstatus.com/api/v2/status.json', logo: 'https://github.githubassets.com/favicons/favicon.svg', statusUrl: 'api' },
            { name: 'Discord', url: 'https://discordstatus.com/api/v2/status.json', logo: 'https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico', statusUrl: 'api' },
            { name: 'Reddit', url: 'https://www.redditstatus.com/api/v2/status.json', logo: 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png', statusUrl: 'api' },
            { name: 'Stripe', url: 'https://status.stripe.com/api/v2/status.json', logo: 'https://stripe.com/favicon.ico', statusUrl: 'api' }
        ];
        const statusPromises = services.map(async (service) => {
            if (service.statusUrl === 'api') {
                try {
                    const response = await fetch(service.url);
                    const data = await response.json();
                    const indicator = data.status.indicator;
                    return {
                        ...service,
                        status: indicator === 'none' ? 'operational' : indicator === 'minor' ? 'degraded' : 'down',
                        color: indicator === 'none' ? '#10b981' : indicator === 'minor' ? '#f59e0b' : '#ef4444'
                    };
                } catch (e) {
                    return { ...service, status: 'unknown', color: '#6b7280' };
                }
            } else {

                return { ...service, status: 'check', color: '#6b7280' };
            }
        });
        const statuses = await Promise.all(statusPromises);
        const gridHTML = statuses.map(service => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0.5rem; border-bottom: 1px solid var(--border-color);">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="${service.logo}" alt="${service.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" onerror="this.style.display='none'">
                    </div>
                    <span style="font-size: 0.85rem; color: var(--text-primary); font-weight: 500;">${service.name}</span>
                </div>
                <div style="width: 10px; height: 10px; border-radius: 50%; background: ${service.color};"></div>
            </div>
        `).join('');
        container.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div style="font-size: 0.75rem; color: var(--text-secondary); padding: 0.5rem; text-align: center; border-bottom: 1px solid var(--border-color); font-weight: 600;">
                    Service Status
                </div>
                <div style="flex: 1; overflow: hidden;">
                    ${gridHTML}
                </div>
            </div>
        `;
        setTimeout(() => this.refreshWidget(container.closest('.widget').id), 120000);
    }
    async loadAirQuality(container) {
        const { lat, lon, city } = this.userLocation;
        try {
            const response = await fetch(
                `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}&radius=25000&limit=1`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const measurements = data.results[0].measurements;
                const pm25 = measurements.find(m => m.parameter === 'pm25');
                if (pm25) {
                    const aqi = this.calculateAQI(pm25.value);
                    const { color, label } = this.getAQIInfo(aqi);
                    container.innerHTML = `
                        <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0.25rem;">
                            <div style="font-size: 1.75rem; font-weight: bold; color: ${color};">${Math.round(aqi)}</div>
                            <div style="font-size: 0.7rem; color: var(--text-secondary); margin: 0.15rem 0;">${label}</div>
                            <div style="font-size: 0.65rem; color: var(--text-tertiary);">${city}</div>
                        </div>
                    `;
                } else {
                    throw new Error('PM2.5 data not available');
                }
            } else {
                throw new Error('No data available');
            }
        } catch (error) {
            container.innerHTML = `
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Data unavailable</div>
                </div>
            `;
        }
    }
    calculateAQI(pm25) {

        if (pm25 <= 12) return (50 / 12) * pm25;
        if (pm25 <= 35.4) return ((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51;
        if (pm25 <= 55.4) return ((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101;
        if (pm25 <= 150.4) return ((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151;
        if (pm25 <= 250.4) return ((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201;
        return ((500 - 301) / (500.4 - 250.5)) * (pm25 - 250.5) + 301;
    }
    getAQIInfo(aqi) {
        if (aqi <= 50) return { color: '#10b981', label: 'Good' };
        if (aqi <= 100) return { color: '#f59e0b', label: 'Moderate' };
        if (aqi <= 150) return { color: '#ef4444', label: 'Unhealthy for Sensitive' };
        if (aqi <= 200) return { color: '#dc2626', label: 'Unhealthy' };
        if (aqi <= 300) return { color: '#7c2d12', label: 'Very Unhealthy' };
        return { color: '#450a0a', label: 'Hazardous' };
    }
    async loadCryptoPanic(container) {
        const response = await fetch('https://api.alternative.me/fng/');
        const data = await response.json();
        const value = parseInt(data.data[0].value);
        const classification = data.data[0].value_classification;
        const color = value <= 25 ? '#ef4444' :
                     value <= 45 ? '#f59e0b' :
                     value <= 55 ? '#10b981' :
                     value <= 75 ? '#3b82f6' : '#8b5cf6';
        container.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0.25rem;">
                <div style="font-size: 1.75rem; font-weight: bold; color: ${color};">${value}</div>
                <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 0.25rem;">${classification}</div>
            </div>
        `;
    }
    async loadPentagonPizza(container) {

        const now = new Date();
        const hour = now.getHours();
        let threatLevel = 1;
        let description = 'All Quiet';
        let pizzaCount = Math.floor(Math.random() * 3);
        if (hour >= 11 && hour <= 14) {
            pizzaCount += Math.floor(Math.random() * 8) + 5;
            threatLevel = 3;
            description = 'Lunch Operations';
        }
        else if (hour >= 17 && hour <= 20) {
            pizzaCount += Math.floor(Math.random() * 10) + 7;
            threatLevel = 4;
            description = 'Dinner Situation';
        }
        else if (hour >= 21 || hour <= 1) {
            pizzaCount += Math.floor(Math.random() * 15) + 10;
            threatLevel = 5;
            description = '🚨 CRISIS MODE';
        }
        else {
            pizzaCount += Math.floor(Math.random() * 4);
            threatLevel = Math.random() > 0.7 ? 2 : 1;
            description = threatLevel === 2 ? 'Minor Activity' : 'All Quiet';
        }
        const colors = {
            1: '#10b981',
            2: '#3b82f6',
            3: '#f59e0b',
            4: '#ef4444',
            5: '#dc2626'
        };
        container.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0.25rem;">
                <div style="font-size: 1.5rem; font-weight: bold; color: ${colors[threatLevel]}; margin-bottom: 0.15rem;">
                    DEFCON ${threatLevel}
                </div>
                <div style="font-size: 1.1rem; color: var(--text-primary); font-weight: 600;">
                    ${pizzaCount} Active
                </div>
                <div style="font-size: 0.65rem; color: var(--text-secondary);">
                    ${description}
                </div>
            </div>
        `;
        setTimeout(() => this.refreshWidget(container.closest('.widget').id), 30000);
    }

    loadPreset(presetName) {
        const presets = {
            'default': [
                { id: 'widget-1', type: 'github-status', x: 0, y: 0, w: 2, h: 2, settings: {} },
                { id: 'widget-2', type: 'crypto-panic', x: 2, y: 0, w: 2, h: 2, settings: {} },
                { id: 'widget-3', type: 'air-quality', x: 4, y: 0, w: 2, h: 2, settings: {} },
                { id: 'widget-4', type: 'pentagon-pizza', x: 6, y: 0, w: 2, h: 2, settings: {} },
                { id: 'widget-5', type: 'local-weather', x: 0, y: 2, w: 3, h: 3, settings: {} },
                { id: 'widget-6', type: 'iss-tracker', x: 3, y: 2, w: 3, h: 2, settings: {} },
                { id: 'widget-7', type: 'earthquake-tracker', x: 6, y: 2, w: 3, h: 3, settings: {} },
                { id: 'widget-8', type: 'service-status', x: 9, y: 0, w: 3, h: 4, settings: {} },
                { id: 'widget-9', type: 'weather-radar', x: 0, y: 5, w: 6, h: 5, settings: {} },
                { id: 'widget-10', type: 'flight-tracker', x: 6, y: 5, w: 6, h: 5, settings: {} },
                { id: 'widget-11', type: 'downdetector', x: 0, y: 10, w: 12, h: 4, settings: {} }
            ],
            'weather': [
                { id: 'widget-1', type: 'air-quality', x: 0, y: 0, w: 2, h: 2, settings: {} },
                { id: 'widget-2', type: 'local-weather', x: 2, y: 0, w: 3, h: 3, settings: {} },
                { id: 'widget-3', type: 'earthquake-tracker', x: 5, y: 0, w: 3, h: 3, settings: {} },
                { id: 'widget-4', type: 'pentagon-pizza', x: 0, y: 2, w: 2, h: 2, settings: {} },
                { id: 'widget-5', type: 'weather-radar', x: 0, y: 4, w: 6, h: 5, settings: {} },
                { id: 'widget-6', type: 'flight-tracker', x: 6, y: 4, w: 6, h: 5, settings: {} },
                { id: 'widget-7', type: 'service-status', x: 8, y: 0, w: 4, h: 3, settings: {} }
            ],
            'internet': [
                { id: 'widget-1', type: 'github-status', x: 0, y: 0, w: 2, h: 2, settings: {} },
                { id: 'widget-2', type: 'crypto-panic', x: 2, y: 0, w: 2, h: 2, settings: {} },
                { id: 'widget-3', type: 'pentagon-pizza', x: 4, y: 0, w: 2, h: 2, settings: {} },
                { id: 'widget-4', type: 'service-status', x: 0, y: 2, w: 4, h: 3, settings: {} },
                { id: 'widget-5', type: 'iss-tracker', x: 4, y: 2, w: 3, h: 2, settings: {} },
                { id: 'widget-6', type: 'downdetector', x: 0, y: 5, w: 12, h: 4, settings: {} },
                { id: 'widget-7', type: 'flight-tracker', x: 0, y: 9, w: 6, h: 5, settings: {} },
                { id: 'widget-8', type: 'local-weather', x: 6, y: 9, w: 3, h: 3, settings: {} },
                { id: 'widget-9', type: 'earthquake-tracker', x: 9, y: 9, w: 3, h: 3, settings: {} }
            ]
        };
        if (presets[presetName]) {
            this.widgetInstances = presets[presetName];
            this.saveLayout();
            this.render('widget-grid');
        }
    }
}
let dashboard;
function initSituationDashboard() {
    dashboard = new SituationDashboard();
    dashboard.render('widget-grid');
    updateTickerLocation();
    setInterval(updateTickerAlerts, 30000);
}
function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.classList.toggle('open');
}
function addWidgetFromGallery(typeId) {
    dashboard.addWidget(typeId);
    toggleSettings();
}
function toggleLockMode() {
    const container = document.querySelector('.dashboard-container');
    const btn = document.getElementById('lock-btn');
    const tickerMode = document.getElementById('ticker-mode');
    const isLocked = container.classList.toggle('dashboard-locked');
    if (isLocked) {
        btn.textContent = '🔒 Unlock';
        btn.classList.add('active');
        if (tickerMode) tickerMode.textContent = 'Locked';
    } else {
        btn.textContent = '🔓 Lock';
        btn.classList.remove('active');
        if (tickerMode) tickerMode.textContent = 'Edit';
    }
}
function detectUserLocation() {
    const btn = document.getElementById('detect-location-btn');
    const statusDiv = document.getElementById('location-status');
    if (btn) {
        btn.textContent = 'Detecting...';
        btn.disabled = true;
    }
    dashboard.detectLocation()
        .then(location => {
            if (btn) {
                btn.textContent = 'Use My Location';
                btn.disabled = false;
            }
            if (statusDiv) {
                statusDiv.textContent = `${location.city} (${location.lat.toFixed(2)}, ${location.lon.toFixed(2)})`;
            }
            updateTickerLocation();
            dashboard.render('widget-grid');
        })
        .catch(error => {
            if (btn) {
                btn.textContent = 'Use My Location';
                btn.disabled = false;
            }
            if (statusDiv) {
                statusDiv.textContent = `Error: ${error.message}`;
            }
            alert('Failed to detect location: ' + error.message);
        });
}
function loadPresetLayout(presetName) {
    dashboard.loadPreset(presetName);
    toggleSettings();
}
function resetToDefault() {
    if (confirm('Reset to default layout?')) {
        localStorage.removeItem('situation_layout');
        dashboard.loadSavedLayout();
        dashboard.saveLayout();
        dashboard.render('widget-grid');
    }
}
async function updateLocation() {
    const input = document.getElementById('location-input');
    const locationText = input.value.trim();
    if (!locationText) return;
    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationText)}&format=json&limit=1`
        );
        const data = await response.json();
        if (data && data.length > 0) {
            const result = data[0];
            dashboard.userLocation = {
                lat: parseFloat(result.lat),
                lon: parseFloat(result.lon),
                city: result.display_name.split(',')[0],
                autoDetected: false
            };
            dashboard.saveUserLocation();
            updateTickerLocation();
            dashboard.render('widget-grid');
            input.value = '';
        } else {
            alert('Location not found. Try a different search term.');
        }
    } catch (error) {
        alert('Failed to geocode location: ' + error.message);
    }
}
function updateTickerLocation() {
    const tickerLocation = document.getElementById('ticker-location');
    if (tickerLocation && dashboard.userLocation) {
        tickerLocation.textContent = dashboard.userLocation.city;
    }
}
async function updateTickerAlerts() {
    const alerts = [];
    try {

        const services = [
            { name: 'GitHub', url: 'https://www.githubstatus.com/api/v2/status.json' },
            { name: 'Discord', url: 'https://discordstatus.com/api/v2/status.json' },
            { name: 'Cloudflare', url: 'https://www.cloudflarestatus.com/api/v2/status.json' }
        ];
        const serviceChecks = await Promise.all(
            services.map(async (service) => {
                try {
                    const res = await fetch(service.url);
                    const data = await res.json();
                    if (data.status.indicator !== 'none') {
                        return `${service.name} ${data.status.indicator.toUpperCase()}`;
                    }
                } catch (e) {
                    return `${service.name} UNREACHABLE`;
                }
                return null;
            })
        );
        alerts.push(...serviceChecks.filter(Boolean));
        const { lat, lon } = dashboard.userLocation;
        try {
            const aqRes = await fetch(
                `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}&radius=25000&limit=1`
            );
            const aqData = await aqRes.json();
            if (aqData.results && aqData.results.length > 0) {
                const pm25 = aqData.results[0].measurements.find(m => m.parameter === 'pm25');
                if (pm25) {
                    const aqi = dashboard.calculateAQI(pm25.value);
                    if (aqi > 100) {
                        alerts.push(`Air Quality UNHEALTHY (${Math.round(aqi)})`);
                    }
                }
            }
        } catch (e) {}
        const tickerAlerts = document.getElementById('ticker-alerts');
        if (tickerAlerts) {
            if (alerts.length === 0) {
                tickerAlerts.textContent = 'All systems operational';
                tickerAlerts.style.color = '';
            } else {
                tickerAlerts.textContent = alerts.join(' | ');
                tickerAlerts.style.color = '#ef4444';
            }
        }
    } catch (error) {
        console.error('Failed to update ticker alerts:', error);
    }
}