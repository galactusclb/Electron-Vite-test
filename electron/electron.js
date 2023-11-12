const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = process.env.IS_DEV == "true" ? true : false;
const isMac = process.platform === "darwin"

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 650,
        resizable: true,
        // movable: false,
        backgroundColor: "#2e2c29",
        autoHideMenuBar: true,
        maximizable: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    mainWindow.maximize()

    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: "deny" };
    });


    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            // ? "https://app.kominike.io/login"
            : `file://${path.join(__dirname, '../dist/index.html')}`
    );
    // Open the DevTools.
    // if (isDev) { 
    mainWindow.webContents.openDevTools();
    // }

}


app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});