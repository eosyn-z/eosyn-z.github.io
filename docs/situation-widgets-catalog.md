# Situation Dashboard - Widget Catalog

Complete catalog of all available widgets for the "Monitoring the Situation" dashboard.

## Widget Size Categories

- **Compact (1×1)**: Status indicators, single metrics
- **Standard (2×2)**: Basic embeds, simple charts
- **Wide (4×2)**: Horizontal layouts, timelines
- **Large (4×4)**: Maps, complex visualizations
- **Custom**: User-resizable

---

## 1. Weather & Environment

### 1.1 Global Weather Radar
- **ID**: `weather-radar`
- **Default Size**: Large (4×4)
- **Data Source**: Windy.com embed, RainViewer API, or OpenWeatherMap
- **API**: https://api.rainviewer.com/public/weather-maps.json
- **Features**: Real-time precipitation, storm tracking
- **Location**: Uses user's selected location or auto-detect
- **Refresh**: Every 5 minutes
- **URL**: `https://embed.windy.com/embed2.html?lat={lat}&lon={lon}&detailLat={lat}&detailLon={lon}&width={w}&height={h}&zoom={zoom}&level=surface&overlay=radar`

### 1.2 Lightning Strikes (Real-time)
- **ID**: `lightning-map`
- **Default Size**: Large (4×4)
- **Data Source**: Blitzortung.org, LightningMaps.org
- **API**: WebSocket feed from lightningmaps.org
- **Features**: Live lightning strike visualization
- **Refresh**: Real-time WebSocket
- **Embed**: `https://www.lightningmaps.org/realtime`

### 1.3 Earthquake Activity
- **ID**: `earthquake-tracker`
- **Default Size**: Standard (2×2)
- **Data Source**: USGS Earthquake API
- **API**: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`
- **Features**: Recent earthquakes (24h), magnitude, location
- **Refresh**: Every 15 minutes
- **Display**: List view or map view toggle

### 1.4 Wildfire Tracker
- **ID**: `wildfire-tracker`
- **Default Size**: Large (4×4)
- **Data Source**: NASA FIRMS (Fire Information for Resource Management System)
- **API**: `https://firms.modaps.eosdis.nasa.gov/api/area/csv/{API_KEY}/VIIRS_SNPP_NRT/{lat},{lon}/{distance}/1`
- **Features**: Active fires, hotspots
- **Refresh**: Every 30 minutes
- **Note**: Requires NASA FIRMS API key (free)

### 1.5 Air Quality Index
- **ID**: `air-quality`
- **Default Size**: Compact (1×1) or Standard (2×2)
- **Data Source**: OpenAQ, IQAir, EPA AirNow
- **API**: `https://api.openaq.org/v2/latest?coordinates={lat},{lon}&radius=25000`
- **Features**: AQI number, pollutant breakdown, health advisory
- **Refresh**: Every 30 minutes
- **Location-dependent**: Yes

### 1.6 Solar Weather
- **ID**: `solar-weather`
- **Default Size**: Standard (2×2)
- **Data Source**: NOAA Space Weather Prediction Center
- **API**: `https://services.swpc.noaa.gov/json/planetary_k_index_1m.json`
- **Features**: Solar flares, CME alerts, geomagnetic storms, aurora forecast
- **Refresh**: Every 30 minutes
- **Additional**: `https://sdo.gsfc.nasa.gov/data/` for solar imagery

### 1.7 Satellite Imagery (Live)
- **ID**: `satellite-imagery`
- **Default Size**: Large (4×4)
- **Data Source**: NOAA GOES, Himawari-8
- **API**: https://www.star.nesdis.noaa.gov/GOES/
- **Features**: Recent satellite images (visible/IR)
- **Refresh**: Every 10-15 minutes
- **Embed**: `https://www.star.nesdis.noaa.gov/GOES/sector.php?sat=G16&sector=conus`

---

## 2. Infrastructure & Internet Status

### 2.1 Down Detector
- **ID**: `downdetector`
- **Default Size**: Standard (2×2) or Wide (4×2)
- **Data Source**: DownDetector website scraping or embed
- **Embed**: `https://downdetector.com/`
- **Features**: Top service outages, outage map
- **Refresh**: Every 2 minutes
- **Note**: May need iframe embed or custom scraper

### 2.2 Internet Health (Cloudflare Radar)
- **ID**: `cloudflare-radar`
- **Default Size**: Wide (4×2)
- **Data Source**: Cloudflare Radar
- **API**: `https://api.cloudflare.com/client/v4/radar/`
- **Embed**: `https://radar.cloudflare.com/traffic`
- **Features**: Global internet traffic, outages, BGP anomalies
- **Refresh**: Every 5 minutes

