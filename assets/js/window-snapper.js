// Window Snapper System
class WindowSnapper {
    constructor() {
        this.snapZones = [];
        this.snapGuides = [];
        this.isSnapping = false;
        this.snapThreshold = 50; // pixels from edge to trigger snap
        this.init();
    }

    init() {
        this.createSnapZones();
        this.createSnapGuides();
        this.attachToWindowManager();
    }

    createSnapZones() {
        // Define snap zones: left, right, top, bottom, corners
        this.snapZones = [
            { name: 'left', x: 0, y: 0, width: this.snapThreshold, height: window.innerHeight },
            { name: 'right', x: window.innerWidth - this.snapThreshold, y: 0, width: this.snapThreshold, height: window.innerHeight },
            { name: 'top', x: 0, y: 0, width: window.innerWidth, height: this.snapThreshold },
            { name: 'bottom', x: 0, y: window.innerHeight - this.snapThreshold, width: window.innerWidth, height: this.snapThreshold },
            { name: 'top-left', x: 0, y: 0, width: this.snapThreshold, height: this.snapThreshold },
            { name: 'top-right', x: window.innerWidth - this.snapThreshold, y: 0, width: this.snapThreshold, height: this.snapThreshold },
            { name: 'bottom-left', x: 0, y: window.innerHeight - this.snapThreshold, width: this.snapThreshold, height: this.snapThreshold },
            { name: 'bottom-right', x: window.innerWidth - this.snapThreshold, y: window.innerHeight - this.snapThreshold, width: this.snapThreshold, height: this.snapThreshold }
        ];
    }

    createSnapGuides() {
        // Add CSS for snap guides
        this.addSnapGuideStyles();
        
        // Create visual snap guides
        const guides = [
            { id: 'snap-left', class: 'snap-guide snap-left' },
            { id: 'snap-right', class: 'snap-guide snap-right' },
            { id: 'snap-top', class: 'snap-guide snap-top' },
            { id: 'snap-bottom', class: 'snap-guide snap-bottom' }
        ];

        guides.forEach(guide => {
            const element = document.createElement('div');
            element.id = guide.id;
            element.className = guide.class;
            document.body.appendChild(element);
            this.snapGuides.push(element);
        });
    }

    addSnapGuideStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .snap-guide {
                position: fixed;
                z-index: 99998;
                background: var(--theme-accent);
                opacity: 0;
                transition: opacity 0.2s ease;
                pointer-events: none;
                box-shadow: 0 0 10px var(--theme-accent);
            }
            
            .snap-left {
                left: 0;
                top: 0;
                width: 4px;
                height: 100vh;
            }
            
            .snap-right {
                right: 0;
                top: 0;
                width: 4px;
                height: 100vh;
            }
            
            .snap-top {
                top: 0;
                left: 0;
                width: 100vw;
                height: 4px;
            }
            
            .snap-bottom {
                bottom: 0;
                left: 0;
                width: 100vw;
                height: 4px;
            }
            
            .snap-guide.active {
                opacity: 0.8;
            }
            
