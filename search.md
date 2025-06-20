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
            
            /* Glass Effects */
            --glass-bg: rgba(255, 255, 255, 0.25);
            --glass-border: rgba(255, 255, 255, 0.3);
            --glass-shadow: rgba(0, 0, 0, 0.1);
            --text-accent: #667eea;
            
            /* Advanced Glass Effects */
            --glass-bevel: rgba(255, 255, 255, 0.4);
            --glass-inner-shadow: rgba(0, 0, 0, 0.1);
            --glass-highlight: rgba(255, 255, 255, 0.6);
            --glass-gradient-1: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%);
            --glass-gradient-2: linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%);
            --glass-gradient-3: linear-gradient(225deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%);
            
            /* Chromatic Colors */
            --chromatic-purple: #667eea;
            --chromatic-pink: #f093fb;
            --chromatic-blue: #4facfe;
            --chromatic-green: #43e97b;
            --chromatic-orange: #fa709a;
            
            /* Gradient Colors */
            --gradient-delicious: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
            --gradient-celestial: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%);
            --gradient-aurora: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
            --gradient-retro: linear-gradient(135deg, #ff8a65 0%, #ff5722 100%);
            --gradient-zen: linear-gradient(135deg, #8bc34a 0%, #ff9800 100%);
            --gradient-eco: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
            --gradient-neon: linear-gradient(135deg, #ff5722 0%, #ff9800 100%);
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
            --text-accent: #ff6b6b;
            --glass-bg: rgba(255, 107, 107, 0.25);
            --glass-border: rgba(255, 107, 107, 0.3);
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --text-light: #718096;
            --text-white: #ffffff;
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
            --text-accent: #4fc3f7;
            --glass-bg: rgba(79, 195, 247, 0.25);
            --glass-border: rgba(79, 195, 247, 0.3);
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --text-light: #718096;
            --text-white: #ffffff;
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
            --text-accent: #66bb6a;
            --glass-bg: rgba(102, 187, 106, 0.25);
            --glass-border: rgba(102, 187, 106, 0.3);
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --text-light: #718096;
            --text-white: #ffffff;
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
            --text-accent: #e91e63;
            --glass-bg: rgba(233, 30, 99, 0.25);
            --glass-border: rgba(233, 30, 99, 0.3);
            --text-white: #ffffff;
        }

        /* Theme: C - Cosmic (Dark Theme) */
        [data-theme="c"] {
            --primary-purple: #667eea;
            --primary-pink: #f093fb;
            --accent-blue: #4facfe;
            --accent-green: #43e97b;
            --accent-orange: #fa709a;
            --text-primary: #ffffff;
            --text-secondary: #e0e0e0;
            --text-light: #bdbdbd;
            --bg-primary: #0a0a0a;
            --bg-secondary: #1a1a1a;
            --bg-accent: #2d2d2d;
            --border-primary: #404040;
            --border-accent: #555555;
            --gradient-primary: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
            --gradient-secondary: linear-gradient(135deg, #4facfe 0%, #43e97b 100%);
            --border-pink: #f093fb;
            --text-accent: #667eea;
            --glass-bg: rgba(102, 126, 234, 0.25);
            --glass-border: rgba(102, 126, 234, 0.3);
            --text-white: #ffffff;
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
            --text-accent: #ff6b6b;
            --glass-bg: rgba(255, 107, 107, 0.25);
            --glass-border: rgba(255, 107, 107, 0.3);
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --text-light: #718096;
            --text-white: #ffffff;
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
            --text-accent: #4fc3f7;
            --glass-bg: rgba(79, 195, 247, 0.25);
            --glass-border: rgba(79, 195, 247, 0.3);
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --text-light: #718096;
            --text-white: #ffffff;
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
            --text-accent: #66bb6a;
            --glass-bg: rgba(102, 187, 106, 0.25);
            --glass-border: rgba(102, 187, 106, 0.3);
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --text-light: #718096;
            --text-white: #ffffff;
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
            --text-accent: #e91e63;
            --glass-bg: rgba(233, 30, 99, 0.25);
            --glass-border: rgba(233, 30, 99, 0.3);
            --text-white: #ffffff;
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
            --text-accent: #ff5722;
            --glass-bg: rgba(255, 87, 34, 0.25);
            --glass-border: rgba(255, 87, 34, 0.3);
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --text-light: #718096;
            --text-white: #ffffff;
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
            padding: 12px 20px;
            border: 2px solid var(--glass-border);
            border-radius: 25px;
            font-size: 16px;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            color: var(--text-primary);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .search-bar:focus {
            outline: none;
            border-color: var(--text-accent);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
            background: var(--glass-bg);
        }

        .search-bar::placeholder {
            color: var(--text-light);
        }

        .filters {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin: 20px 0;
        }

        .filter-group {
            display: flex;
            align-items: center;
            gap: 8px;
            background: var(--glass-bg);
            padding: 8px 12px;
            border-radius: 20px;
            border: 1px solid var(--glass-border);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .filter-group:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            border-color: var(--text-accent);
        }

        .filter-group input[type="checkbox"] {
            accent-color: var(--text-accent);
        }

        .filter-group label {
            color: var(--text-accent);
            font-weight: 500;
            cursor: pointer;
        }

        .difficulty-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
        }

        .difficulty-btn {
            padding: 8px 16px;
            font-size: 14px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            border: 1px solid transparent;
            color: var(--text-white);
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(0,0,0,0.3);
            background: var(--gradient-button);
        }

        .difficulty-btn::before {
            content: '';
            position: absolute;
            top: -20px;
            left: -50px;
            width: 30px;
            height: 150%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: rotate(25deg);
            transition: all 0.6s ease;
        }
        
        .difficulty-btn:hover::before {
            left: calc(100% + 50px);
        }

        .difficulty-btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), inset 0 -1px 2px rgba(0,0,0,0.3);
        }

        .difficulty-btn:active {
            transform: translateY(1px) scale(1);
            box-shadow: 0 2px 5px rgba(0,0,0,0.2), inset 0 2px 5px rgba(0,0,0,0.4);
        }

        .difficulty-btn.active {
            box-shadow: 0 0 0 3px var(--accent), 0 5px 15px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(0,0,0,0.3);
            transform: translateY(1px) scale(1);
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
            border: 1px solid var(--glass-border);
            border-radius: 15px;
            padding: 20px;
            transition: all 0.3s ease;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .website-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.6s;
        }

        .website-card:hover::before {
            left: 100%;
        }

        .website-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px var(--shadow-medium);
            border-color: var(--text-accent);
            background: var(--glass-bg);
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
            border-color: var(--accent);
            box-shadow: 0 0 0 3px var(--accent);
        }

        .theme-btn[data-theme="d"] { background: var(--gradient-delicious); }
        .theme-btn[data-theme="c"] { background: var(--gradient-celestial); }
        .theme-btn[data-theme="a"] { background: var(--gradient-aurora); }
        .theme-btn[data-theme="r"] { background: var(--gradient-retro); }
        .theme-btn[data-theme="z"] { background: var(--gradient-zen); }
        .theme-btn[data-theme="e"] { background: var(--gradient-eco); }
        .theme-btn[data-theme="n"] { background: var(--gradient-neon); }

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
            font-size: 14px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            border: 1px solid transparent;
            color: var(--text-white);
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(0,0,0,0.3);
        }

        .cookie-btn::before {
            content: '';
            position: absolute;
            top: -20px;
            left: -50px;
            width: 30px;
            height: 150%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: rotate(25deg);
            transition: all 0.6s ease;
        }

        .cookie-btn:hover::before {
            left: calc(100% + 50px);
        }

        .cookie-btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), inset 0 -1px 2px rgba(0,0,0,0.3);
        }
        
        .cookie-btn:active {
            transform: translateY(1px) scale(1);
            box-shadow: 0 2px 5px rgba(0,0,0,0.2), inset 0 2px 5px rgba(0,0,0,0.4);
        }

        .cookie-btn.accept {
            background: var(--gradient-button);
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

        /* Starfield Background */
        .starfield-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
            overflow: hidden;
        }

        .starfield-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        .starfield-image[data-image="stars"] {
            opacity: 0.05;
        }

        /* Theme-specific starfield images */
        [data-theme="c"] .starfield-image[data-image="stars"],
        [data-theme="a"] .starfield-image[data-image="clouds1"],
        [data-theme="r"] .starfield-image[data-image="clouds2"],
        [data-theme="e"] .starfield-image[data-image="clouds4"],
        [data-theme="z"] .starfield-image[data-image="stars"],
        [data-theme="n"] .starfield-image[data-image="stars"] {
            opacity: 0.05;
        }

        .starfield-image {
            opacity: 0;
        }

        /* Ticker Sections */
        .ticker-section {
            background: var(--glass-bg);
            border: 2px solid var(--glass-border);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .ticker-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
            transition: left 0.8s;
        }

        .ticker-section:hover::before {
            left: 100%;
        }

        .ticker-section h3 {
            color: var(--text-accent);
            margin-bottom: 15px;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
        }

        .ticker-container {
            overflow: hidden;
            position: relative;
            height: 60px;
        }

        .ticker-track {
            display: flex;
            animation: ticker 30s linear infinite;
            gap: 40px;
        }

        .ticker-track:hover {
            animation-play-state: paused;
        }

        .ticker-item {
            background: var(--glass-bg);
            color: var(--text-accent);
            padding: 8px 16px;
            border-radius: 20px;
            white-space: nowrap;
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.3s ease;
            border: 1px solid var(--glass-border);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .ticker-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }

        .ticker-item:hover::before {
            left: 100%;
        }

        .ticker-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px var(--shadow-medium);
            background: var(--glass-bg);
            color: var(--text-primary);
            border-color: var(--text-accent);
        }

        @keyframes ticker {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }

        .ticker-track.social {
            animation-duration: 25s;
        }

        .ticker-track.forums {
            animation-duration: 35s;
        }
    </style>
