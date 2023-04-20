const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680,frame:false,fullscreen:true});
  mainWindow.loadURL(isDev ? `http://localhost:3000` : `file://${path.join(__dirname, '../build/index.html')}`);
  const emptyMenu = Menu.buildFromTemplate([]);
  mainWindow.setMenu(emptyMenu);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});