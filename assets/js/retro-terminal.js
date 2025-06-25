// Retro Terminal System
class RetroTerminal {
    constructor() {
        this.terminal = null;
        this.output = null;
        this.input = null;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentPath = '~';
        this.commands = {
            help: this.showHelp.bind(this),
            theme: this.changeTheme.bind(this),
            pet: this.openPet.bind(this),
            fortune: this.showFortune.bind(this),
            launch: this.launchApp.bind(this),
            clear: this.clearTerminal.bind(this),
            date: this.showDate.bind(this),
            whoami: this.showUser.bind(this),
            ls: this.listFiles.bind(this),
            pwd: this.showPath.bind(this),
            cd: this.changeDirectory.bind(this),
            echo: this.echo.bind(this),
            neofetch: this.showNeofetch.bind(this),
            matrix: this.matrixEffect.bind(this),
            rainbow: this.rainbowText.bind(this),
            note: this.createNote.bind(this),
            pages: this.listPages.bind(this),
            secret: this.secretEasterEgg.bind(this),
            music: this.toggleMusicBar.bind(this)
        };
        
        this.init();
    }

    init() {
        // Create terminal window
        this.terminal = document.createElement('div');
        this.terminal.id = 'retro-terminal';
        this.terminal.className = 'retro-terminal-window glass-effect app-window';
        this.terminal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 400px;
            background: var(--glass-bg, rgba(255,255,255,0.15));
            border: 1px solid var(--glass-border, rgba(255,255,255,0.2));
            border-radius: var(--glass-border-radius, 18px);
            box-shadow: var(--glass-box-shadow, 0 8px 32px rgba(0,0,0,0.2));
            backdrop-filter: var(--glass-backdrop-filter, blur(18px) saturate(140%));
            -webkit-backdrop-filter: var(--glass-webkit-backdrop-filter, blur(18px) saturate(140%));
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: #00ff00;
            z-index: 99999;
            display: none;
            flex-direction: column;
            overflow: hidden;
        `;

        // Restore position from localStorage
        this.restorePosition();

        // Terminal header
        const header = document.createElement('div');
        header.style.cssText = `
            background: var(--glass-bg-medium, rgba(255,255,255,0.15));
            color: var(--theme-text, #00ff00);
            padding: 8px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
            border-bottom: 1px solid var(--glass-border-light, rgba(255,255,255,0.2));
            backdrop-filter: var(--glass-blur-medium, blur(10px));
        `;
        header.innerHTML = `
            <span>🖥️ Retro Terminal v1.0</span>
            <button id="terminal-close" style="background: none; border: none; color: var(--theme-text, #00ff00); cursor: pointer; font-size: 16px;">×</button>
        `;

        // Terminal output area
        this.output = document.createElement('div');
        this.output.style.cssText = `
            flex: 1;
            padding: 10px;
            overflow-y: auto;
            background: transparent;
            border-bottom: 1px solid var(--glass-border-light, rgba(255,255,255,0.2));
        `;

        // Terminal input area
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `
            padding: 10px;
            display: flex;
            align-items: center;
            background: transparent;
        `;

        const prompt = document.createElement('span');
        prompt.textContent = 'user@desktop:~$ ';
        prompt.style.cssText = `
            color: #00ff00;
            margin-right: 8px;
        `;

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.style.cssText = `
            background: transparent;
            border: none;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            outline: none;
            flex: 1;
        `;
        this.input.placeholder = 'Type a command...';

        inputContainer.appendChild(prompt);
        inputContainer.appendChild(this.input);

        this.terminal.appendChild(header);
        this.terminal.appendChild(this.output);
        this.terminal.appendChild(inputContainer);

        document.body.appendChild(this.terminal);

        // Event listeners
        this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.getElementById('terminal-close').addEventListener('click', this.close.bind(this));
        
        // Make terminal draggable
        this.makeDraggable(header);

        // Welcome message
        this.print('Retro Terminal v1.0 - Type "help" for commands');
        this.print('');
    }

    makeDraggable(header) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            initialX = e.clientX - this.terminal.offsetLeft;
            initialY = e.clientY - this.terminal.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                this.terminal.style.left = currentX + 'px';
                this.terminal.style.top = currentY + 'px';
                this.terminal.style.transform = 'none';
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                this.savePosition();
            }
            isDragging = false;
        });
    }

    savePosition() {
        const left = this.terminal.style.left;
        const top = this.terminal.style.top;
        localStorage.setItem('retroTerminalPosition', `${left},${top}`);
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim();
            if (command) {
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
            }
            this.input.value = '';
            this.print(`user@desktop:${this.currentPath}$ ${command}`);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        }
    }

    executeCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.print(`Command not found: ${cmd}. Type "help" for available commands.`);
        }
    }

    print(text) {
        const line = document.createElement('div');
        line.textContent = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    // Command implementations
    showHelp() {
        this.print('Available commands:');
        this.print('  help     - Show this help message');
        this.print('  theme    - Change theme (alice, celestial, rainbow, etc.)');
        this.print('  pet      - Open the web pet');
        this.print('  fortune  - Show a random fortune');
        this.print('  launch   - Launch an app (games, paint, etc.)');
        this.print('  clear    - Clear terminal');
        this.print('  date     - Show current date/time');
        this.print('  whoami   - Show current user');
        this.print('  ls       - List files');
        this.print('  pwd      - Show current path');
        this.print('  echo     - Echo text');
        this.print('  neofetch - Show system info');
        this.print('  matrix   - Matrix effect');
        this.print('  rainbow  - Rainbow text effect');
        this.print('  note     - Create a sticky note');
        this.print('  pages    - List all available pages');
        this.print('  secret   - 🎉 Easter egg!');
        this.print('  music    - Toggle music bar (show|hide|toggle|default true|false)');
    }

    changeTheme(args) {
        const theme = args[0] || 'celestial';
        const themes = ['alice', 'celestial', 'rainbow', 'zen', 'elegant', 'neon', 'custom'];
        
        if (themes.includes(theme)) {
            document.body.setAttribute('data-theme', theme);
            this.print(`Theme changed to: ${theme}`);
        } else {
            this.print(`Available themes: ${themes.join(', ')}`);
        }
    }

    openPet() {
        if (window.windowManager) {
            window.windowManager.createPetWindow();
            this.print('Web pet opened! 🐾');
        } else {
            this.print('Pet system not available');
        }
    }

    showFortune() {
        const fortunes = [
            "A beautiful, smart, and loving person will be coming into your life.",
            "A dubious friend may be an enemy in camouflage.",
            "A faithful friend is a strong defense.",
            "A fresh start will put you on your way.",
            "A golden egg of opportunity falls into your lap this month.",
            "A lifetime friend shall soon be made.",
            "A light heart carries you through all the hard times.",
            "A new perspective will come with the new year.",
            "A pleasant surprise is waiting for you.",
            "Adventure can be real happiness.",
            "All your hard work will soon pay off.",
            "An important person will offer you support.",
            "Any day above ground is a good day.",
            "Be careful or you could fall for some tricks today.",
            "Believe in yourself and others will too.",
            "Change is happening in your life, so go with the flow!",
            "Do not make extra work for yourself.",
            "Don't just spend time. Invest it.",
            "Don't just think, act!",
            "Don't worry; prosperity will knock on your door soon."
        ];
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        this.print(`🎭 Fortune: ${fortune}`);
    }

    launchApp(args) {
        const app = args[0] || 'games';
        
        // First check predefined apps
        const apps = {
            'games': '/games/',
            'paint': '/paint/',
            'chat': '/chat/',
            'search': '/search/',
            'desktop': '/desktop/',
            'sticky': '/sticky-notes/',
            'home': '/',
            'about': '/about/',
            'contact': '/contact/',
            'blog': '/blog/',
            'projects': '/projects/'
        };
        
        if (apps[app]) {
            window.location.href = apps[app];
            this.print(`Launching ${app}...`);
        } else {
            // Try to navigate to any page by name
            const pageName = app.toLowerCase();
            const possiblePaths = [
                `/${pageName}/`,
                `/${pageName}`,
                `/sitepages/${pageName}/`,
                `/sitepages/${pageName}.md`
            ];
            
            // For now, let's try the most common pattern
            const targetPath = `/${pageName}/`;
            this.print(`Attempting to navigate to: ${targetPath}`);
            
            // Use a small delay to show the message before navigating
            setTimeout(() => {
                window.location.href = targetPath;
            }, 500);
        }
    }

    clearTerminal() {
        this.output.innerHTML = '';
        this.print('Retro Terminal v1.0 - Type "help" for commands');
        this.print('');
    }

    showDate() {
        const now = new Date();
        this.print(`📅 ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
    }

    showUser() {
        this.print('👤 user@desktop');
    }

    listFiles() {
        this.print('📁 Desktop/');
        this.print('📁 Documents/');
        this.print('📁 Downloads/');
        this.print('📁 Pictures/');
        this.print('📁 Music/');
        this.print('📁 Games/');
    }

    showPath() {
        this.print(`📍 ${this.currentPath}`);
    }

    changeDirectory(args) {
        const dir = args[0] || '~';
        this.currentPath = dir;
        this.print(`Changed directory to: ${dir}`);
    }

    echo(args) {
        this.print(args.join(' '));
    }

    showNeofetch() {
        this.print('╭─────────────────────────────────────────────────────────╮');
        this.print('│                    System Info                         │');
        this.print('├─────────────────────────────────────────────────────────┤');
        this.print('│ OS: Web Desktop Environment v2.0                       │');
        this.print('│ Kernel: JavaScript 2024                                │');
        this.print('│ Shell: Retro Terminal v1.0                             │');
        this.print('│ Theme: ' + (document.body.getAttribute('data-theme') || 'celestial').padEnd(47) + '│');
        this.print('│ Resolution: ' + window.screen.width + 'x' + window.screen.height + ' '.repeat(35) + '│');
        this.print('│ Browser: ' + navigator.userAgent.split(' ')[0].padEnd(47) + '│');
        this.print('│ Memory: Infinite (Web Magic)                           │');
        this.print('│ CPU: Imagination Engine                                 │');
        this.print('╰─────────────────────────────────────────────────────────╯');
    }

    matrixEffect() {
        this.print('🌌 Matrix effect activated...');
        this.print('Wake up, Neo...');
        this.print('The Matrix has you...');
        this.print('Follow the white rabbit...');
        this.print('Knock, knock, Neo...');
    }

    rainbowText() {
        this.print('🌈 Rainbow mode activated!');
        this.print('✨ Everything is colorful now!');
        this.print('🎨 Colors everywhere!');
    }

    createNote(args) {
        const content = args.join(' ') || 'New note from terminal';
        
        if (window.stickyNotesManager) {
            window.stickyNotesManager.createNote(content);
            this.print(`📝 Created sticky note: "${content}"`);
        } else if (window.windowManager) {
            // Fallback to window manager if sticky notes manager isn't available
            window.windowManager.createWindow('sticky-notes', '📝 Sticky Notes', window.windowManager.createStickyNotesContent());
            this.print(`📝 Opened sticky notes window`);
        } else {
            this.print('❌ Sticky notes system not available');
        }
    }

    listPages() {
        this.print('Available pages:');
        this.print('  games    - Game page');
        this.print('  paint    - Paint page');
        this.print('  chat     - Chat page');
        this.print('  search   - Search page');
        this.print('  desktop  - Desktop page');
        this.print('  sticky   - Sticky notes page');
        this.print('  home     - Home page');
        this.print('  about    - About page');
        this.print('  contact  - Contact page');
        this.print('  blog     - Blog page');
        this.print('  projects - Projects page');
    }

    secretEasterEgg() {
        this.print('🎉 You found the secret easter egg!');
        this.print('🌟 This terminal is your gateway to the web desktop!');
        this.print('💫 Try these commands:');
        this.print('   - launch games (opens the games page)');
        this.print('   - note "Hello from terminal!" (creates a sticky note)');
        this.print('   - theme rainbow (changes to rainbow theme)');
        this.print('   - fortune (get a random fortune)');
        this.print('   - neofetch (show system info)');
        this.print('🎮 The terminal and sticky notes persist across pages!');
        this.print('🚀 You can navigate anywhere and still use the terminal!');
    }

    toggleMusicBar(args) {
        const action = args[0] || 'toggle';
        
        if (window.nowPlaying) {
            switch (action.toLowerCase()) {
                case 'show':
                    window.nowPlaying.show();
                    this.print('Music bar shown!');
                    break;
                case 'hide':
                    window.nowPlaying.hide();
                    this.print('Music bar hidden!');
                    break;
                case 'toggle':
                    window.nowPlaying.toggleVisibility();
                    this.print('Music bar toggled!');
                    break;
                case 'default':
                    const setDefault = args[1] || 'true';
                    window.nowPlaying.setDefaultVisible(setDefault === 'true');
                    this.print(`Music bar default visibility set to: ${setDefault}`);
                    break;
                default:
                    this.print('Usage: music [show|hide|toggle|default true|false]');
            }
        } else {
            this.print('Music bar system not available');
        }
    }

    open() {
        this.terminal.style.display = 'flex';
        this.input.focus();
        localStorage.setItem('retroTerminalOpen', 'true');
    }

    close() {
        this.terminal.style.display = 'none';
        localStorage.setItem('retroTerminalOpen', 'false');
    }

    // Check if terminal should be restored on page load
    checkRestoreState() {
        const wasOpen = localStorage.getItem('retroTerminalOpen') === 'true';
        if (wasOpen) {
            // Small delay to ensure everything is loaded
            setTimeout(() => {
                this.open();
            }, 100);
        }
    }

    restorePosition() {
        const position = localStorage.getItem('retroTerminalPosition');
        if (position) {
            const [left, top] = position.split(',');
            this.terminal.style.left = left + 'px';
            this.terminal.style.top = top + 'px';
            this.terminal.style.transform = 'none';
        }
    }
}

// Initialize terminal
document.addEventListener('DOMContentLoaded', () => {
    window.retroTerminal = new RetroTerminal();
    
    // Add global console command
    window.openTerminal = () => {
        if (window.retroTerminal) {
            window.retroTerminal.open();
        }
    };
    
    // Check if terminal should be restored
    setTimeout(() => {
        if (window.retroTerminal) {
            window.retroTerminal.checkRestoreState();
        }
    }, 200);
    
    console.log('🖥️ Retro Terminal loaded! Use openTerminal() in console to open.');
}); 