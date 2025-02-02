
// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');
const createAppMenu = require('./src/menu.js')

const createWindow = () => {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './src/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    win.webContents.on('context-menu', (event) => {
        const menu = Menu.buildFromTemplate([
            { label: 'Menu Item 1', click: () => console.log('Item 1 clicked') },
            { type: 'separator' },
            { label: 'Menu Item 2'},
        ]);
        menu.popup({ window: win });
    });

    // and loading the index.html of the app.
    win.loadFile('./public/index.html');

    // Displaying renderer page on to the desktop when user "Right-Click" the window
    // ipcMain.on('context-menu', (event) => {
    //     const template = [
    //         {
    //             label: 'Menu Item 1',
    //             click: () => {
    //                 event.sender.send('context-menu-command', 'menu-item-1');
    //             },
    //         },
    //         { type: 'separator' },
    //         { label: 'Menu Item 2', type: 'checkbox', checked: true },
    //     ];
    //     const menu = Menu.buildFromTemplate(template);
    //     menu.popup({
    //         window: BrowserWindow.fromWebContents(event.sender), // Show on the active window
    //     });
    // });

    // Removing Default Menu given from Electron
    win.setMenu(null);

    // Displaying custom menu
    createAppMenu();


    // Open the DevTools.
    mainWindow.webContents.openDevTools()
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length() === 0) createWindow();
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});