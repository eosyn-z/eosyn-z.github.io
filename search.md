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

        /* Theme: C - Cosmic */
        [data-theme="c"] {
            --primary-purple: #667eea;
            --primary-pink: #f093fb;
            --accent-blue: #4facfe;
            --accent-green: #43e97b;
            --accent-orange: #fa709a;
            --gradient-primary: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
            --gradient-secondary: linear-gradient(135deg, #4facfe 0%, #43e97b 100%);
            --border-pink: #f093fb;
        }

        /* Theme: A - Aurora */
        [data-theme="a"] {
            --primary-purple: #ff6b6b;
            --primary-pink: #ffa726;
            --accent-blue: #ff7043;
            --accent-green: #ffb74d;
            --accent-orange: #ff8a65;
            --gradient-primary: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
            --gradient-secondary: linear-gradient(135deg, #ff7043 0%, #ffb74d 100%);
            --border-pink: #ffa726;
        }

        /* Theme: R - Rainbow */
        [data-theme="r"] {
            --primary-purple: #4fc3f7;
            --primary-pink: #29b6f6;
            --accent-blue: #26c6da;
            --accent-green: #4dd0e1;
            --accent-orange: #00bcd4;
            --gradient-primary: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%);
            --gradient-secondary: linear-gradient(135deg, #26c6da 0%, #4dd0e1 100%);
            --border-pink: #29b6f6;
        }

        /* Theme: Z - Zenith */
        [data-theme="z"] {
            --primary-purple: #66bb6a;
            --primary-pink: #81c784;
            --accent-blue: #4caf50;
            --accent-green: #66bb6a;
            --accent-orange: #8bc34a;
            --gradient-primary: linear-gradient(135deg, #66bb6a 0%, #81c784 100%);
            --gradient-secondary: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
            --border-pink: #81c784;
        }

        /* Theme: E - Eclipse */
        [data-theme="e"] {
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
            --border-pink: #e91e63;
        }

        /* Theme: N - Nebula */
        [data-theme="n"] {
            --primary-purple: #ff5722;
            --primary-pink: #ff9800;
            --accent-blue: #ff5722;
            --accent-green: #ff9800;
            --accent-orange: #ff5722;
            --gradient-primary: linear-gradient(135deg, #ff5722 0%, #ff9800 100%);
            --gradient-secondary: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
            --border-pink: #ff9800;
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
            background: var(--bg-secondary);
            border-radius: 20px;
            padding: 30px;
            border: 2px solid var(--border-primary);
            box-shadow: 0 10px 30px var(--shadow-medium);
            backdrop-filter: blur(10px);
        }

        .header h1 {
            color: var(--primary-purple);
            margin-bottom: 10px;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
            font-size: 2.5em;
        }

        .header p {
            color: var(--text-secondary);
            font-size: 1.1em;
            margin: 0;
        }

        .back-link {
            position: fixed;
            top: 20px;
            left: 20px;
            color: var(--text-white);
            text-decoration: none;
            font-size: 16px;
            background: var(--shadow-heavy);
            padding: 12px 20px;
            border-radius: 25px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 1000;
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

        .difficulty-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
        }

        .difficulty-btn {
            padding: 8px 16px;
            border-radius: 20px;
            border: 2px solid var(--border-primary);
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .difficulty-btn.active {
            border-color: var(--primary-purple);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
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

        .difficulty-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            color: var(--text-white);
        }

        .difficulty-badge.beginner {
            background: #10b981;
        }

        .difficulty-badge.intermediate {
            background: #f59e0b;
        }

        .difficulty-badge.expert {
            background: #ef4444;
        }

        /* Personal Recommendation Styles */
        .personal-recommendation {
            background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
            color: #2d3748;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        .star-rating {
            display: flex;
            align-items: center;
            gap: 2px;
            margin: 8px 0;
        }

        .star {
            color: #ffd700;
            font-size: 16px;
        }

        .star.empty {
            color: #e2e8f0;
        }

        .personal-review {
            background: var(--bg-accent);
            border-left: 3px solid var(--primary-purple);
            padding: 8px 12px;
            margin: 8px 0;
            border-radius: 0 8px 8px 0;
            font-size: 14px;
            line-height: 1.4;
            color: var(--text-secondary);
        }

        .personal-review::before {
            content: '"';
            font-size: 18px;
            color: var(--primary-purple);
            font-weight: bold;
        }

        .personal-review::after {
            content: '"';
            font-size: 18px;
            color: var(--primary-purple);
            font-weight: bold;
        }

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
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .gear-button {
            width: 50px;
            height: 50px;
            background: var(--bg-primary);
            border-radius: 50%;
            border: 2px solid var(--border-primary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: var(--text-primary);
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px var(--shadow-medium);
            margin-bottom: 10px;
        }

        .gear-button:hover {
            transform: rotate(90deg);
            background: var(--gradient-primary);
            color: var(--text-white);
            border-color: var(--primary-purple);
        }

        .theme-content {
            display: none;
            text-align: center;
        }

        .theme-switcher.show .theme-content {
            display: block;
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
            max-width: 200px;
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

        .theme-btn[data-theme="c"] { background: linear-gradient(135deg, #667eea 0%, #f093fb 100%); }
        .theme-btn[data-theme="a"] { background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); }
        .theme-btn[data-theme="r"] { background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%); }
        .theme-btn[data-theme="z"] { background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%); }
        .theme-btn[data-theme="e"] { background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%); }
        .theme-btn[data-theme="n"] { background: linear-gradient(135deg, #ff5722 0%, #ff9800 100%); }

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
            
            .header {
                padding: 20px;
                margin-bottom: 20px;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            .website-grid {
                grid-template-columns: 1fr;
            }
            
            .theme-switcher {
                top: 10px;
                right: 10px;
                padding: 10px;
            }
            
            .gear-button {
                width: 45px;
                height: 45px;
                font-size: 20px;
            }
            
            .theme-buttons {
                gap: 5px;
                max-width: 180px;
            }
            
            .theme-btn {
                width: 25px;
                height: 25px;
            }
            
            .back-link {
                top: 10px;
                left: 10px;
                font-size: 14px;
                padding: 10px 15px;
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
                <div class="filter-group">
                    <input type="checkbox" id="documentation" checked>
                    <label for="documentation">Documentation</label>
                </div>
                <div class="filter-group">
                    <input type="checkbox" id="repository" checked>
                    <label for="repository">Repository</label>
                </div>
                <div class="filter-group">
                    <input type="checkbox" id="personalRecommendation">
                    <label for="personalRecommendation">⭐ Has eosyn used this?</label>
                </div>
            </div>
            
            <div class="difficulty-filters">
                <button class="difficulty-btn active" data-difficulty="">All Levels</button>
                <button class="difficulty-btn" data-difficulty="beginner">Beginner</button>
                <button class="difficulty-btn" data-difficulty="intermediate">Intermediate</button>
                <button class="difficulty-btn" data-difficulty="expert">Expert</button>
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
        <div class="gear-button" id="gearButton" title="Theme Settings">⚙️</div>
        <div class="theme-content">
        <h3>Theme</h3>
        <div class="theme-buttons">
                <div class="theme-btn active" data-theme="c" title="C - Cosmic"></div>
                <div class="theme-btn" data-theme="a" title="A - Aurora"></div>
                <div class="theme-btn" data-theme="r" title="R - Rainbow"></div>
                <div class="theme-btn" data-theme="z" title="Z - Zenith"></div>
                <div class="theme-btn" data-theme="e" title="E - Eclipse"></div>
                <div class="theme-btn" data-theme="n" title="N - Nebula"></div>
            </div>
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
            tags: ["tools", "company", "documentation"],
            difficulty: "beginner",
            functions: ["code-storage", "version-control", "collaboration", "project-management", "open-source", "deployment", "ci-cd", "code-review"],
            personalRecommendation: false,
            starRating: null,
            personalReview: null
        },
        {
            title: "Stack Overflow",
            description: "Where developers learn, share, & build careers",
            url: "https://stackoverflow.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "beginner",
            functions: ["q&a", "problem-solving", "learning", "community", "debugging", "troubleshooting", "code-examples"],
            personalRecommendation: false,
            starRating: null,
            personalReview: null
        },
        {
            title: "Dev.to",
            description: "A constructive and inclusive social network for software developers",
            url: "https://dev.to",
            tags: ["personal", "tools", "documentation"],
            difficulty: "beginner",
            functions: ["blogging", "learning", "community", "networking", "articles", "tutorials", "career-advice"],
            personalRecommendation: false,
            starRating: null,
            personalReview: null
        },
        {
            title: "CSS-Tricks",
            description: "Tips, tricks, and techniques for CSS",
            url: "https://css-tricks.com",
            tags: ["personal", "tools", "documentation"],
            difficulty: "intermediate",
            functions: ["css-learning", "tutorials", "examples", "reference", "frontend", "styling", "layout", "responsive-design"],
            personalRecommendation: false,
            starRating: null,
            personalReview: null
        },
        {
            title: "Smashing Magazine",
            description: "For professional web designers and developers",
            url: "https://www.smashingmagazine.com",
            tags: ["company", "tools", "documentation"],
            difficulty: "intermediate",
            functions: ["web-design", "tutorials", "articles", "resources", "ux-ui", "accessibility", "performance", "best-practices"],
            personalRecommendation: false,
            starRating: null,
            personalReview: null
        },
        {
            title: "A List Apart",
            description: "For people who make websites",
            url: "https://alistapart.com",
            tags: ["company", "tools", "documentation"],
            difficulty: "intermediate",
            functions: ["web-standards", "best-practices", "articles", "learning", "accessibility", "semantic-html", "css", "javascript"]
        },
        {
            title: "Codrops",
            description: "Creative front-end resources and inspiration",
            url: "https://tympanus.net/codrops",
            tags: ["personal", "tools", "documentation"],
            difficulty: "expert",
            functions: ["inspiration", "experiments", "tutorials", "creative-coding", "animations", "interactions", "css-effects", "javascript-effects"]
        },
        {
            title: "Dribbble",
            description: "Discover and connect with designers worldwide",
            url: "https://dribbble.com",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["design-inspiration", "portfolio", "networking", "showcase", "ui-design", "graphic-design", "branding", "illustration"]
        },
        {
            title: "Behance",
            description: "Showcase and discover creative work",
            url: "https://www.behance.net",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["portfolio", "inspiration", "showcase", "networking", "creative-work", "design", "art", "photography"]
        },
        {
            title: "Figma",
            description: "The collaborative interface design tool",
            url: "https://www.figma.com",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["design", "prototyping", "collaboration", "ui-ux", "wireframing", "design-systems", "components", "plugins"]
        },
        {
            title: "Notion",
            description: "All-in-one workspace for notes, docs, and collaboration",
            url: "https://www.notion.so",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["note-taking", "project-management", "collaboration", "organization", "documentation", "databases", "templates", "knowledge-base"]
        },
        {
            title: "Linear",
            description: "Issue tracking tool for high-performance teams",
            url: "https://linear.app",
            tags: ["company", "tools"],
            difficulty: "intermediate",
            functions: ["project-management", "issue-tracking", "team-collaboration", "roadmaps", "sprints", "kanban", "agile"]
        },
        {
            title: "W3Schools",
            description: "Web development learning platform with tutorials and references",
            url: "https://www.w3schools.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "beginner",
            functions: ["learning", "tutorials", "reference", "examples", "html", "css", "javascript", "sql", "python", "php"]
        },
        {
            title: "freeCodeCamp",
            description: "Learn to code for free with interactive tutorials",
            url: "https://www.freecodecamp.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "beginner",
            functions: ["learning", "interactive-tutorials", "certification", "projects", "html-css", "javascript", "react", "nodejs", "databases"]
        },
        {
            title: "MDN Web Docs",
            description: "The Mozilla Developer Network - comprehensive web documentation",
            url: "https://developer.mozilla.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["documentation", "reference", "tutorials", "web-standards", "html", "css", "javascript", "apis", "web-apis"]
        },
        {
            title: "React Documentation",
            description: "Official React documentation and tutorials",
            url: "https://react.dev",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["documentation", "tutorials", "examples", "reference", "react", "hooks", "components", "state-management"]
        },
        {
            title: "Vue.js",
            description: "Progressive JavaScript framework for building user interfaces",
            url: "https://vuejs.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["framework", "documentation", "tutorials", "examples", "vue", "components", "composition-api", "ecosystem"]
        },
        {
            title: "Angular",
            description: "Platform for building mobile and desktop web applications",
            url: "https://angular.io",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["framework", "documentation", "tutorials", "cli-tools", "typescript", "dependency-injection", "routing", "forms"]
        },
        {
            title: "Firebase",
            description: "Google's mobile and web app development platform",
            url: "https://firebase.google.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "beginner",
            functions: ["backend-as-a-service", "authentication", "database", "hosting", "cloud-functions", "analytics", "messaging", "storage"]
        },
        {
            title: "Vercel",
            description: "Deploy frontend and fullstack apps with zero configuration",
            url: "https://vercel.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["deployment", "hosting", "serverless", "ci-cd", "edge-functions", "domains", "analytics", "preview-deployments"]
        },
        {
            title: "Netlify",
            description: "All-in-one platform for web projects",
            url: "https://netlify.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "beginner",
            functions: ["deployment", "hosting", "forms", "cms", "functions", "redirects", "headers", "build-tools"]
        },
        {
            title: "Expo",
            description: "React Native development platform",
            url: "https://expo.dev",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["mobile-development", "react-native", "deployment", "testing", "sdk", "cli", "ejected", "managed-workflow"]
        },
        {
            title: "Flutter",
            description: "Google's UI toolkit for building natively compiled applications",
            url: "https://flutter.dev",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["mobile-development", "cross-platform", "ui-framework", "hot-reload", "dart", "widgets", "state-management", "packages"]
        },
        {
            title: "Stripe",
            description: "Payment processing platform for internet businesses",
            url: "https://stripe.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["payments", "e-commerce", "api", "security", "subscriptions", "invoicing", "taxes", "fraud-prevention"]
        },
        {
            title: "Socket.io",
            description: "Real-time bidirectional event-based communication",
            url: "https://socket.io",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["real-time", "websockets", "communication", "api", "chat", "gaming", "collaboration", "live-updates"]
        },
        {
            title: "PostgreSQL",
            description: "Advanced open source relational database",
            url: "https://www.postgresql.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["database", "sql", "data-storage", "scalability", "acid-compliance", "json-support", "full-text-search", "extensions"]
        },
        {
            title: "MongoDB",
            description: "Document database with the scalability and flexibility",
            url: "https://www.mongodb.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["database", "nosql", "data-storage", "scalability", "aggregation", "indexing", "replication", "sharding"]
        },
        {
            title: "TypeScript",
            description: "Typed superset of JavaScript",
            url: "https://www.typescriptlang.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["programming-language", "type-safety", "documentation", "compiler", "javascript", "static-analysis", "ide-support", "refactoring"]
        },
        {
            title: "Tauri",
            description: "Framework for building tiny, blazingly fast binaries",
            url: "https://tauri.app",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["desktop-apps", "cross-platform", "performance", "security", "rust", "webview", "native-apis", "bundling"]
        },
        {
            title: "Electron",
            description: "Build cross-platform desktop apps with JavaScript",
            url: "https://www.electronjs.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["desktop-apps", "cross-platform", "web-technologies", "packaging", "distribution", "auto-updater", "native-modules", "chromium"]
        },
        {
            title: "Node.js",
            description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
            url: "https://nodejs.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["runtime", "server-side", "npm", "javascript", "event-driven", "non-blocking", "package-management", "ecosystem"]
        },
        {
            title: "Express.js",
            description: "Fast, unopinionated, minimalist web framework for Node.js",
            url: "https://expressjs.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["web-framework", "api", "middleware", "routing", "nodejs", "http-server", "static-files", "templating"]
        },
        {
            title: "Next.js",
            description: "The React framework for production",
            url: "https://nextjs.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["react-framework", "ssr", "ssg", "routing", "api-routes", "image-optimization", "performance", "deployment"]
        },
        {
            title: "Tailwind CSS",
            description: "A utility-first CSS framework for rapidly building custom user interfaces",
            url: "https://tailwindcss.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["css-framework", "utility-classes", "responsive-design", "customization", "components", "dark-mode", "purge-css", "jit-compiler"]
        },
        {
            title: "Docker",
            description: "Containerization platform for developing, shipping, and running applications",
            url: "https://www.docker.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["containerization", "deployment", "devops", "microservices", "orchestration", "images", "volumes", "networking"]
        },
        {
            title: "Git",
            description: "Distributed version control system",
            url: "https://git-scm.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["version-control", "collaboration", "branching", "history", "merging", "stashing", "rebase", "hooks"]
        },
        {
            title: "VS Code",
            description: "Code editor redefined and optimized for building and debugging modern web and cloud applications",
            url: "https://code.visualstudio.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "beginner",
            functions: ["code-editor", "debugging", "extensions", "integrated-terminal", "intellisense", "git-integration", "tasks", "snippets"],
            personalRecommendation: false,
            starRating: null,
            personalReview: null
        },
        {
            title: "Cursor",
            description: "AI-powered code editor built on VS Code",
            url: "https://cursor.sh",
            tags: ["tools", "company", "documentation"],
            difficulty: "beginner",
            functions: ["code-editor", "ai-assistance", "debugging", "learning", "chat", "code-generation", "refactoring", "explanation"],
            personalRecommendation: false,
            starRating: null,
            personalReview: null
        },
        {
            title: "Unity",
            description: "Real-time 3D development platform",
            url: "https://unity.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["game-development", "3d", "2d", "cross-platform", "physics", "animation", "audio", "asset-store"]
        },
        {
            title: "Unreal Engine",
            description: "Real-time 3D creation tool for photoreal visuals and immersive experiences",
            url: "https://www.unrealengine.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["game-development", "3d", "visualization", "vr-ar", "blueprints", "materials", "lighting", "cinematics"]
        },
        {
            title: "Phaser",
            description: "HTML5 game framework for building games with JavaScript",
            url: "https://phaser.io",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["game-development", "html5", "2d", "javascript", "physics", "sprites", "audio", "mobile-games"]
        },
        {
            title: "Heroku",
            description: "Cloud platform for deploying and managing applications",
            url: "https://www.heroku.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["deployment", "hosting", "paas", "scaling", "add-ons", "postgres", "redis", "monitoring"]
        },
        {
            title: "AWS",
            description: "Amazon Web Services - comprehensive cloud computing platform",
            url: "https://aws.amazon.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["cloud-computing", "hosting", "storage", "ai-ml", "serverless", "containers", "databases", "security"]
        },
        {
            title: "Google Cloud",
            description: "Google Cloud Platform - cloud computing services",
            url: "https://cloud.google.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["cloud-computing", "hosting", "storage", "ai-ml", "kubernetes", "bigquery", "firestore", "functions"]
        },
        {
            title: "DigitalOcean",
            description: "Cloud infrastructure provider for developers",
            url: "https://www.digitalocean.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["hosting", "vps", "cloud-computing", "deployment", "droplets", "spaces", "databases", "load-balancers"]
        },
        {
            title: "Wisk",
            description: "A modern Notion alternative built for speed and simplicity",
            url: "https://wisk.cc",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["note-taking", "project-management", "collaboration", "organization", "documentation", "databases", "templates", "knowledge-base"],
            personalRecommendation: false,
            starRating: null,
            personalReview: null
        },
        {
            title: "Tsotchke",
            description: "A collection of useful web development tools and resources",
            url: "https://tsotchke.net",
            tags: ["personal", "tools", "documentation"],
            difficulty: "beginner",
            functions: ["web-development", "tools", "resources", "utilities", "inspiration", "learning"],
            personalRecommendation: false,
            starRating: null,
            personalReview: null
        },
        {
            title: "Glitch",
            description: "The friendly community where everyone can discover and create the best apps on the web",
            url: "https://glitch.com",
            tags: ["company", "tools", "documentation"],
            difficulty: "beginner",
            functions: ["code-editor", "deployment", "collaboration", "learning", "web-development", "javascript", "nodejs", "community"]
        },
        {
            title: "Replit",
            description: "The collaborative browser based IDE",
            url: "https://replit.com",
            tags: ["company", "tools", "documentation"],
            difficulty: "beginner",
            functions: ["code-editor", "deployment", "collaboration", "learning", "web-development", "python", "javascript", "education"]
        },
        {
            title: "CodePen",
            description: "The best place to build, test, and discover front-end code",
            url: "https://codepen.io",
            tags: ["company", "tools", "documentation"],
            difficulty: "beginner",
            functions: ["code-editor", "frontend", "css", "javascript", "html", "inspiration", "showcase", "learning"]
        },
        {
            title: "JSFiddle",
            description: "Test your JavaScript, CSS, HTML or CoffeeScript online with JSFiddle code editor",
            url: "https://jsfiddle.net",
            tags: ["company", "tools", "documentation"],
            difficulty: "beginner",
            functions: ["code-editor", "frontend", "css", "javascript", "html", "testing", "debugging", "sharing"]
        },
        {
            title: "Observable",
            description: "The computational notebook for data science and visualization",
            url: "https://observablehq.com",
            tags: ["company", "tools", "documentation"],
            difficulty: "intermediate",
            functions: ["data-science", "visualization", "notebooks", "javascript", "d3", "analytics", "interactive", "collaboration"]
        },
        {
            title: "Figma Community",
            description: "Discover and use thousands of free design resources",
            url: "https://www.figma.com/community",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["design", "templates", "components", "inspiration", "ui-kits", "icons", "illustrations", "plugins"]
        },
        {
            title: "Unsplash",
            description: "Beautiful free images and photos you can use everywhere",
            url: "https://unsplash.com",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["stock-photos", "images", "design", "inspiration", "free-resources", "photography", "visual-content"]
        },
        {
            title: "Pexels",
            description: "Free stock photos and videos you can use everywhere",
            url: "https://www.pexels.com",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["stock-photos", "videos", "images", "design", "inspiration", "free-resources", "visual-content"]
        },
        {
            title: "Font Awesome",
            description: "The web's most popular icon toolkit",
            url: "https://fontawesome.com",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["icons", "fonts", "design", "ui", "svg", "web-fonts", "icon-fonts", "free-resources"]
        },
        {
            title: "Feather Icons",
            description: "Simply beautiful open source icons",
            url: "https://feathericons.com",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["icons", "svg", "design", "ui", "open-source", "simple", "minimal", "free-resources"]
        },
        {
            title: "Heroicons",
            description: "Beautiful hand-crafted SVG icons by the makers of Tailwind CSS",
            url: "https://heroicons.com",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["icons", "svg", "design", "ui", "tailwind", "free-resources", "outline", "solid"]
        },
        {
            title: "Coolors",
            description: "The super fast color schemes generator",
            url: "https://coolors.co",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["color-palettes", "design", "inspiration", "color-schemes", "generator", "ui", "branding"]
        },
        {
            title: "Color Hunt",
            description: "Color Palettes for Designers and Artists",
            url: "https://colorhunt.co",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["color-palettes", "design", "inspiration", "color-schemes", "curated", "ui", "branding"]
        },
        {
            title: "CSS Grid Generator",
            description: "Generate CSS Grid code to make grid layouts",
            url: "https://cssgrid-generator.netlify.app",
            tags: ["personal", "tools"],
            difficulty: "intermediate",
            functions: ["css-grid", "layout", "generator", "frontend", "css", "tools", "responsive-design"]
        },
        {
            title: "Flexbox Froggy",
            description: "Learn CSS Flexbox through a fun game",
            url: "https://flexboxfroggy.com",
            tags: ["personal", "tools", "documentation"],
            difficulty: "beginner",
            functions: ["css-flexbox", "learning", "game", "interactive", "tutorials", "frontend", "css"]
        },
        {
            title: "Grid Garden",
            description: "Learn CSS Grid through a fun game",
            url: "https://cssgridgarden.com",
            tags: ["personal", "tools", "documentation"],
            difficulty: "beginner",
            functions: ["css-grid", "learning", "game", "interactive", "tutorials", "frontend", "css"]
        },
        {
            title: "Can I Use",
            description: "Browser support tables for modern web technologies",
            url: "https://caniuse.com",
            tags: ["company", "tools", "documentation"],
            difficulty: "intermediate",
            functions: ["browser-support", "compatibility", "reference", "web-standards", "css", "javascript", "html", "apis"]
        },
        {
            title: "Web.dev",
            description: "Get the web's modern capabilities on your own sites and apps with useful guidance and analysis",
            url: "https://web.dev",
            tags: ["company", "tools", "documentation"],
            difficulty: "intermediate",
            functions: ["web-development", "performance", "pwa", "accessibility", "seo", "best-practices", "tutorials", "analysis"]
        },
        {
            title: "Lighthouse",
            description: "Automated auditing, performance metrics, and best practices for the web",
            url: "https://developers.google.com/web/tools/lighthouse",
            tags: ["company", "tools", "documentation"],
            difficulty: "intermediate",
            functions: ["performance", "auditing", "seo", "accessibility", "best-practices", "pwa", "analysis", "metrics"]
        },
        {
            title: "WebPageTest",
            description: "Website Performance and Optimization Testing",
            url: "https://www.webpagetest.org",
            tags: ["company", "tools"],
            difficulty: "intermediate",
            functions: ["performance", "testing", "analysis", "metrics", "optimization", "speed", "waterfall", "lighthouse"]
        },
        {
            title: "GTmetrix",
            description: "Website Speed and Performance Optimization",
            url: "https://gtmetrix.com",
            tags: ["company", "tools"],
            difficulty: "intermediate",
            functions: ["performance", "testing", "analysis", "metrics", "optimization", "speed", "lighthouse", "page-speed"]
        },
        {
            title: "JSONPlaceholder",
            description: "Free fake API for testing and prototyping",
            url: "https://jsonplaceholder.typicode.com",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["api", "testing", "prototyping", "json", "fake-data", "development", "mock-api", "rest"]
        },
        {
            title: "MockAPI",
            description: "Create a mock API in seconds",
            url: "https://mockapi.io",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["api", "testing", "prototyping", "mock-api", "development", "fake-data", "rest", "json"]
        },
        {
            title: "Postman",
            description: "The Collaboration Platform for API Development",
            url: "https://www.postman.com",
            tags: ["company", "tools", "documentation"],
            difficulty: "intermediate",
            functions: ["api", "testing", "development", "documentation", "collections", "environments", "automation", "collaboration"]
        },
        {
            title: "Insomnia",
            description: "The API Design Platform and REST Client",
            url: "https://insomnia.rest",
            tags: ["company", "tools"],
            difficulty: "intermediate",
            functions: ["api", "testing", "development", "rest-client", "graphql", "design", "documentation", "debugging"]
        },
        {
            title: "Cameron's World",
            description: "A crowdsourced directory of the 1990s web aesthetic",
            url: "https://www.cameronsworld.net",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["web-history", "inspiration", "design", "aesthetics", "retro-web", "crowdsourced", "archive"]
        },
        {
            title: "Everything2",
            description: "A collaborative writing site with articles on everything",
            url: "https://everything2.com",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["knowledge-base", "collaborative-writing", "articles", "reference", "community", "information"]
        },
        {
            title: "Wayback Machine",
            description: "Digital archive of the World Wide Web",
            url: "https://web.archive.org",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["web-archive", "history", "research", "backup", "preservation", "reference"]
        },
        {
            title: "Internet Archive",
            description: "Non-profit library of millions of free books, movies, software, music, websites, and more",
            url: "https://archive.org",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["digital-library", "preservation", "free-resources", "books", "software", "media", "research"]
        },
        {
            title: "Neocities",
            description: "Create your own free website",
            url: "https://neocities.org",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["web-hosting", "static-sites", "free-hosting", "web-development", "community", "geocities-style"]
        },
        {
            title: "TinyURL",
            description: "URL shortener service",
            url: "https://tinyurl.com",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["url-shortener", "utilities", "sharing", "links", "redirects"]
        },
        {
            title: "Wolfram Alpha",
            description: "Computational knowledge engine",
            url: "https://www.wolframalpha.com",
            tags: ["company", "tools"],
            difficulty: "intermediate",
            functions: ["computation", "knowledge-engine", "mathematics", "science", "research", "data-analysis"]
        },
        {
            title: "Archive.today",
            description: "Web archiving service",
            url: "https://archive.today",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["web-archive", "backup", "preservation", "research", "reference", "snapshots"]
        },
        {
            title: "CodeSpaced",
            description: "Online code editor and development environment",
            url: "https://codespaced.com",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["code-editor", "online-ide", "development", "collaboration", "web-based", "programming"]
        },
        {
            title: "Strwb",
            description: "Personal website and portfolio",
            url: "https://strwb.com",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["portfolio", "personal-site", "web-development", "showcase"]
        },
        {
            title: "cyb3r17.space",
            description: "Personal portfolio and corner of the internet for a self-taught programmer interested in ML and electronics",
            url: "https://cyb3r17.space",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["portfolio", "personal-site", "ai-ml", "programming", "projects", "blog"]
        },
        {
            title: "TinyURL",
            description: "URL shortener service",
            url: "https://tinyurl.com",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["url-shortener", "utilities", "sharing", "links", "redirects"]
        },
        {
            title: "Wolfram Alpha",
            description: "Computational knowledge engine",
            url: "https://www.wolframalpha.com",
            tags: ["company", "tools"],
            difficulty: "intermediate",
            functions: ["computation", "knowledge-engine", "mathematics", "science", "research", "data-analysis"]
        },
        {
            title: "Archive.today",
            description: "Web archiving service",
            url: "https://archive.today",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["web-archive", "backup", "preservation", "research", "reference", "snapshots"]
        },
        {
            title: "Hacker News",
            description: "Social news website focusing on computer science and entrepreneurship",
            url: "https://news.ycombinator.com",
            tags: ["company", "tools"],
            difficulty: "beginner",
            functions: ["news", "community", "programming", "technology", "discussion", "startups"]
        },
        {
            title: "Stack Exchange",
            description: "Network of question and answer websites on topics in diverse fields",
            url: "https://stackexchange.com",
            tags: ["company", "tools", "documentation"],
            difficulty: "beginner",
            functions: ["q&a", "community", "learning", "knowledge-base", "discussion", "expertise"]
        },
        {
            title: "GitLab",
            description: "DevOps platform delivered as a single application",
            url: "https://gitlab.com",
            tags: ["company", "tools"],
            difficulty: "intermediate",
            functions: ["version-control", "ci-cd", "project-management", "code-review", "deployment", "collaboration"]
        },
        {
            title: "Bitbucket",
            description: "Git code hosting service for teams and professionals",
            url: "https://bitbucket.org",
            tags: ["company", "tools"],
            difficulty: "intermediate",
            functions: ["version-control", "project-management", "code-review", "collaboration", "git-hosting"]
        },
        {
            title: "convert (by SuleDevSec)",
            description: "CLI tool for converting image types and markdown to PDF. Created by @SuleDevSec on Twitter - 'vibe-coded as hell, but it works'",
            url: "https://github.com/Sule57/convert",
            tags: ["repository", "tools"],
            difficulty: "intermediate",
            functions: ["cli-tool", "image-conversion", "markdown-to-pdf", "file-conversion", "utilities", "command-line"]
        }
    ];

    // Add default values for personal recommendation fields
    websites.forEach(website => {
        if (website.personalRecommendation === undefined) {
            website.personalRecommendation = false;
        }
        if (website.starRating === undefined) {
            website.starRating = null;
        }
        if (website.personalReview === undefined) {
            website.personalReview = null;
        }
    });

    // Helper function to render star rating
    function renderStarRating(rating) {
        if (!rating) return '';
        
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<span class="star">★</span>';
            } else {
                stars += '<span class="star empty">☆</span>';
            }
        }
        return `<div class="star-rating">${stars}</div>`;
    }

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
        const documentationFilter = document.getElementById('documentation').checked;
        const repositoryFilter = document.getElementById('repository').checked;
        const personalRecommendationFilter = document.getElementById('personalRecommendation').checked;
        const selectedDifficulty = document.querySelector('.difficulty-btn.active').getAttribute('data-difficulty');
        
        const filteredWebsites = websites.filter(website => {
            const matchesSearch = website.title.toLowerCase().includes(searchTerm) || 
                                 website.description.toLowerCase().includes(searchTerm);
            
            const matchesPersonal = personalFilter && website.tags.includes('personal');
            const matchesCompany = companyFilter && website.tags.includes('company');
            const matchesTools = toolsFilter && website.tags.includes('tools');
            const matchesDocumentation = documentationFilter && website.tags.includes('documentation');
            const matchesRepository = repositoryFilter && website.tags.includes('repository');
            const matchesPersonalRecommendation = personalRecommendationFilter ? website.personalRecommendation : true;
            const matchesDifficulty = !selectedDifficulty || website.difficulty === selectedDifficulty;
            
            return matchesSearch && (matchesPersonal || matchesCompany || matchesTools || matchesDocumentation || matchesRepository) && matchesDifficulty && matchesPersonalRecommendation;
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
            
            let personalBadge = '';
            let starRating = '';
            let personalReview = '';
            
            if (website.personalRecommendation) {
                personalBadge = '<span class="personal-recommendation">⭐ eosyn has used this</span>';
                if (website.starRating) {
                    starRating = renderStarRating(website.starRating);
                }
                if (website.personalReview) {
                    personalReview = `<div class="personal-review">${website.personalReview}</div>`;
                }
            }
            
            card.innerHTML = `
                <a href="${website.url}" target="_blank" class="website-title">${website.title}</a>
                <p class="website-description">${website.description}</p>
                ${personalBadge}
                ${starRating}
                ${personalReview}
                <div class="website-tags">
                    ${website.tags.map(tag => `<span class="tag ${tag}">${tag}</span>`).join('')}
                    <span class="difficulty-badge ${website.difficulty}">${website.difficulty}</span>
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
        
        // Gear button click handler
        document.getElementById('gearButton').addEventListener('click', function() {
            const themeSwitcher = document.querySelector('.theme-switcher');
            themeSwitcher.classList.toggle('show');
        });
        
        // Search and filter event listeners
        document.getElementById('searchBar').addEventListener('input', filterWebsites);
        document.getElementById('personal').addEventListener('change', filterWebsites);
        document.getElementById('company').addEventListener('change', filterWebsites);
        document.getElementById('tools').addEventListener('change', filterWebsites);
        document.getElementById('documentation').addEventListener('change', filterWebsites);
        document.getElementById('repository').addEventListener('change', filterWebsites);
        document.getElementById('personalRecommendation').addEventListener('change', filterWebsites);
        
        // Difficulty filter event listeners
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterWebsites();
            });
        });
        
        // Initial display
        filterWebsites();
    });
    </script>
</body>
</html> 