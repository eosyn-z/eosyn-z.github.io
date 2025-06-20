---
layout: default
title: How to do that
permalink: /howtodothat/
---

<div class="main-content">
  <div class="glass-container container">
    <div class="glass-card">
      <!-- Progress Bar -->
      <div style="width: 100%; height: 6px; border-radius: 3px; margin-bottom: 30px; overflow: hidden; position: relative; background: var(--glass-bg-light);">
          <div id="progress-fill" style="height: 100%; background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary)); border-radius: 3px; transition: width 0.3s ease; position: relative;"></div>
      </div>

      <header style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: var(--theme-accent); margin-bottom: 10px; font-weight: 700;">Find the Right Tools for Your Project</h1>
          <p style="color: var(--theme-text-secondary);">Answer a few questions to get personalized recommendations.</p>
      </header>

      <div id="selections-display" class="glass-panel" style="margin-bottom: 30px; display: none;">
          <h3 style="margin: 0 0 15px 0; font-size: 16px;">Your Selections:</h3>
          <div id="selection-tags" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
      </div>

      <form id="quiz-form">
          <!-- Questions will be injected here by JavaScript -->
      </form>
      
      <div style="display: flex; justify-content: space-between; margin-top: 30px;">
          <button id="prev-btn" class="glass-button">Previous</button>
          <button id="next-btn" class="glass-button primary">Next</button>
      </div>
    </div>
  </div>
</div>

<!-- Expert Advice Modal -->
<div id="expert-modal" class="glass-modal" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1001;">
    <h2 style="text-align: center; color: var(--theme-accent);">Hold on a second...</h2>
    <p style="text-align: center; margin: 20px 0; font-size: 1.1em;">Why are you asking a noob for expert advice?</p>
    <div style="text-align: center;">
        <button id="close-expert-modal" class="glass-button primary">I Trust Your Vibe</button>
    </div>
</div>
<div id="modal-backdrop" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 1000;"></div>


