const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
require("electron-reload")(__dirname)

app.commandLine.appendSwitch('disable-http-cache')
app.setPath('userData', path.join(app.getPath('appData'), 'relogio-farm'))

if (require('electron-squirrel-startup')) {
  app.quit()
}


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 180,
    maxWidth: 180, minWidth: 180,
    height: 230,
    maxHeight: 230, minHeight: 230,

    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    transparent: true,
    alwaysOnTop: true,
  })
  
  mainWindow.webContents.openDevTools({ mode: 'detach' })
  mainWindow.loadFile(path.join(__dirname, 'index.html'))
}

ipcMain.on("close-app", () => {
  app.quit()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})