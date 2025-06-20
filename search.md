---
layout: page
title: Search
permalink: /search/
---

<link rel="stylesheet" href="/assets/css/themes.css">

<body>
    <a href="/howtodothat" class="glass-button" style="position: fixed; top: 20px; left: 20px; z-index: 1000;">← Back to Quiz</a>
    <div class="glass-container" style="max-width: 1200px; margin: 0 auto; padding: 30px;">
        <header style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: var(--theme-primary); font-weight: 700; font-size: 2.5em;">Your Personalized Recommendations</h1>
            <p style="color: var(--theme-text-secondary); font-size: 1.1em;">Based on your quiz answers, here are some tools and technologies to get you started.</p>
        </header>

        <div id="search-controls" style="margin-bottom: 30px; text-align: center;">
            <input type="text" id="searchBar" class="glass-input" placeholder="Filter results by keyword..." style="width: 60%;">
        </div>
        
        <div id="filters" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 20px;">
            <div class="filter-group" style="display: flex; flex-direction: column;">
                <h3 style="font-weight: 600; margin-bottom: 10px; color: var(--theme-text);">Project Type</h3>
                <div class="filter-options" id="project-type-filter" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>
            <div class="filter-group" style="display: flex; flex-direction: column;">
                <h3 style="font-weight: 600; margin-bottom: 10px; color: var(--theme-text);">Features</h3>
                <div class="filter-options" id="features-filter" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>
            <div class="filter-group" style="display: flex; flex-direction: column;">
                <h3 style="font-weight: 600; margin-bottom: 10px; color: var(--theme-text);">Learning Style</h3>
                <div class="filter-options" id="learning-style-filter" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>
            <div class="filter-group" style="display: flex; flex-direction: column;">
                <h3 style="font-weight: 600; margin-bottom: 10px; color: var(--theme-text);">Results Speed</h3>
                <div class="filter-options" id="results-speed-filter" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>
        </div>

        <div id="results-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px;">
            <!-- Results will be dynamically inserted here -->
        </div>
    </div>

    <script>
        const toolsData = [
            // Your tools data here
        ];

        document.addEventListener('DOMContentLoaded', () => {
            const searchBar = document.getElementById('searchBar');
            searchBar.addEventListener('input', filterResults);
            
            populateFiltersFromUrl();
            setupFilterListeners();
            filterResults();
        });

        function getUrlParams() {
            const params = new URLSearchParams(window.location.search);
            return {
                projectType: params.get('projectType'),
                features: params.getAll('features'),
                learningStyle: params.get('learningStyle'),
                resultsSpeed: params.get('resultsSpeed')
            };
        }

        function populateFiltersFromUrl() {
            const { projectType, features, learningStyle, resultsSpeed } = getUrlParams();
            const filters = {
                'project-type-filter': projectType ? [projectType] : [],
                'features-filter': features,
                'learning-style-filter': learningStyle ? [learningStyle] : [],
                'results-speed-filter': resultsSpeed ? [resultsSpeed] : []
            };

            for (const [filterId, values] of Object.entries(filters)) {
                const container = document.getElementById(filterId);
                if (container) {
                    const allOptions = new Set(toolsData.flatMap(tool => tool.tags));
                    const relevantOptions = Array.from(allOptions).filter(option => {
                        if (filterId === 'project-type-filter') return ["Web Application", "Mobile App", "Desktop Application", "API/Backend Service", "Game"].includes(option);
                        if (filterId === 'features-filter') return ["User Accounts & Login", "Store Data", "Real-time Updates", "Handle Media", "Process Payments", "Simple Content"].includes(option);
                        if (filterId === 'learning-style-filter') return ["Video Tutorials", "Interactive Courses", "Documentation", "Community Learning"].includes(option);
                        if (filterId === 'results-speed-filter') return ["Quick & Simple", "Balanced Pace", "Deep Dive"].includes(option);
                        return false;
                    });
                    
                    relevantOptions.forEach(optionText => {
                        const optionEl = document.createElement('span');
                        optionEl.className = 'glass-badge';
                        optionEl.dataset.value = optionText;
                        optionEl.textContent = optionText;
                        if (values.includes(optionText)) {
                            optionEl.classList.add('primary');
                        }
                        container.appendChild(optionEl);
                    });
                }
            }
        }

        function setupFilterListeners() {
            document.querySelectorAll('.glass-badge').forEach(option => {
                option.addEventListener('click', () => {
                    option.classList.toggle('primary');
                    filterResults();
                });
            });
        }

        function filterResults() {
            const searchTerm = document.getElementById('searchBar').value.toLowerCase();
            const selectedProjectTypes = Array.from(document.querySelectorAll('#project-type-filter .glass-badge.primary')).map(el => el.dataset.value);
            const selectedFeatures = Array.from(document.querySelectorAll('#features-filter .glass-badge.primary')).map(el => el.dataset.value);
            const selectedLearningStyles = Array.from(document.querySelectorAll('#learning-style-filter .glass-badge.primary')).map(el => el.dataset.value);
            const selectedResultsSpeeds = Array.from(document.querySelectorAll('#results-speed-filter .glass-badge.primary')).map(el => el.dataset.value);

            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = '';

            const matchingTools = toolsData.filter(tool => {
                const termMatch = searchTerm === '' || tool.name.toLowerCase().includes(searchTerm) || tool.description.toLowerCase().includes(searchTerm);
                const projectTypeMatch = selectedProjectTypes.length === 0 || tool.tags.some(tag => selectedProjectTypes.includes(tag));
                const featuresMatch = selectedFeatures.length === 0 || selectedFeatures.every(feature => tool.tags.includes(feature));
                const learningStyleMatch = selectedLearningStyles.length === 0 || tool.tags.some(tag => selectedLearningStyles.includes(tag));
                const resultsSpeedMatch = selectedResultsSpeeds.length === 0 || tool.tags.some(tag => selectedResultsSpeeds.includes(tag));
                
                return termMatch && projectTypeMatch && featuresMatch && learningStyleMatch && resultsSpeedMatch;
            });

            matchingTools.forEach(tool => {
                const card = document.createElement('div');
                card.className = 'glass-card';
                card.innerHTML = `
                    <div style="padding: 20px;">
                        <div style="font-size: 1.2em; font-weight: 600; color: var(--theme-text);">${tool.name}</div>
                        <p style="font-size: 0.9em; color: var(--theme-text-secondary); margin-top: 10px;">${tool.description}</p>
                    </div>
                    <div style="padding: 20px; border-top: 1px solid var(--glass-border-light);">
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${tool.tags.map(tag => `<span class="glass-badge">${tag}</span>`).join('')}
                        </div>
                    </div>
                `;
                resultsContainer.appendChild(card);
            });
        }
    </script>
</body>
</html> 