            .window-snapping {
                transition: all 0.3s ease !important;
            }
        `;
        document.head.appendChild(style);
    }

    attachToWindowManager() {
        // Override window manager's drag functionality
        if (window.windowManager) {
            const originalMakeDraggable = window.windowManager.makeDraggable;
            window.windowManager.makeDraggable = (windowElement) => {
                this.makeWindowSnappable(windowElement);
                if (originalMakeDraggable) {
                    originalMakeDraggable(windowElement);
                }
            };
        }
    }

    makeWindowSnappable(windowElement) {
        const header = windowElement.querySelector('.window-header');
        if (!header) return;

        let isDragging = false;
        let startX, startY, startLeft, startTop;

        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('close') || e.target.classList.contains('minimize') || e.target.classList.contains('maximize')) {
                return;
            }

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(windowElement.style.left) || 0;
            startTop = parseInt(windowElement.style.top) || 0;

            windowElement.classList.add('window-snapping');
            this.showSnapGuides();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            windowElement.style.left = (startLeft + deltaX) + 'px';
            windowElement.style.top = (startTop + deltaY) + 'px';

            this.checkSnapZones(windowElement, e.clientX, e.clientY);
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                windowElement.classList.remove('window-snapping');
                this.hideSnapGuides();
                this.snapWindow(windowElement);
            }
        });
    }

    checkSnapZones(windowElement, mouseX, mouseY) {
        let closestZone = null;
        let closestDistance = Infinity;

        this.snapZones.forEach(zone => {
            const distance = this.getDistanceToZone(mouseX, mouseY, zone);
            if (distance < closestDistance && distance < this.snapThreshold) {
                closestDistance = distance;
                closestZone = zone;
            }
        });

        this.highlightSnapZone(closestZone);
    }

    getDistanceToZone(mouseX, mouseY, zone) {
        const zoneCenterX = zone.x + zone.width / 2;
        const zoneCenterY = zone.y + zone.height / 2;
        return Math.sqrt((mouseX - zoneCenterX) ** 2 + (mouseY - zoneCenterY) ** 2);
    }

    highlightSnapZone(zone) {
        this.snapGuides.forEach(guide => guide.classList.remove('active'));
        
        if (zone) {
            const guide = document.getElementById(`snap-${zone.name}`);
            if (guide) {
                guide.classList.add('active');
            }
        }
    }

    snapWindow(windowElement) {
        const windowRect = windowElement.getBoundingClientRect();
        const centerX = windowRect.left + windowRect.width / 2;
        const centerY = windowRect.top + windowRect.height / 2;

        let closestZone = null;
        let closestDistance = Infinity;

        this.snapZones.forEach(zone => {
            const distance = this.getDistanceToZone(centerX, centerY, zone);
            if (distance < closestDistance && distance < this.snapThreshold) {
                closestDistance = distance;
                closestZone = zone;
            }
        });

        if (closestZone) {
            this.applySnap(windowElement, closestZone);
        }
    }

    applySnap(windowElement, zone) {
        switch (zone.name) {
            case 'left':
                windowElement.style.left = '0px';
                windowElement.style.top = '0px';
                windowElement.style.width = '50vw';
                windowElement.style.height = '100vh';
                break;
            case 'right':
                windowElement.style.left = '50vw';
                windowElement.style.top = '0px';
                windowElement.style.width = '50vw';
                windowElement.style.height = '100vh';
                break;
            case 'top':
                windowElement.style.left = '0px';
                windowElement.style.top = '0px';
                windowElement.style.width = '100vw';
                windowElement.style.height = '50vh';
                break;
            case 'bottom':
                windowElement.style.left = '0px';
                windowElement.style.top = '50vh';
                windowElement.style.width = '100vw';
                windowElement.style.height = '50vh';
                break;
            case 'top-left':
                windowElement.style.left = '0px';
                windowElement.style.top = '0px';
                windowElement.style.width = '50vw';
                windowElement.style.height = '50vh';
                break;
            case 'top-right':
                windowElement.style.left = '50vw';
                windowElement.style.top = '0px';
                windowElement.style.width = '50vw';
                windowElement.style.height = '50vh';
                break;
            case 'bottom-left':
                windowElement.style.left = '0px';
                windowElement.style.top = '50vh';
                windowElement.style.width = '50vw';
                windowElement.style.height = '50vh';
                break;
            case 'bottom-right':
                windowElement.style.left = '50vw';
                windowElement.style.top = '50vh';
                windowElement.style.width = '50vw';
                windowElement.style.height = '50vh';
                break;
        }
    }

    showSnapGuides() {
        this.snapGuides.forEach(guide => {
            guide.style.opacity = '0.3';
        });
    }

    hideSnapGuides() {
        this.snapGuides.forEach(guide => {
            guide.style.opacity = '0';
        });
    }
}

// Initialize window snapper
document.addEventListener('DOMContentLoaded', () => {
    window.windowSnapper = new WindowSnapper();
    console.log('🔲 Window Snapper loaded! Drag windows to edges to snap them!');
}); 