### 2.3 Submarine Cable Map
- **ID**: `submarine-cables`
- **Default Size**: Large (4×4)
- **Data Source**: SubmarineCableMap.com, TeleGeography
- **Embed**: `https://www.submarinecablemap.com/`
- **Features**: Cable routes, landing points, outage alerts
- **Refresh**: Static map with occasional status updates

### 2.4 DNS Propagation Checker
- **ID**: `dns-checker`
- **Default Size**: Standard (2×2)
- **Data Source**: DNS query from multiple servers
- **API**: Custom implementation using Google DNS, Cloudflare DNS, etc.
- **Features**: Check DNS records from different locations
- **Interactive**: User enters domain to check

### 2.5 Certificate Transparency Logs
- **ID**: `cert-transparency`
- **Default Size**: Standard (2×2)
- **Data Source**: crt.sh, Google Certificate Transparency
- **API**: `https://crt.sh/?q={domain}&output=json`
- **Features**: Recently issued SSL certificates, domain monitoring
- **Refresh**: Every 1 hour
- **Use Case**: Monitor for suspicious certificates

### 2.6 BGP Route Monitor
- **ID**: `bgp-monitor`
- **Default Size**: Wide (4×2)
- **Data Source**: BGPStream, RIPE RIS
- **API**: `https://bgpstream.com/`
- **Features**: BGP hijacks, route leaks, AS path changes
- **Refresh**: Every 10 minutes

---

## 3. Flight & Maritime Tracking

### 3.1 Flight Tracker
- **ID**: `flight-tracker`
- **Default Size**: Large (4×4)
- **Data Source**: ADS-B Exchange, OpenSky Network
- **API**: `https://opensky-network.org/api/states/all`
- **Embed Alternative**: `https://globe.adsbexchange.com/`
- **Features**: Real-time flight positions, callsigns, altitude
- **Refresh**: Every 10 seconds (real-time)
- **Location-dependent**: Can focus on local area

### 3.2 ISS Tracker
- **ID**: `iss-tracker`
- **Default Size**: Standard (2×2)
- **Data Source**: Where The ISS At? API
- **API**: `https://api.wheretheiss.at/v1/satellites/25544`
- **Features**: Current position, next pass times
- **Refresh**: Every 5 seconds
- **Display**: Map view or compact info card

### 3.3 Starlink Satellite Passes
- **ID**: `starlink-tracker`
- **Default Size**: Standard (2×2)
- **Data Source**: Celestrak TLE data + calculation
- **API**: `https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=json`
- **Features**: Upcoming visible passes for user location
- **Refresh**: Every 1 hour
- **Location-dependent**: Yes

### 3.4 Ship Traffic (AIS)
- **ID**: `ship-tracker`
- **Default Size**: Large (4×4)
- **Data Source**: MarineTraffic, VesselFinder
- **Embed**: `https://www.marinetraffic.com/en/ais/embed/zoom:10/centery:{lat}/centerx:{lon}`
- **Features**: Real-time ship positions, vessel info
- **Refresh**: Every 1 minute
- **Location-dependent**: Can focus on local ports

### 3.5 Pentagon Pizza Tracker 
- **ID**: `pentagon-pizza`
- **Default Size**: Compact (1×1)
- **Data Source**: Domino's Pizza Tracker API (joke/parody)
- **Implementation**: Track Domino's orders near Pentagon/DC as "threat level"
- **Features**: "DEFCON PIZZA" - number of active deliveries to Arlington, VA
- **Refresh**: Every 5 minutes
- **Note**: Parody widget, may use actual Domino's locations or be simulated

---

## 4. Internet Culture & Service Status

### 4.1 Reddit Outage Tracker
- **ID**: `reddit-status`
- **Default Size**: Compact (1×1)
- **Data Source**: Reddit Status Page
- **API**: `https://www.redditstatus.com/`
- **Features**: Operational status, incident history
- **Refresh**: Every 2 minutes

### 4.2 GitHub Status
- **ID**: `github-status`
- **Default Size**: Compact (1×1)
- **Data Source**: GitHub Status API
- **API**: `https://www.githubstatus.com/api/v2/status.json`
- **Features**: Service status, incident feed
- **Refresh**: Every 2 minutes

### 4.3 CDN Status Dashboard
- **ID**: `cdn-status`
- **Default Size**: Standard (2×2)
- **Data Source**: Cloudflare, Fastly, Akamai status pages
- **APIs**:
  - Cloudflare: `https://www.cloudflarestatus.com/api/v2/status.json`
  - Fastly: `https://status.fastly.com/api/v2/status.json`
- **Features**: Multi-CDN health at a glance
- **Refresh**: Every 2 minutes