<script>
document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const progressFill = document.getElementById('progress-fill');
    const selectionsDisplay = document.getElementById('selections-display');
    const selectionTags = document.getElementById('selection-tags');

    const expertModal = document.getElementById('expert-modal');
    const closeModalBtn = document.getElementById('close-expert-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');

    let currentQuestionIndex = 0;
    const userSelections = {};

    const quizData = [
        {
            id: 'difficulty',
            question: "What's your experience level?",
            type: 'radio',
            options: [
                { value: 'beginner', text: '🌱 Beginner', description: "Just starting out, keep it simple!" },
                { value: 'intermediate', text: '🛠️ Intermediate', description: "Comfortable with code, ready for a challenge." },
                { value: 'expert', text: '🔥 Expert', description: "Looking for advanced tools and frameworks." }
            ]
        },
        {
            id: 'projectType',
            question: 'What kind of project are you building?',
            type: 'radio',
            options: [
                { value: 'website', text: '🌐 Personal Website / Blog' },
                { value: 'webapp', text: '🧩 Interactive Web App' },
                { value: 'ecommerce', text: '🛒 E-commerce Store' },
                { value: 'desktop', text: '🖥️ Desktop App' }
            ]
        },
        {
            id: 'visuals',
            question: 'What are the visual requirements?',
            type: 'checkbox',
            options: [
                { value: '2d-render', text: 'Render 2D graphics or visualizations' },
                { value: '3d-render', text: 'Render 3D objects or scenes' },
                { value: '2d-animation', text: 'Include 2D animations' },
                { value: '3d-animation', text: 'Include 3D animations' }
            ]
        },
        {
            id: 'features',
            question: 'What technical features do you need? (select all that apply)',
            type: 'checkbox',
            options: [
                { value: 'database', text: 'Store and manage data' },
                { value: 'auth', text: 'User accounts and login' },
                { value: 'realtime', text: 'Real-time updates (e.g., chat)' },
                { value: 'ui-focus', text: 'Beautiful, complex user interfaces' },
                { value: 'deployment', text: 'Easy, fast deployment' },
                { value: 'mobile', text: 'Mobile-friendly is a must' }
            ]
        }
    ];

    const toolDatabase = [
        // Beginner
        { name: 'Jekyll + GitHub Pages', difficulty: 'beginner', projectType: 'website', features: ['deployment', 'mobile'], description: 'Great for simple static sites and blogs. Free and easy to host.' },
        { name: 'Netlify + Eleventy (11ty)', difficulty: 'beginner', projectType: 'website', features: ['deployment', 'ui-focus', 'mobile'], description: 'A powerful static site generator that is flexible and fast. Netlify makes deployment a breeze.' },
        { name: 'Shopify', difficulty: 'beginner', projectType: 'ecommerce', features: ['deployment', 'auth', 'database', 'mobile'], description: 'The go-to solution for getting an e-commerce store up and running quickly with minimal code.' },
        { name: 'p5.js', difficulty: 'beginner', projectType: 'webapp', features: ['2d-render', '2d-animation'], description: 'A JavaScript library for creative coding, focused on making coding accessible for artists, designers, and educators.'},

        // Intermediate
        { name: 'React + Firebase', difficulty: 'intermediate', projectType: 'webapp', features: ['ui-focus', 'auth', 'database', 'deployment', 'realtime', 'mobile'], description: 'A classic combo. React for a powerful UI, and Firebase for a simple backend with auth, database, and hosting.' },
        { name: 'Vue.js + Supabase', difficulty: 'intermediate', projectType: 'webapp', features: ['ui-focus', 'auth', 'database', 'deployment', 'mobile'], description: 'A great alternative to the React/Firebase stack. Vue is known for its gentle learning curve, and Supabase is a powerful open-source Firebase alternative.' },
        { name: 'SvelteKit', difficulty: 'intermediate', projectType: 'webapp', features: ['ui-focus', 'deployment', 'mobile', '2d-animation'], description: 'A newer framework that builds fast, modern web apps. It shifts work to build time, resulting in highly performant sites.' },
        { name: 'Next.js + Vercel', difficulty: 'intermediate', projectType: 'website', features: ['deployment', 'ui-focus', 'mobile'], description: 'A production-grade React framework that makes building static and server-rendered sites a joy. Vercel provides seamless deployment.' },
        { name: 'Three.js', difficulty: 'intermediate', projectType: 'webapp', features: ['3d-render', '3d-animation'], description: 'A powerful 3D graphics library for creating and displaying animated 3D computer graphics in a web browser.'},

        // Expert
        { name: 'T3 Stack (Next.js, TypeScript, tRPC)', difficulty: 'expert', projectType: 'webapp', features: ['auth', 'database', 'ui-focus', 'deployment', 'mobile'], description: 'A modern, typesafe stack for building robust web applications. Opinionated but very powerful.' },
        { name: 'Ruby on Rails', difficulty: 'expert', projectType: 'webapp', features: ['auth', 'database'], description: 'A time-tested, full-stack framework that values convention over configuration. Great for rapid development of complex apps.' },
        { name: 'Tauri', difficulty: 'expert', projectType: 'desktop', features: ['ui-focus'], description: 'Build smaller, faster, and more secure desktop applications with a web frontend. Uses Rust for the backend.' },
        { name: 'Electron', difficulty: 'expert', projectType: 'desktop', features: ['ui-focus'], description: 'Build cross-platform desktop apps with JavaScript, HTML, and CSS. More established than Tauri, but can result in larger app sizes.' },
        { name: 'Unity or Unreal Engine', difficulty: 'expert', projectType: 'desktop', features: ['2d-render', '3d-render', '2d-animation', '3d-animation'], description: 'Industry-standard game engines for creating high-end 2D and 3D games and interactive experiences.'}
    ];

    function renderQuestion() {
        const questionData = quizData[currentQuestionIndex];
        quizForm.innerHTML = `
            <fieldset class="glass-panel" style="border: none; padding: 20px;">
                <legend style="font-size: 1.5em; font-weight: 600; color: var(--theme-text); margin-bottom: 20px;">${questionData.question}</legend>
                <div class="options-container">
                    ${questionData.options.map(option => `
                        <div class="option-card glass-button" data-value="${option.value}">
                            <input type="${questionData.type}" name="${questionData.id}" value="${option.value}" id="${option.value}" style="display:none;">
                            <label for="${option.value}" style="display: block; width: 100%; cursor: pointer;">
                                <strong style="font-size: 1.1em;">${option.text}</strong>
                                ${option.description ? `<p style="font-size: 0.9em; margin-top: 5px; color: var(--theme-text-secondary);">${option.description}</p>` : ''}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </fieldset>
        `;
        updateProgress();
        updateButtonVisibility();
        restoreSelections();
    }

    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / (quizData.length + 1)) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    function updateButtonVisibility() {
        prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
        nextBtn.textContent = currentQuestionIndex === quizData.length - 1 ? 'Get Recommendation' : 'Next';
    }

    function saveSelection() {
        const questionData = quizData[currentQuestionIndex];
        const inputs = quizForm.querySelectorAll(`input[name="${questionData.id}"]:checked`);
        if (inputs.length > 0) {
            userSelections[questionData.id] = Array.from(inputs).map(input => input.value);
        }
    }
    
    function restoreSelections() {
        const questionData = quizData[currentQuestionIndex];
        const selections = userSelections[questionData.id];
        if (selections) {
            selections.forEach(value => {
                const correspondingCard = quizForm.querySelector(`.option-card[data-value="${value}"]`);
                if (correspondingCard) {
                    correspondingCard.classList.add('primary');
                    correspondingCard.querySelector('input').checked = true;
                }
            });
        }
    }
    
    function showResults() {
        const { difficulty, projectType, features, visuals } = userSelections;
        
        const recommendations = toolDatabase.filter(tool => {
            const difficultyMatch = !difficulty || difficulty.includes(tool.difficulty);
            const projectTypeMatch = !projectType || projectType.includes(tool.projectType);
            
            // Combine features and visuals for matching
            const selectedFeatures = [...(features || []), ...(visuals || [])];
            const featuresMatch = !selectedFeatures.length || selectedFeatures.every(feature => tool.features.includes(feature));

            return difficultyMatch && projectTypeMatch && featuresMatch;
        });

        quizForm.innerHTML = `
            <div class="glass-panel" style="border: none; padding: 20px;">
                <h2 style="text-align: center; color: var(--theme-accent);">Your Recommended Stack</h2>
                ${recommendations.length > 0 ? recommendations.map(tool => `
                    <div class="glass-card" style="margin-top: 20px;">
                        <h3>${tool.name}</h3>
                        <p>${tool.description}</p>
                    </div>
                `).join('') : `<p style="text-align: center;">No specific tool matched all your criteria, but a good starting point for a ${difficulty} ${projectType} project would be to explore general-purpose frameworks!</p>`}
            </div>
        `;
        
        nextBtn.style.display = 'none';
        prevBtn.textContent = 'Start Over';
        prevBtn.onclick = () => location.reload();
        updateProgress();
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        saveSelection();
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            // Final step - get recommendation
            if (userSelections.difficulty && userSelections.difficulty.includes('expert')) {
                modalBackdrop.style.display = 'block';
                expertModal.style.display = 'block';
            } else {
                showResults();
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            saveSelection();
            currentQuestionIndex--;
            renderQuestion();
        }
    });
    
    quizForm.addEventListener('click', (e) => {
        const card = e.target.closest('.option-card');
        if (!card) return;

        const input = card.querySelector('input');
        if (input.type === 'radio') {
            // Deselect all other radio cards
            card.closest('.options-container').querySelectorAll('.option-card').forEach(c => c.classList.remove('primary'));
            // Select this one
            input.checked = true;
            card.classList.add('primary');
        } else {
            // Toggle checkbox cards
            input.checked = !input.checked;
            card.classList.toggle('primary', input.checked);
        }
    });

    closeModalBtn.addEventListener('click', () => {
        modalBackdrop.style.display = 'none';
        expertModal.style.display = 'none';
        showResults();
    });

    // Initial render
    renderQuestion();
});
</script>
