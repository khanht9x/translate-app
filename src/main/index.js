import { app, BrowserWindow, dialog } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 650,
    useContentSize: true,
    width: 1200,
    webPreferences: {
      nodeIntegration: true,
    },   
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

import { autoUpdater } from 'electron-updater'

autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  console.log('update-downloaded lats quitAndInstall');

  if (process.env.NODE_ENV === 'production') { 
    dialog.showMessageBox({
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        const isSilent = true;
        const isForceRunAfter = true; 
        autoUpdater.quitAndInstall(isSilent, isForceRunAfter); 
      } 
      else {
        updater.enabled = true
        updater = null
      }
    })
  }
  
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') { autoUpdater.checkForUpdates() }
  // autoUpdater.checkForUpdates();
  createWindow();
})