### 4.4 Cryptocurrency Panic Index
- **ID**: `crypto-panic`
- **Default Size**: Compact (1×1) or Standard (2×2)
- **Data Source**: Alternative.me Crypto Fear & Greed Index
- **API**: `https://api.alternative.me/fng/`
- **Features**: Fear/Greed score (0-100), sentiment indicator
- **Refresh**: Every 1 hour

### 4.5 Hacker News "Temperature"
- **ID**: `hn-temperature`
- **Default Size**: Compact (1×1)
- **Data Source**: Hacker News API + sentiment analysis
- **API**: `https://hacker-news.firebaseio.com/v0/topstories.json`
- **Features**: Trending topic analysis, "outrage level" based on comment velocity
- **Refresh**: Every 15 minutes
- **Implementation**: Analyze top stories + comment counts

### 4.6 Wikipedia Recent Changes
- **ID**: `wikipedia-changes`
- **Default Size**: Wide (4×2)
- **Data Source**: Wikipedia Recent Changes Stream
- **API**: `https://stream.wikimedia.org/v2/stream/recentchange`
- **Features**: Real-time edit feed, visualized as stream
- **Refresh**: Real-time WebSocket/EventSource

### 4.7 npm Registry Status
- **ID**: `npm-status`
- **Default Size**: Compact (1×1)
- **Data Source**: npm status page
- **API**: `https://status.npmjs.org/api/v2/status.json`
- **Features**: Registry availability, download speeds
- **Refresh**: Every 2 minutes

---

## 5. Geopolitical & Emergency

### 5.1 DEFCON Level (Unofficial)
- **ID**: `defcon-level`
- **Default Size**: Compact (1×1)
- **Data Source**: DEFCONLevel.com or community trackers
- **API**: Web scraping or static unless official feed exists
- **Features**: Current DEFCON level estimate (note: unofficial)
- **Refresh**: Every 1 hour
- **Disclaimer**: Not official, community-maintained

### 5.2 Space Debris Tracker
- **ID**: `space-debris`
- **Default Size**: Large (4×4)
- **Data Source**: Space-Track.org, LeoLabs
- **API**: `https://www.space-track.org/basicspacedata/query/class/gp/decay_date/null-val/epoch/%3Enow-30/orderby/norad_cat_id/format/json`
- **Features**: Tracked objects, conjunction warnings
- **Refresh**: Every 1 hour
- **Note**: Requires Space-Track.org account (free)

### 5.3 Nuclear Power Plant Status
- **ID**: `nuclear-status`
- **Default Size**: Standard (2×2)
- **Data Source**: NRC (US), IAEA (global)
- **API**: Custom implementation, no public real-time API
- **Features**: Operational status of nuclear facilities
- **Refresh**: Every 1 hour
- **Note**: May require web scraping

### 5.4 Global Conflict Monitor
- **ID**: `conflict-monitor`
- **Default Size**: Large (4×4)
- **Data Source**: ACLED (Armed Conflict Location & Event Data)
- **API**: `https://api.acleddata.com/`
- **Features**: Recent conflict events, fatalities map
- **Refresh**: Every 6 hours
- **Note**: Requires ACLED API key (free for non-commercial)

---

## 6. Local/Personal (Location-Dependent)

### 6.1 Local Weather
- **ID**: `local-weather`
- **Default Size**: Standard (2×2)
- **Data Source**: OpenWeatherMap, Weather.gov
- **API**: `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={key}`
- **Features**: Current conditions, forecast, alerts
- **Refresh**: Every 10 minutes
- **Location-dependent**: Yes

### 6.2 Airport Delays
- **ID**: `airport-delays`
- **Default Size**: Standard (2×2)
- **Data Source**: FAA (US), FlightAware
- **API**: `https://aviationweather.gov/`
- **Features**: Delays at nearest major airport
- **Refresh**: Every 5 minutes
- **Location-dependent**: Auto-selects nearest airport

### 6.3 Local Power Outages
- **ID**: `power-outages`
- **Default Size**: Standard (2×2)
- **Data Source**: Utility company APIs, PowerOutage.us
- **API**: `https://poweroutage.us/` (scraping)
- **Features**: Outage map, affected customers
- **Refresh**: Every 5 minutes
- **Location-dependent**: Yes

### 6.4 Regional Internet Speeds
- **ID**: `internet-speeds`
- **Default Size**: Compact (1×1)
- **Data Source**: Speedtest.net, Ookla
- **API**: User-initiated speed test
- **Features**: Download/upload speeds, latency
- **Interactive**: Click to run test

