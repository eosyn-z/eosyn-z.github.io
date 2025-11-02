const THEMES = {
    dracula: {
        name: 'Dracula',
        colors: {
            '--bg-primary': '#282a36',
            '--bg-secondary': '#44475a',
            '--bg-tertiary': '#1e1e1e',
            '--text-primary': '#f8f8f2',
            '--text-secondary': '#6272a4',
            '--accent-primary': '#bd93f9',
            '--accent-secondary': '#ff79c6',
            '--accent-tertiary': '#8be9fd',
            '--accent-success': '#50fa7b',
            '--accent-warning': '#f1fa8c',
            '--accent-error': '#ff5555',
            '--border-color': '#6272a4',
            '--header-gradient-start': '#44475a',
            '--header-gradient-end': '#6272a4'
        }
    },
    light: {
        name: 'Light',
        colors: {
            '--bg-primary': '#ffffff',
            '--bg-secondary': '#f5f5f5',
            '--bg-tertiary': '#e8e8e8',
            '--text-primary': '#2e3440',
            '--text-secondary': '#4c566a',
            '--accent-primary': '#5e81ac',
            '--accent-secondary': '#b48ead',
            '--accent-tertiary': '#88c0d0',
            '--accent-success': '#a3be8c',
            '--accent-warning': '#ebcb8b',
            '--accent-error': '#bf616a',
            '--border-color': '#d8dee9',
            '--header-gradient-start': '#e5e9f0',
            '--header-gradient-end': '#d8dee9'
        }
    },
    nord: {
        name: 'Nord',
        colors: {
            '--bg-primary': '#2e3440',
            '--bg-secondary': '#3b4252',
            '--bg-tertiary': '#2e3440',
            '--text-primary': '#eceff4',
            '--text-secondary': '#d8dee9',
            '--accent-primary': '#88c0d0',
            '--accent-secondary': '#b48ead',
            '--accent-tertiary': '#8fbcbb',
            '--accent-success': '#a3be8c',
            '--accent-warning': '#ebcb8b',
            '--accent-error': '#bf616a',
            '--border-color': '#4c566a',
            '--header-gradient-start': '#3b4252',
            '--header-gradient-end': '#4c566a'
        }
    },
    monokai: {
        name: 'Monokai',
        colors: {
            '--bg-primary': '#272822',
            '--bg-secondary': '#3e3d32',
            '--bg-tertiary': '#1e1e1b',
            '--text-primary': '#f8f8f2',
            '--text-secondary': '#75715e',
            '--accent-primary': '#ae81ff',
            '--accent-secondary': '#f92672',
            '--accent-tertiary': '#66d9ef',
            '--accent-success': '#a6e22e',
            '--accent-warning': '#e6db74',
            '--accent-error': '#f92672',
            '--border-color': '#75715e',
            '--header-gradient-start': '#3e3d32',
            '--header-gradient-end': '#75715e'
        }
    },
    alice: {
        name: 'Alice',
        colors: {
            '--bg-primary': '#fff0f9',
            '--bg-secondary': '#ffe8f5',
            '--bg-tertiary': '#ffd4e5',
            '--text-primary': '#2d1b24',
            '--text-secondary': '#5a2342',
            '--accent-primary': '#ff79c6',
            '--accent-secondary': '#d946aa',
            '--accent-tertiary': '#ffb3d9',
            '--accent-success': '#ec4899',
            '--accent-warning': '#f472b6',
            '--accent-error': '#be185d',
            '--border-color': '#ffc9e0',
            '--header-gradient-start': '#ffe8f5',
            '--header-gradient-end': '#ffc9e0'
        }
    },
    gruvbox: {
        name: 'Gruvbox Dark',
        colors: {
            '--bg-primary': '#282828',
            '--bg-secondary': '#3c3836',
            '--bg-tertiary': '#504945',
            '--text-primary': '#ebdbb2',
            '--text-secondary': '#a89984',
            '--accent-primary': '#fabd2f',
            '--accent-secondary': '#fe8019',
            '--accent-tertiary': '#83a598',
            '--accent-success': '#b8bb26',
            '--accent-warning': '#fabd2f',
            '--accent-error': '#fb4934',
            '--border-color': '#665c54',
            '--header-gradient-start': '#3c3836',
            '--header-gradient-end': '#504945'
        }
    },
    catppuccin: {
        name: 'Catppuccin Mocha',
        colors: {
            '--bg-primary': '#1e1e2e',
            '--bg-secondary': '#313244',
            '--bg-tertiary': '#45475a',
            '--text-primary': '#cdd6f4',
            '--text-secondary': '#bac2de',
            '--accent-primary': '#cba6f7',
            '--accent-secondary': '#f5c2e7',
            '--accent-tertiary': '#89dceb',
            '--accent-success': '#a6e3a1',
            '--accent-warning': '#f9e2af',
            '--accent-error': '#f38ba8',
            '--border-color': '#585b70',
            '--header-gradient-start': '#313244',
            '--header-gradient-end': '#45475a'
        }
    },
    synthwave: {
        name: 'Synthwave',
        colors: {
            '--bg-primary': '#0a0a0f',
            '--bg-secondary': '#1a1a2e',
            '--bg-tertiary': '#2d1b69',
            '--text-primary': '#f8f8f2',
            '--text-secondary': '#b8b4d0',
            '--accent-primary': '#00d9ff',
            '--accent-secondary': '#ff6ac1',
            '--accent-tertiary': '#b967ff',
            '--accent-success': '#72f1b8',
            '--accent-warning': '#ffe261',
            '--accent-error': '#ff2a6d',
            '--border-color': '#b967ff',
            '--header-gradient-start': '#1a1a2e',
            '--header-gradient-end': '#2d1b69'
        }
    }
};
function applyTheme(themeName) {
    const theme = THEMES[themeName];
    if (!theme) {
        console.warn(`Theme "${themeName}" not found, using dracula`);
        themeName = 'dracula';
    }
    const root = document.documentElement;
    const colors = THEMES[themeName].colors;
    for (const [property, value] of Object.entries(colors)) {
        root.style.setProperty(property, value);
    }
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('selectedTheme', themeName);
    const selector = document.getElementById('theme-select');
    if (selector && selector.value !== themeName) {
        selector.value = themeName;
    }
    if (themeName === 'alice' && typeof initAliceBackground === 'function') {
        setTimeout(initAliceBackground, 100);
    } else if (typeof stopAliceBackground === 'function') {
        stopAliceBackground();
    }
    return THEMES[themeName].name;
}
function getCurrentTheme() {
    const saved = localStorage.getItem('selectedTheme');
    if (saved) return saved;
    if (window.siteSettings && window.siteSettings.DEFAULT_THEME) {
        return window.siteSettings.DEFAULT_THEME;
    }
    return 'dracula';
}
function getAvailableThemes() {
    return Object.keys(THEMES);
}
function initializeTheme() {
    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);
}
window.THEMES = THEMES;
window.applyTheme = applyTheme;
window.getCurrentTheme = getCurrentTheme;
window.getAvailableThemes = getAvailableThemes;
window.initializeTheme = initializeTheme;