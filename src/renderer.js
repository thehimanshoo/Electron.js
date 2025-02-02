const { ipcRenderer } = require('electron');

// This will executes when users "Right-Click" the window
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    ipcRenderer.send('show-context-menu');
})

ipcRenderer.on('context-menu-command', (e, command) => {
    document.write("Renderer is executed!!");
});

window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    window.electronAPI.showContextMenu();
});