### 6.5 Nearby Seismic Activity
- **ID**: `local-seismic`
- **Default Size**: Standard (2×2)
- **Data Source**: USGS filtered by location
- **API**: `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude={lat}&longitude={lon}&maxradiuskm=100`
- **Features**: Earthquakes within 100km
- **Refresh**: Every 15 minutes
- **Location-dependent**: Yes

### 6.6 Local Traffic Conditions
- **ID**: `local-traffic`
- **Default Size**: Large (4×4)
- **Data Source**: Google Maps, TomTom Traffic
- **Embed**: Google Maps Traffic Layer
- **Features**: Real-time traffic overlay
- **Refresh**: Every 2 minutes
- **Location-dependent**: Yes

---

## 7. Misc/Fun

### 7.1 Webcam Viewer
- **ID**: `webcam-viewer`
- **Default Size**: Standard (2×2) or Large (4×4)
- **Data Source**: Windy Webcams, EarthCam
- **API**: `https://api.windy.com/api/webcams/v2/list/nearby={lat},{lon},{radius}`
- **Features**: Live webcams near location or custom picks
- **Refresh**: Every 30 seconds (if streaming)
- **Location-dependent**: Optional

### 7.2 ISS Live Stream
- **ID**: `iss-livestream`
- **Default Size**: Large (4×4)
- **Data Source**: NASA ISS HD Earth Viewing Experiment
- **Embed**: YouTube live stream
- **URL**: `https://www.youtube.com/embed/P9C25Un7xaM`
- **Features**: Live view from ISS
- **Refresh**: Continuous stream

### 7.3 Meteor Shower Tracker
- **ID**: `meteor-shower`
- **Default Size**: Standard (2×2)
- **Data Source**: AMS (American Meteor Society)
- **API**: `https://www.amsmeteors.org/members/api/`
- **Features**: Upcoming meteor showers, peak times
- **Refresh**: Daily
- **Location-dependent**: Yes (visibility)

### 7.4 Aurora Forecast
- **ID**: `aurora-forecast`
- **Default Size**: Standard (2×2)
- **Data Source**: NOAA SWPC Aurora Forecast
- **API**: `https://services.swpc.noaa.gov/json/ovation_aurora_latest.json`
- **Features**: Aurora visibility forecast for location
- **Refresh**: Every 30 minutes
- **Location-dependent**: Yes

### 7.5 Ham Radio Propagation
- **ID**: `ham-propagation`
- **Default Size**: Standard (2×2)
- **Data Source**: HamQSL.com, DX propagation
- **Embed**: `https://www.hamqsl.com/solar.html`
- **Features**: Solar flux, A/K indices, band conditions
- **Refresh**: Every 30 minutes

---

## Widget Data Structure

Each widget instance stored in user preferences:

```javascript
{
  "id": "weather-radar-1", // Unique instance ID
  "type": "weather-radar", // Widget type from catalog
  "position": {
    "x": 0,
    "y": 0,
    "w": 4,
    "h": 4
  },
  "settings": {
    "location": {"lat": 40.7128, "lon": -74.0060},
    "refreshRate": 300,
    "zoom": 6,
    // Widget-specific settings
  },
  "enabled": true
}
```

---

## Default Layouts

### "Default" Layout
- Local Weather (2×2)
- ISS Tracker (2×2)
- Earthquake Tracker (2×2)
- Down Detector (4×2)

### "Weather Focus" Layout
- Weather Radar (4×4)
- Lightning Map (4×4)
- Local Weather (2×2)
- Air Quality (1×1)
- Satellite Imagery (4×4)

### "Internet Health" Layout
- Cloudflare Radar (4×2)
- GitHub Status (1×1)
- Reddit Status (1×1)
- CDN Status (2×2)
- Down Detector (4×2)
- BGP Monitor (4×2)

### "Schizo Mode" (Maximum Monitoring)
- All widgets enabled in dense grid
- Multiple instances allowed
- Different locations for comparison

---

## API Keys Required

Free tier API keys needed:
- OpenWeatherMap (weather)
- NASA FIRMS (wildfires)
- Space-Track.org (space debris)
- ACLED (conflict data)
- Windy Webcams (optional)
- AMS Meteors (optional)

Most other data sources are free/open or use embeds.

---

## Implementation Priority

**Phase 1 (MVP):**
1. Grid system + drag/drop
2. Local Weather
3. ISS Tracker
4. Down Detector
5. Earthquake Tracker
6. Settings panel + location selector

**Phase 2:**
7. Flight Tracker
8. Weather Radar
9. GitHub/Reddit Status
10. Air Quality
11. Lightning Map

**Phase 3:**
12. Ship Tracker
13. Solar Weather
14. Space Debris
15. Crypto Panic
16. HN Temperature

**Phase 4+:**
- All remaining widgets
- Advanced features (widget marketplace, sharing layouts)