</head>
<body>
    <!-- Starfield Background -->
    <div class="starfield-container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="starfield-image" data-image="stars">
        <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="starfield-image" data-image="clouds1">
        <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="starfield-image" data-image="clouds2">
        <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="starfield-image" data-image="clouds4">
    </div>

    <a href="/" class="back-link">← Back to Home</a>
    
    <div class="container">
        <div class="header">
            <h1 class="chromatic-text">Discover</h1>
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
                    <label for="personalRecommendation">Has eosyn used this?</label>
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

        <!-- Social Websites Ticker -->
        <div class="ticker-section">
            <h3>Social Websites</h3>
            <div class="ticker-container">
                <div class="ticker-track social">
                    <a href="https://twitter.com" class="ticker-item" target="_blank">Twitter</a>
                    <a href="https://discord.com" class="ticker-item" target="_blank">Discord</a>
                    <a href="https://youtube.com" class="ticker-item" target="_blank">YouTube</a>
                    <a href="https://twitch.tv" class="ticker-item" target="_blank">Twitch</a>
                    <a href="https://github.com" class="ticker-item" target="_blank">GitHub</a>
                    <a href="https://dev.to" class="ticker-item" target="_blank">Dev.to</a>
                    <a href="https://dribbble.com" class="ticker-item" target="_blank">Dribbble</a>
                    <a href="https://behance.net" class="ticker-item" target="_blank">Behance</a>
                    <a href="https://pinterest.com" class="ticker-item" target="_blank">Pinterest</a>
                    <a href="https://medium.com" class="ticker-item" target="_blank">Medium</a>
                    <a href="https://hashnode.com" class="ticker-item" target="_blank">Hashnode</a>
                </div>
            </div>
        </div>

        <!-- Forums Ticker -->
        <div class="ticker-section">
            <h3>Forums & Communities</h3>
            <div class="ticker-container">
                <div class="ticker-track forums">
                    <a href="https://stackoverflow.com" class="ticker-item" target="_blank">Stack Overflow</a>
                    <a href="https://reddit.com/r/art" class="ticker-item" target="_blank">r/art</a>
                </div>
            </div>
        </div>

        <div class="website-grid" id="websiteGrid">
            <!-- Websites will be populated here -->
        </div>
    </div>


    <!-- Cookie Consent -->
    <div class="cookie-consent" id="cookieConsent">
        <h3>Cookie Notice</h3>
        <p>This website uses cookies to save your theme preference and improve your experience. We only store your theme choice and don't track any personal information.</p>
        <div class="cookie-buttons">
            <button class="cookie-btn reject" onclick="rejectCookies()">Reject</button>
            <button class="cookie-btn accept" onclick="acceptCookies()">Accept</button>
        </div>
    </div>

    <script>
    // list of websites, not really a "database" xdddd -eos
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
            title: "CSS-Tricks",
            description: "Tips, tricks, and techniques for CSS",
            url: "https://css-tricks.com",
            tags: ["personal", "tools", "documentation"],
            difficulty: "beginner",
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
            difficulty: "beginner",
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
            difficulty: "intermediate",
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
            description: "Progressive JavaScript framework",
            url: "https://vuejs.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["framework", "documentation", "tutorials", "examples", "vue", "components", "composition-api", "ecosystem"]
        },
        {
            title: "TypeScript",
            description: "Typed JavaScript for better development",
            url: "https://www.typescriptlang.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["programming-language", "type-safety", "documentation", "compiler", "javascript", "static-analysis", "ide-support", "refactoring"]
        },
        {
            title: "Vercel",
            description: "Frontend deployment platform",
            url: "https://vercel.com",
            tags: ["tools", "company"],
            difficulty: "beginner",
            functions: ["deployment", "hosting", "serverless", "ci-cd", "edge-functions", "domains", "analytics", "preview-deployments"]
        },
        {
            title: "Netlify",
            description: "Web hosting and deployment platform",
            url: "https://netlify.com",
            tags: ["tools", "company"],
            difficulty: "beginner",
            functions: ["deployment", "hosting", "forms", "cms", "functions", "redirects", "headers", "build-tools"]
        },
        {
            title: "Firebase",
            description: "Backend-as-a-Service by Google",
            url: "https://firebase.google.com",
            tags: ["tools", "company"],
            difficulty: "intermediate",
            functions: ["backend-as-a-service", "authentication", "database", "hosting", "cloud-functions", "analytics", "messaging", "storage"]
        },
        {
            title: "MongoDB",
            description: "Document database for modern applications",
            url: "https://www.mongodb.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["database", "nosql", "data-storage", "scalability", "aggregation", "indexing", "replication", "sharding"]
        },
        {
            title: "Node.js",
            description: "JavaScript runtime for server-side development",
            url: "https://nodejs.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["runtime", "server-side", "npm", "javascript", "event-driven", "non-blocking", "package-management", "ecosystem"]
        },
        {
            title: "Express.js",
            description: "Web framework for Node.js",
            url: "https://expressjs.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["web-framework", "api", "middleware", "routing", "nodejs", "http-server", "static-files", "templating"]
        },
        {
            title: "Next.js",
            description: "React framework for production",
            url: "https://nextjs.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["react-framework", "ssr", "ssg", "routing", "api-routes", "image-optimization", "performance", "deployment"]
        },
        {
            title: "Tailwind CSS",
            description: "Utility-first CSS framework",
            url: "https://tailwindcss.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "beginner",
            functions: ["css-framework", "utility-classes", "responsive-design", "customization", "components", "dark-mode", "purge-css", "jit-compiler"]
        },
        {
            title: "Git",
            description: "Version control system",
            url: "https://git-scm.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["version-control", "collaboration", "branching", "history", "merging", "stashing", "rebase", "hooks"]
        },
        {
            title: "Postman",
            description: "API development platform",
            url: "https://www.postman.com",
            tags: ["tools", "company"],
            difficulty: "beginner",
            functions: ["api", "testing", "development", "documentation", "collections", "environments", "automation", "collaboration"]
        },
        {
            title: "Can I Use",
            description: "Browser compatibility tables",
            url: "https://caniuse.com",
            tags: ["tools", "personal"],
            difficulty: "beginner",
            functions: ["browser-support", "compatibility", "reference", "web-standards", "css", "javascript", "html", "apis"]
        },
        {
            title: "Web.dev",
            description: "Modern web development guide by Google",
            url: "https://web.dev",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["web-development", "performance", "pwa", "accessibility", "seo", "best-practices", "tutorials", "analysis"]
        },
        {
            title: "Angular",
            description: "Full-featured framework for building applications",
            url: "https://angular.io",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["framework", "documentation", "tutorials", "cli-tools", "typescript", "dependency-injection", "routing", "forms"]
        },
        {
            title: "Flutter",
            description: "Cross-platform UI toolkit",
            url: "https://flutter.dev",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["mobile-development", "cross-platform", "ui-framework", "hot-reload", "dart", "widgets", "state-management", "packages"]
        },
        {
            title: "Socket.io",
            description: "Real-time communication library",
            url: "https://socket.io",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["real-time", "websockets", "communication", "api", "chat", "gaming", "collaboration", "live-updates"]
        },
        {
            title: "PostgreSQL",
            description: "Advanced open-source database",
            url: "https://www.postgresql.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["database", "sql", "data-storage", "scalability", "acid-compliance", "json-support", "full-text-search", "extensions"]
        },
        {
            title: "Tauri",
            description: "Desktop app framework",
            url: "https://tauri.app",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["desktop-apps", "cross-platform", "performance", "security", "rust", "webview", "native-apis", "bundling"]
        },
        {
            title: "Electron",
            description: "Cross-platform desktop apps with web technologies",
            url: "https://www.electronjs.org",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["desktop-apps", "cross-platform", "web-technologies", "packaging", "distribution", "auto-updater", "native-modules", "chromium"]
        },
        {
            title: "Docker",
            description: "Containerization platform",
            url: "https://www.docker.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["containerization", "deployment", "devops", "microservices", "orchestration", "images", "volumes", "networking"]
        },
        {
            title: "AWS",
            description: "Cloud computing platform",
            url: "https://aws.amazon.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["cloud-computing", "hosting", "storage", "ai-ml", "serverless", "containers", "databases", "security"]
        },
        {
            title: "Google Cloud",
            description: "Cloud computing services",
            url: "https://cloud.google.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["cloud-computing", "hosting", "storage", "ai-ml", "kubernetes", "bigquery", "firestore", "functions"]
        },
        {
            title: "Unity",
            description: "Game development platform",
            url: "https://unity.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["game-development", "3d", "2d", "cross-platform", "physics", "animation", "audio", "asset-store"]
        },
        {
            title: "Unreal Engine",
            description: "3D creation tool for games and visualization",
            url: "https://www.unrealengine.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["game-development", "3d", "visualization", "vr-ar", "blueprints", "materials", "lighting", "cinematics"]
        },
        {
            title: "CodePen",
            description: "Frontend code playground",
            url: "https://codepen.io",
            tags: ["tools", "personal"],
            difficulty: "beginner",
            functions: ["code-editor", "frontend", "css", "javascript", "html", "inspiration", "showcase", "learning"]
        },
        {
            title: "Glitch",
            description: "Friendly coding community and platform",
            url: "https://glitch.com",
            tags: ["tools", "company"],
            difficulty: "beginner",
            functions: ["code-editor", "deployment", "collaboration", "learning", "web-development", "javascript", "nodejs", "community"]
        },
        {
            title: "Replit",
            description: "Collaborative browser IDE",
            url: "https://replit.com",
            tags: ["tools", "company"],
            difficulty: "beginner",
            functions: ["code-editor", "deployment", "collaboration", "learning", "web-development", "python", "javascript", "education"]
        },
        {
            title: "Stripe",
            description: "Payment processing platform",
            url: "https://stripe.com",
            tags: ["tools", "company", "documentation"],
            difficulty: "intermediate",
            functions: ["payments", "e-commerce", "api", "security", "subscriptions", "invoicing", "taxes", "fraud-prevention"]
        },
        {
            title: "Expo",
            description: "React Native platform",
            url: "https://expo.dev",
            tags: ["tools", "company", "documentation"],
            difficulty: "expert",
            functions: ["mobile-development", "react-native", "deployment", "testing", "sdk", "cli", "ejected", "managed-workflow"]
        },
        {
            title: "Cursor",
            description: "AI-powered code editor",
            url: "https://cursor.sh",
            tags: ["tools", "company"],
            difficulty: "beginner",
            functions: ["code-editor", "ai-assistance", "debugging", "learning", "chat", "code-generation", "refactoring", "explanation"]
        },
        {
            title: "Wisk",
            description: "Modern Notion alternative",
            url: "https://wisk.cc",
            tags: ["tools", "personal"],
            difficulty: "beginner",
            functions: ["note-taking", "project-management", "collaboration", "organization", "documentation", "databases", "templates", "knowledge-base"]
        },
        {
            title: "cameronsworld",
            description: "Web aesthetic archive and inspiration",
            url: "https://cameronsworld.net",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["inspiration", "web-aesthetics", "archive", "retro-web", "design-inspiration", "creative-coding"]
        },
        {
            title: "everything2",
            description: "Collaborative writing and knowledge base",
            url: "https://everything2.com",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["collaborative-writing", "knowledge-base", "community", "articles", "learning", "reference"]
        },
        {
            title: "codespaced.com",
            description: "Development platform and tools",
            url: "https://codespaced.com",
            tags: ["tools", "company"],
            difficulty: "beginner",
            functions: ["development-platform", "tools", "coding", "productivity"]
        },
        {
            title: "strwb.com",
            description: "Personal website and portfolio",
            url: "https://strwb.com",
            tags: ["personal", "tools"],
            difficulty: "beginner",
            functions: ["portfolio", "personal-site", "inspiration", "web-design"]
        },
        {
            title: "cyb3r17.space",
            description: "Personal portfolio with ML focus",
            url: "https://cyb3r17.space",
            tags: ["personal", "tools"],
            difficulty: "expert",
            functions: ["portfolio", "machine-learning", "personal-site", "ai", "research"]
        },
        {
            title: "Wayback Machine",
            description: "Internet archive and historical web snapshots",
            url: "https://web.archive.org",
            tags: ["tools", "company"],
            difficulty: "beginner",
            functions: ["archive", "historical-data", "web-history", "research", "reference"]
        },
        {
            title: "Archive.today",
            description: "Web archiving service",
            url: "https://archive.today",
            tags: ["tools", "personal"],
            difficulty: "beginner",
            functions: ["archive", "web-snapshots", "research", "reference", "historical-data"]
        },
        {
            title: "GitLab",
            description: "DevOps platform and Git repository manager",
            url: "https://gitlab.com",
            tags: ["tools", "company", "repository"],
            difficulty: "intermediate",
            functions: ["version-control", "ci-cd", "devops", "collaboration", "project-management", "deployment"]
        },
        {
            title: "Bitbucket",
            description: "Git code hosting and collaboration platform",
            url: "https://bitbucket.org",
            tags: ["tools", "company", "repository"],
            difficulty: "intermediate",
            functions: ["version-control", "collaboration", "project-management", "code-review", "deployment"]
        },
        {
            title: "Hacker News",
            description: "Social news website focusing on computer science and entrepreneurship",
            url: "https://news.ycombinator.com",
            tags: ["tools", "personal"],
            difficulty: "beginner",
            functions: ["news", "community", "programming", "technology", "discussion", "startups"]
        },
        {
            title: "Convert Tool",
            description: "CLI tool for image conversion and markdown to PDF by @SuleDevSec",
            url: "https://github.com/Sule57/convert",
            tags: ["tools", "repository"],
            difficulty: "expert",
            functions: ["cli-tool", "image-conversion", "markdown", "pdf", "utilities"],
            personalRecommendation: true,
            starRating: 4,
            personalReview: "Vibe-coded but functional CLI tool for quick conversions. Great for batch processing!"
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
        
        // Save theme preference ONLY if cookies are accepted
        if (getCookie('cookiesAccepted') === 'true') {
            setCookie('theme', theme, 365);
        }
    }

    function loadTheme() {
        // Only load theme from cookie if cookies are accepted
        if (getCookie('cookiesAccepted') === 'true') {
            const savedTheme = getCookie('theme');
            if (savedTheme) {
                setTheme(savedTheme);
            } else {
                setTheme('a');
            }
        } else {
            // Set default theme to "a" if no cookies accepted
            setTheme('a');
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
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'a';
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

    // Update starfield image
    function updateStarfield() {
        const theme = document.documentElement.getAttribute('data-theme') || 'a';
        
        // Hide all starfield images
        document.querySelectorAll('.starfield-image').forEach(img => {
            img.style.opacity = '0';
        });
        
        // Show the appropriate image for the current theme
        const activeImage = document.querySelector(`.starfield-image[data-image="${getImageForTheme(theme)}"]`);
        if (activeImage) {
            activeImage.style.opacity = '0.05';
        }
    }

    function getImageForTheme(theme) {
        switch (theme) {
            case 'c':
            case 'z':
            case 'n':
                return 'stars';
            case 'a':
                return 'clouds1';
            case 'r':
                return 'clouds2';
            case 'e':
                return 'clouds4';
            default:
                return 'stars';
        }
    }

    // Update starfield when theme changes
    const originalSetTheme = setTheme;
    setTheme = function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // The original setTheme function from the template might not exist,
        // so we just set the attribute directly.
        updateStarfield();
    };
    </script>
</body>
</html> 