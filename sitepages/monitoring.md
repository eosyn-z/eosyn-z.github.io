---
layout: page
title: "📊 System Monitoring"
description: "Real-time monitoring dashboard with weather, radiation, and system metrics"
icon: "📊"
permalink: /monitoring/
---

<div class="glass-container">
    <div class="page-header">
        <h1>📊 System Monitoring Dashboard</h1>
        <p>Real-time monitoring of weather, radiation, and system metrics</p>
    </div>

    <div class="monitoring-grid">
        <!-- Weather Widget -->
        <div class="monitoring-widget glass-card" id="weather-widget">
            <div class="widget-header">
                <h3>🌤️ Weather</h3>
                <div class="widget-controls">
                    <button class="glass-button" onclick="refreshWeather()">🔄</button>
                    <button class="glass-button" onclick="toggleWeatherLocation()">📍</button>
                </div>
            </div>
            <div class="widget-content" id="weather-content">
                <div class="loading-spinner">Loading weather data...</div>
            </div>
        </div>

        <!-- Radiation Widget -->
        <div class="monitoring-widget glass-card" id="radiation-widget">
            <div class="widget-header">
                <h3>☢️ Radiation Monitor</h3>
                <div class="widget-controls">
                    <button class="glass-button" onclick="refreshRadiation()">🔄</button>
                </div>
            </div>
            <div class="widget-content" id="radiation-content">
                <div class="loading-spinner">Loading radiation data...</div>
            </div>
        </div>

        <!-- System Metrics Widget -->
        <div class="monitoring-widget glass-card" id="system-widget">
            <div class="widget-header">
                <h3>💻 System Metrics</h3>
                <div class="widget-controls">
                    <button class="glass-button" onclick="refreshSystemMetrics()">🔄</button>
                </div>
            </div>
            <div class="widget-content" id="system-content">
                <div class="loading-spinner">Loading system data...</div>
            </div>
        </div>

        <!-- Network Status Widget -->
        <div class="monitoring-widget glass-card" id="network-widget">
            <div class="widget-header">
                <h3>🌐 Network Status</h3>
                <div class="widget-controls">
                    <button class="glass-button" onclick="refreshNetwork()">🔄</button>
                </div>
            </div>
            <div class="widget-content" id="network-content">
                <div class="loading-spinner">Loading network data...</div>
            </div>
        </div>

        <!-- Air Quality Widget -->
        <div class="monitoring-widget glass-card" id="air-quality-widget">
            <div class="widget-header">
                <h3>🌬️ Air Quality</h3>
                <div class="widget-controls">
                    <button class="glass-button" onclick="refreshAirQuality()">🔄</button>
                </div>
            </div>
            <div class="widget-content" id="air-quality-content">
                <div class="loading-spinner">Loading air quality data...</div>
            </div>
        </div>

        <!-- Solar Activity Widget -->
        <div class="monitoring-widget glass-card" id="solar-widget">
            <div class="widget-header">
                <h3>☀️ Solar Activity</h3>
                <div class="widget-controls">
                    <button class="glass-button" onclick="refreshSolar()">🔄</button>
                </div>
            </div>
            <div class="widget-content" id="solar-content">
                <div class="loading-spinner">Loading solar data...</div>
            </div>
        </div>
    </div>

    <div class="monitoring-controls">
        <button class="glass-button" onclick="refreshAllWidgets()">🔄 Refresh All</button>
        <button class="glass-button" onclick="toggleAutoRefresh()">⏰ Auto Refresh</button>
        <button class="glass-button" onclick="exportMonitoringData()">📊 Export Data</button>
    </div>
</div>

<style>
.monitoring-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.monitoring-widget {
    min-height: 300px;
    padding: 1.5rem;
    border-radius: 15px;
    background: var(--glass-bg-light);
    backdrop-filter: var(--glass-blur-light);
    border: 1px solid var(--glass-border-light);
    transition: all 0.3s ease;
}

.monitoring-widget:hover {
    transform: translateY(-5px);
    box-shadow: var(--glass-shadow-heavy);
}

.widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--glass-border-light);
}

.widget-header h3 {
    margin: 0;
    color: var(--theme-text);
    font-size: 1.2rem;
}

