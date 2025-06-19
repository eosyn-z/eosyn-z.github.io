---
layout: page
title: Search
permalink: /search/
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search - eosyn</title>
    <style>
        :root {
            /* Primary Color Palette */
            --primary-purple: #667eea;
            --primary-pink: #f093fb;
            --accent-blue: #4facfe;
            --accent-green: #43e97b;
            --accent-orange: #fa709a;
            
            /* Background Gradients */
            --gradient-primary: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
            --gradient-secondary: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-green) 100%);
            --gradient-warm: linear-gradient(135deg, var(--accent-orange) 0%, var(--primary-pink) 100%);
            
            /* Text Colors */
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --text-light: #718096;
            --text-white: #ffffff;
            
            /* Background Colors */
            --bg-primary: #ffffff;
            --bg-secondary: #f7fafc;
            --bg-accent: #edf2f7;
            
            /* Border Colors */
            --border-primary: #e2e8f0;
            --border-accent: #cbd5e0;
            --border-pink: #ffb6c1;
            
            /* Shadow Colors */
            --shadow-light: rgba(0, 0, 0, 0.1);
            --shadow-medium: rgba(0, 0, 0, 0.2);
            --shadow-heavy: rgba(0, 0, 0, 0.3);
        }

        /* Theme: Sunset */
        [data-theme="sunset"] {
            --primary-purple: #ff6b6b;
            --primary-pink: #ffa726;
            --accent-blue: #ff7043;
            --accent-green: #ffb74d;
            --accent-orange: #ff8a65;
            --gradient-primary: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
            --gradient-secondary: linear-gradient(135deg, #ff7043 0%, #ffb74d 100%);
        }

        /* Theme: Ocean */
        [data-theme="ocean"] {
            --primary-purple: #4fc3f7;
            --primary-pink: #29b6f6;
            --accent-blue: #26c6da;
            --accent-green: #4dd0e1;
            --accent-orange: #00bcd4;
            --gradient-primary: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%);
            --gradient-secondary: linear-gradient(135deg, #26c6da 0%, #4dd0e1 100%);
        }

        /* Theme: Forest */
        [data-theme="forest"] {
            --primary-purple: #66bb6a;
            --primary-pink: #81c784;
            --accent-blue: #4caf50;
            --accent-green: #66bb6a;
            --accent-orange: #8bc34a;
            --gradient-primary: linear-gradient(135deg, #66bb6a 0%, #81c784 100%);
            --gradient-secondary: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
        }

        /* Theme: Dark */
        [data-theme="dark"] {
            --primary-purple: #9c27b0;
            --primary-pink: #e91e63;
            --accent-blue: #3f51b5;
            --accent-green: #4caf50;
            --accent-orange: #ff9800;
            --text-primary: #ffffff;
            --text-secondary: #e0e0e0;
            --text-light: #bdbdbd;
            --bg-primary: #1a1a1a;
            --bg-secondary: #2d2d2d;
            --bg-accent: #404040;
            --border-primary: #404040;
            --border-accent: #555555;
            --gradient-primary: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
            --gradient-secondary: linear-gradient(135deg, #3f51b5 0%, #4caf50 100%);
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: var(--gradient-primary);
            min-height: 100vh;
            color: var(--text-primary);
            transition: all 0.3s ease;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: var(--bg-primary);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px var(--shadow-medium);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            color: var(--primary-purple);
            margin-bottom: 10px;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
        }

        .back-link {
            position: absolute;
            top: 20px;
            left: 20px;
            color: var(--text-white);
            text-decoration: none;
            font-size: 18px;
            background: var(--shadow-heavy);
            padding: 12px 20px;
            border-radius: 25px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .back-link:hover {
            background: var(--gradient-primary);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px var(--shadow-medium);
        }

        .search-section {
            margin-bottom: 30px;
        }

        .search-bar {
            width: 100%;
            padding: 15px 20px;
            font-size: 16px;
            border: 2px solid var(--border-primary);
            border-radius: 25px;
            outline: none;
            transition: all 0.3s ease;
            margin-bottom: 20px;
            background: var(--bg-secondary);
            color: var(--text-primary);
        }

        .search-bar:focus {
            border-color: var(--primary-purple);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filters {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 20px;
        }

        .filter-group {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .filter-group label {
            font-weight: 500;
            color: var(--text-secondary);
        }

        .filter-group input[type="checkbox"] {
            width: 18px;
            height: 18px;
            accent-color: var(--primary-purple);
        }

        .results-info {
            margin-bottom: 20px;
            color: var(--text-light);
            font-size: 14px;
        }

        .website-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }

        .website-card {
            border: 1px solid var(--border-primary);
            border-radius: 15px;
            padding: 20px;
            transition: all 0.3s ease;
            background: var(--bg-secondary);
        }

        .website-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px var(--shadow-medium);
            border-color: var(--primary-purple);
        }

        .website-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
            text-decoration: none;
        }

        .website-title:hover {
            color: var(--primary-purple);
        }

        .website-description {
            color: var(--text-secondary);
            margin-bottom: 12px;
            line-height: 1.5;
        }

        .website-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .tag {
            background: var(--primary-purple);
            color: var(--text-white);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }

        .tag.personal { background: var(--accent-blue); }
        .tag.company { background: var(--accent-green); }
        .tag.tools { background: var(--accent-orange); }

        /* Theme Switcher */
        .theme-switcher {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-primary);
            border-radius: 15px;
            padding: 15px;
            box-shadow: 0 10px 30px var(--shadow-medium);
            border: 2px solid var(--border-primary);
            z-index: 1000;
            transition: all 0.3s ease;
        }

        .theme-switcher h3 {
            margin: 0 0 10px 0;
            color: var(--text-primary);
            font-size: 14px;
            text-align: center;
        }

        .theme-buttons {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .theme-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 2px solid var(--border-primary);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }

        .theme-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px var(--shadow-medium);
        }

        .theme-btn.active {
            border-color: var(--primary-purple);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }

        .theme-btn[data-theme="default"] { background: linear-gradient(135deg, #667eea 0%, #f093fb 100%); }
        .theme-btn[data-theme="sunset"] { background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); }
        .theme-btn[data-theme="ocean"] { background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%); }
        .theme-btn[data-theme="forest"] { background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%); }
        .theme-btn[data-theme="dark"] { background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%); }

        /* Cookie Consent */
        .cookie-consent {
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: var(--bg-primary);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px var(--shadow-medium);
            border: 2px solid var(--border-primary);
            z-index: 1001;
            max-width: 500px;
            margin: 0 auto;
            display: none;
        }

        .cookie-consent.show {
            display: block;
        }

        .cookie-consent h3 {
            margin: 0 0 10px 0;
            color: var(--text-primary);
            font-size: 16px;
        }

        .cookie-consent p {
            margin: 0 0 15px 0;
            color: var(--text-secondary);
            font-size: 14px;
            line-height: 1.5;
        }

        .cookie-buttons {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }

        .cookie-btn {
            padding: 8px 16px;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .cookie-btn.accept {
            background: var(--gradient-primary);
            color: var(--text-white);
        }

        .cookie-btn.reject {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 2px solid var(--border-primary);
        }

        .cookie-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px var(--shadow-medium);
        }

        @media (max-width: 768px) {
            .container {
                padding: 20px;
                margin: 10px;
            }
            
            .website-grid {
                grid-template-columns: 1fr;
            }
            
            .theme-switcher {
                top: 10px;
                right: 10px;
                padding: 10px;
            }
            
            .theme-buttons {
                gap: 5px;
            }
            
            .theme-btn {
                width: 25px;
                height: 25px;
            }
            
            .cookie-consent {
                left: 10px;
                right: 10px;
                bottom: 10px;
            }
            
            .cookie-buttons {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <a href="/" class="back-link">← Back to Home</a>
    
    <div class="container">
        <div class="header">
            <h1>🔍 Discover</h1>
            <p>Find interesting websites and tools</p>
        </div>

        <div class="search-section">
            <input type="text" class="search-bar" id="searchBar" placeholder="Search websites...">
            
            <div class="filters">
                <div class="filter-group">
                    <input type="checkbox" id="personal" checked>
                    <label for="personal">Personal</label>
                </div>
                <div class="filter-group">
                    <input type="checkbox" id="company" checked>
                    <label for="company">Company</label>
                </div>
                <div class="filter-group">
                    <input type="checkbox" id="tools" checked>
                    <label for="tools">Tools</label>
                </div>
            </div>
            
            <div class="results-info" id="resultsInfo">
                Showing all websites
            </div>
        </div>

        <div class="website-grid" id="websiteGrid">
            <!-- Websites will be populated here -->
        </div>
    </div>

    <!-- Theme Switcher -->
    <div class="theme-switcher">
        <h3>Theme</h3>
        <div class="theme-buttons">
            <div class="theme-btn active" data-theme="default" title="Default"></div>
            <div class="theme-btn" data-theme="sunset" title="Sunset"></div>
            <div class="theme-btn" data-theme="ocean" title="Ocean"></div>
            <div class="theme-btn" data-theme="forest" title="Forest"></div>
            <div class="theme-btn" data-theme="dark" title="Dark"></div>
        </div>
    </div>

    <!-- Cookie Consent -->
    <div class="cookie-consent" id="cookieConsent">
        <h3>🍪 Cookie Notice</h3>
        <p>This website uses cookies to save your theme preference and improve your experience. We only store your theme choice and don't track any personal information.</p>
        <div class="cookie-buttons">
            <button class="cookie-btn reject" onclick="rejectCookies()">Reject</button>
            <button class="cookie-btn accept" onclick="acceptCookies()">Accept</button>
        </div>
    </div>

    <script>
    // Website database
    const websites = [
        {
            title: "GitHub",
            description: "The world's leading software development platform",
            url: "https://github.com",
            tags: ["tools", "company"]
        },
        {
            title: "Stack Overflow",
            description: "Where developers learn, share, & build careers",
            url: "https://stackoverflow.com",
            tags: ["tools", "company"]
        },
        {
            title: "Dev.to",
            description: "A constructive and inclusive social network for software developers",
            url: "https://dev.to",
            tags: ["personal", "tools"]
        },
        {
            title: "CSS-Tricks",
            description: "Tips, tricks, and techniques for CSS",
            url: "https://css-tricks.com",
            tags: ["personal", "tools"]
        },
        {
            title: "Smashing Magazine",
            description: "For professional web designers and developers",
            url: "https://www.smashingmagazine.com",
            tags: ["company", "tools"]
        },
        {
            title: "A List Apart",
            description: "For people who make websites",
            url: "https://alistapart.com",
            tags: ["company", "tools"]
        },
        {
            title: "Codrops",
            description: "Creative front-end resources and inspiration",
            url: "https://tympanus.net/codrops",
            tags: ["personal", "tools"]
        },
        {
            title: "Dribbble",
            description: "Discover and connect with designers worldwide",
            url: "https://dribbble.com",
            tags: ["company", "tools"]
        },
        {
            title: "Behance",
            description: "Showcase and discover creative work",
            url: "https://www.behance.net",
            tags: ["company", "tools"]
        },
        {
            title: "Figma",
            description: "The collaborative interface design tool",
            url: "https://www.figma.com",
            tags: ["company", "tools"]
        },
        {
            title: "Notion",
            description: "All-in-one workspace for notes, docs, and collaboration",
            url: "https://www.notion.so",
            tags: ["company", "tools"]
        },
        {
            title: "Linear",
            description: "Issue tracking tool for high-performance teams",
            url: "https://linear.app",
            tags: ["company", "tools"]
        }
    ];

    // Cookie management functions
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    }

    // Theme management
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update active button
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
        
        // Save theme preference if cookies are accepted
        if (getCookie('cookiesAccepted') === 'true') {
            setCookie('theme', theme, 365);
        }
    }

    function loadTheme() {
        const savedTheme = getCookie('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }

    // Cookie consent management
    function showCookieConsent() {
        if (!getCookie('cookiesAccepted') && !getCookie('cookiesRejected')) {
            document.getElementById('cookieConsent').classList.add('show');
        }
    }

    function acceptCookies() {
        setCookie('cookiesAccepted', 'true', 365);
        document.getElementById('cookieConsent').classList.remove('show');
        
        // Save current theme preference
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
        setCookie('theme', currentTheme, 365);
    }

    function rejectCookies() {
        setCookie('cookiesRejected', 'true', 365);
        document.getElementById('cookieConsent').classList.remove('show');
        
        // Clear any existing theme cookie
        deleteCookie('theme');
    }

    // Search and filter functionality
    function filterWebsites() {
        const searchTerm = document.getElementById('searchBar').value.toLowerCase();
        const personalFilter = document.getElementById('personal').checked;
        const companyFilter = document.getElementById('company').checked;
        const toolsFilter = document.getElementById('tools').checked;
        
        const filteredWebsites = websites.filter(website => {
            const matchesSearch = website.title.toLowerCase().includes(searchTerm) || 
                                 website.description.toLowerCase().includes(searchTerm);
            
            const matchesPersonal = personalFilter && website.tags.includes('personal');
            const matchesCompany = companyFilter && website.tags.includes('company');
            const matchesTools = toolsFilter && website.tags.includes('tools');
            
            return matchesSearch && (matchesPersonal || matchesCompany || matchesTools);
        });
        
        displayWebsites(filteredWebsites);
        updateResultsInfo(filteredWebsites.length);
    }

    function displayWebsites(websitesToShow) {
        const grid = document.getElementById('websiteGrid');
        grid.innerHTML = '';
        
        websitesToShow.forEach(website => {
            const card = document.createElement('div');
            card.className = 'website-card';
            
            card.innerHTML = `
                <a href="${website.url}" target="_blank" class="website-title">${website.title}</a>
                <p class="website-description">${website.description}</p>
                <div class="website-tags">
                    ${website.tags.map(tag => `<span class="tag ${tag}">${tag}</span>`).join('')}
                </div>
            `;
            
            grid.appendChild(card);
        });
    }

    function updateResultsInfo(count) {
        const info = document.getElementById('resultsInfo');
        info.textContent = `Showing ${count} website${count !== 1 ? 's' : ''}`;
    }

    // Event listeners
    document.addEventListener('DOMContentLoaded', function() {
        // Show cookie consent if needed
        showCookieConsent();
        
        // Load saved theme
        loadTheme();
        
        // Theme button click handlers
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                setTheme(theme);
            });
        });
        
        // Search and filter event listeners
        document.getElementById('searchBar').addEventListener('input', filterWebsites);
        document.getElementById('personal').addEventListener('change', filterWebsites);
        document.getElementById('company').addEventListener('change', filterWebsites);
        document.getElementById('tools').addEventListener('change', filterWebsites);
        
        // Initial display
        filterWebsites();
    });
    </script>
</body>
</html> 