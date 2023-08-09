const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require("electron-reload")(__dirname)

app.commandLine.appendSwitch('disable-http-cache');
app.setPath('userData', path.join(app.getPath('appData'), 'relogio-farm'));

if (require('electron-squirrel-startup')) {
  app.quit();
}


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    maxHeight: 100, minHeight: 100,
    maxWidth: 100, minWidth: 100,
    
    // width: 1200,
    // height: 800,
    // maxHeight: 800, minHeight: 800,
    // maxWidth: 1200, minWidth: 1200,

    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    transparent: true,
    alwaysOnTop: true,
  });
  
  mainWindow.webContents.openDevTools({ mode: 'detach' });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

ipcMain.on("close-app", () => {
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});