.widget-controls {
    display: flex;
    gap: 0.5rem;
}

.widget-content {
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.loading-spinner {
    color: var(--theme-text-secondary);
    font-style: italic;
}

.monitoring-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.weather-display {
    text-align: center;
    width: 100%;
}

.weather-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.weather-temp {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--theme-text);
    margin-bottom: 0.5rem;
}

.weather-desc {
    color: var(--theme-text-secondary);
    margin-bottom: 1rem;
}

.weather-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    text-align: left;
}

.weather-detail {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: var(--glass-bg-medium);
    border-radius: 8px;
}

.metric-display {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
}

.metric-item {
    text-align: center;
    padding: 1rem;
    background: var(--glass-bg-medium);
    border-radius: 10px;
}

.metric-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--theme-text);
    margin-bottom: 0.5rem;
}

.metric-label {
    font-size: 0.9rem;
    color: var(--theme-text-secondary);
}

.status-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.5rem;
}

.status-online {
    background: #4CAF50;
}

.status-offline {
    background: #f44336;
}

.status-warning {
    background: #ff9800;
}

@media (max-width: 768px) {
    .monitoring-grid {
        grid-template-columns: 1fr;
    }
    
    .monitoring-controls {
        flex-direction: column;
        align-items: center;
    }
}
</style>

<script>
// Monitoring Dashboard System
class MonitoringDashboard {
    constructor() {
        this.autoRefreshInterval = null;
        this.autoRefreshEnabled = false;
        this.refreshInterval = 30000; // 30 seconds
        this.init();
    }

    init() {
        this.loadAllWidgets();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Auto-refresh toggle
        window.toggleAutoRefresh = () => {
            this.autoRefreshEnabled = !this.autoRefreshEnabled;
            if (this.autoRefreshEnabled) {
                this.startAutoRefresh();
            } else {
                this.stopAutoRefresh();
            }
        };

        // Refresh all widgets
        window.refreshAllWidgets = () => {
            this.loadAllWidgets();
        };

        // Export data
        window.exportMonitoringData = () => {
            this.exportData();
        };
    }

    loadAllWidgets() {
        this.loadWeather();
        this.loadRadiation();
        this.loadSystemMetrics();
        this.loadNetworkStatus();
        this.loadAirQuality();
        this.loadSolarActivity();
    }

    async loadWeather() {
        const content = document.getElementById('weather-content');
        try {
            // Simulate weather API call (replace with real API)
            const weatherData = await this.getWeatherData();
            this.displayWeather(weatherData);
        } catch (error) {
            content.innerHTML = '<div style="color: var(--theme-text-secondary);">Weather data unavailable</div>';
        }
    }

