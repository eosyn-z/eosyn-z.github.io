document.addEventListener('DOMContentLoaded', () => {

    class DesktopManager {
        constructor(grid) {
            this.grid = grid;
            if (!this.grid) {
                console.error("Desktop grid container not found!");
                return;
            }
            this.icons = Array.from(this.grid.children);
        }

        init() {
            this.loadIconPositions();
            this.icons.forEach(icon => {
                this.makeDraggable(icon);
                // The openApp function is in the global scope from desktop.js
                icon.onclick = () => window.openApp(icon.id, icon.dataset.appUrl, icon.dataset.appTitle);
            });
        }

        loadIconPositions() {
            try {
                const positions = JSON.parse(localStorage.getItem('desktopIconPositions'));
                if (positions) {
                    this.icons.forEach(icon => {
                        if (positions[icon.id]) {
                            icon.style.top = positions[icon.id].top;
                            icon.style.left = positions[icon.id].left;
                        }
                    });
                }
            } catch (e) {
                console.error("Could not load icon positions:", e);
            }
        }

        saveIconPositions() {
            const positions = {};
            this.icons.forEach(icon => {
                positions[icon.id] = { top: icon.style.top, left: icon.style.left };
            });
            localStorage.setItem('desktopIconPositions', JSON.stringify(positions));
        }
        
        makeDraggable(icon) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            icon.onmousedown = (e) => {
                // prevent default action for middle-mouse-click
                if (e.button === 1) {
                    e.preventDefault();
                }
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            };

            const elementDrag = (e) => {
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                icon.style.top = (icon.offsetTop - pos2) + "px";
                icon.style.left = (icon.offsetLeft - pos1) + "px";
            };

            const closeDragElement = () => {
                this.saveIconPositions();
                document.onmouseup = null;
                document.onmousemove = null;
            };
        }
    }

    const desktopGrid = document.getElementById('desktop-grid');
    if (desktopGrid) {
        window.newDesktopManager = new DesktopManager(desktopGrid);
        // The main desktop.js will call this init function
    }
}); 