    async getWeatherData() {
        // Simulate API call - replace with real weather API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    temperature: Math.floor(Math.random() * 30) + 10,
                    description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
                    humidity: Math.floor(Math.random() * 40) + 40,
                    windSpeed: Math.floor(Math.random() * 20) + 5,
                    pressure: Math.floor(Math.random() * 50) + 1000,
                    icon: ['☀️', '☁️', '🌧️', '⛅'][Math.floor(Math.random() * 4)]
                });
            }, 1000);
        });
    }

    displayWeather(data) {
        const content = document.getElementById('weather-content');
        content.innerHTML = `
            <div class="weather-display">
                <div class="weather-icon">${data.icon}</div>
                <div class="weather-temp">${data.temperature}°C</div>
                <div class="weather-desc">${data.description}</div>
                <div class="weather-details">
                    <div class="weather-detail">
                        <span>Humidity:</span>
                        <span>${data.humidity}%</span>
                    </div>
                    <div class="weather-detail">
                        <span>Wind:</span>
                        <span>${data.windSpeed} km/h</span>
                    </div>
                    <div class="weather-detail">
                        <span>Pressure:</span>
                        <span>${data.pressure} hPa</span>
                    </div>
                    <div class="weather-detail">
                        <span>Location:</span>
                        <span>Auto-detected</span>
                    </div>
                </div>
            </div>
        `;
    }

    async loadRadiation() {
        const content = document.getElementById('radiation-content');
        try {
            const radiationData = await this.getRadiationData();
            this.displayRadiation(radiationData);
        } catch (error) {
            content.innerHTML = '<div style="color: var(--theme-text-secondary);">Radiation data unavailable</div>';
        }
    }

    async getRadiationData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    background: (Math.random() * 0.2 + 0.1).toFixed(3),
                    cosmic: (Math.random() * 0.1 + 0.05).toFixed(3),
                    terrestrial: (Math.random() * 0.15 + 0.08).toFixed(3),
                    status: ['Normal', 'Elevated', 'Normal'][Math.floor(Math.random() * 3)]
                });
            }, 800);
        });
    }

    displayRadiation(data) {
        const content = document.getElementById('radiation-content');
        const statusColor = data.status === 'Normal' ? 'status-online' : 'status-warning';
        
        content.innerHTML = `
            <div class="metric-display">
                <div class="metric-item">
                    <div class="metric-value">${data.background}</div>
                    <div class="metric-label">Background (μSv/h)</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.cosmic}</div>
                    <div class="metric-label">Cosmic (μSv/h)</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.terrestrial}</div>
                    <div class="metric-label">Terrestrial (μSv/h)</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">
                        <span class="status-indicator ${statusColor}"></span>
                        ${data.status}
                    </div>
                    <div class="metric-label">Status</div>
                </div>
            </div>
        `;
    }

    async loadSystemMetrics() {
        const content = document.getElementById('system-content');
        try {
            const systemData = await this.getSystemData();
            this.displaySystemMetrics(systemData);
        } catch (error) {
            content.innerHTML = '<div style="color: var(--theme-text-secondary);">System data unavailable</div>';
        }
    }

    async getSystemData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    cpu: Math.floor(Math.random() * 30) + 10,
                    memory: Math.floor(Math.random() * 40) + 30,
                    disk: Math.floor(Math.random() * 20) + 15,
                    network: Math.floor(Math.random() * 50) + 20,
                    uptime: Math.floor(Math.random() * 24) + 1,
                    processes: Math.floor(Math.random() * 100) + 50
                });
            }, 600);
        });
    }

    displaySystemMetrics(data) {
        const content = document.getElementById('system-content');
        content.innerHTML = `
            <div class="metric-display">
                <div class="metric-item">
                    <div class="metric-value">${data.cpu}%</div>
                    <div class="metric-label">CPU Usage</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.memory}%</div>
                    <div class="metric-label">Memory Usage</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.disk}%</div>
                    <div class="metric-label">Disk Usage</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.network}%</div>
                    <div class="metric-label">Network</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.uptime}h</div>
                    <div class="metric-label">Uptime</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.processes}</div>
                    <div class="metric-label">Processes</div>
                </div>
            </div>
        `;
    }

    async loadNetworkStatus() {
        const content = document.getElementById('network-content');
        try {
            const networkData = await this.getNetworkData();
            this.displayNetworkStatus(networkData);
        } catch (error) {
            content.innerHTML = '<div style="color: var(--theme-text-secondary);">Network data unavailable</div>';
        }
    }

    async getNetworkData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 'Online',
                    latency: Math.floor(Math.random() * 50) + 10,
                    download: (Math.random() * 50 + 10).toFixed(1),
                    upload: (Math.random() * 20 + 5).toFixed(1),
                    connections: Math.floor(Math.random() * 100) + 50
                });
            }, 500);
        });
    }

    displayNetworkStatus(data) {
        const content = document.getElementById('network-content');
        content.innerHTML = `
            <div class="metric-display">
                <div class="metric-item">
                    <div class="metric-value">
                        <span class="status-indicator status-online"></span>
                        ${data.status}
                    </div>
                    <div class="metric-label">Connection</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.latency}ms</div>
                    <div class="metric-label">Latency</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.download} Mbps</div>
                    <div class="metric-label">Download</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.upload} Mbps</div>
                    <div class="metric-label">Upload</div>
                </div>
            </div>
        `;
    }

    async loadAirQuality() {
        const content = document.getElementById('air-quality-content');
        try {
            const airData = await this.getAirQualityData();
            this.displayAirQuality(airData);
        } catch (error) {
            content.innerHTML = '<div style="color: var(--theme-text-secondary);">Air quality data unavailable</div>';
        }
    }

    async getAirQualityData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    aqi: Math.floor(Math.random() * 100) + 20,
                    pm25: Math.floor(Math.random() * 30) + 5,
                    pm10: Math.floor(Math.random() * 50) + 10,
                    co2: Math.floor(Math.random() * 200) + 400,
                    status: ['Good', 'Moderate', 'Good'][Math.floor(Math.random() * 3)]
                });
            }, 700);
        });
    }

    displayAirQuality(data) {
        const content = document.getElementById('air-quality-content');
        const statusColor = data.status === 'Good' ? 'status-online' : 'status-warning';
        
        content.innerHTML = `
            <div class="metric-display">
                <div class="metric-item">
                    <div class="metric-value">${data.aqi}</div>
                    <div class="metric-label">Air Quality Index</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.pm25} μg/m³</div>
                    <div class="metric-label">PM2.5</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.pm10} μg/m³</div>
                    <div class="metric-label">PM10</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">
                        <span class="status-indicator ${statusColor}"></span>
                        ${data.status}
                    </div>
                    <div class="metric-label">Status</div>
                </div>
            </div>
        `;
    }

    async loadSolarActivity() {
        const content = document.getElementById('solar-content');
        try {
            const solarData = await this.getSolarData();
            this.displaySolarActivity(solarData);
        } catch (error) {
            content.innerHTML = '<div style="color: var(--theme-text-secondary);">Solar data unavailable</div>';
        }
    }

    async getSolarData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    sunspots: Math.floor(Math.random() * 50) + 10,
                    flares: Math.floor(Math.random() * 5),
                    geomagnetic: ['Quiet', 'Unsettled', 'Active'][Math.floor(Math.random() * 3)],
                    solarWind: (Math.random() * 100 + 300).toFixed(0)
                });
            }, 900);
        });
    }

    displaySolarActivity(data) {
        const content = document.getElementById('solar-content');
        content.innerHTML = `
            <div class="metric-display">
                <div class="metric-item">
                    <div class="metric-value">${data.sunspots}</div>
                    <div class="metric-label">Sunspots</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.flares}</div>
                    <div class="metric-label">Solar Flares</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.geomagnetic}</div>
                    <div class="metric-label">Geomagnetic</div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.solarWind} km/s</div>
                    <div class="metric-label">Solar Wind</div>
                </div>
            </div>
        `;
    }

    startAutoRefresh() {
        this.autoRefreshInterval = setInterval(() => {
            this.loadAllWidgets();
        }, this.refreshInterval);
    }

    stopAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
        }
    }

    exportData() {
        const data = {
            timestamp: new Date().toISOString(),
            weather: this.getCurrentWeatherData(),
            radiation: this.getCurrentRadiationData(),
            system: this.getCurrentSystemData(),
            network: this.getCurrentNetworkData(),
            airQuality: this.getCurrentAirQualityData(),
            solar: this.getCurrentSolarData()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `monitoring-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Helper methods to get current data (simplified)
    getCurrentWeatherData() { return { temperature: '22°C', status: 'Sunny' }; }
    getCurrentRadiationData() { return { background: '0.15 μSv/h', status: 'Normal' }; }
    getCurrentSystemData() { return { cpu: '25%', memory: '45%' }; }
    getCurrentNetworkData() { return { status: 'Online', latency: '25ms' }; }
    getCurrentAirQualityData() { return { aqi: '45', status: 'Good' }; }
    getCurrentSolarData() { return { sunspots: '25', geomagnetic: 'Quiet' }; }
}

// Initialize monitoring dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.monitoringDashboard = new MonitoringDashboard();
    
    // Set up individual refresh functions
    window.refreshWeather = () => window.monitoringDashboard.loadWeather();
    window.refreshRadiation = () => window.monitoringDashboard.loadRadiation();
    window.refreshSystemMetrics = () => window.monitoringDashboard.loadSystemMetrics();
    window.refreshNetwork = () => window.monitoringDashboard.loadNetworkStatus();
    window.refreshAirQuality = () => window.monitoringDashboard.loadAirQuality();
    window.refreshSolar = () => window.monitoringDashboard.loadSolarActivity();
    
    console.log('📊 Monitoring Dashboard loaded!');
});
</script> 