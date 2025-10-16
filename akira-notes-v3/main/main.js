const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow(){
  const win = new BrowserWindow({
    width: 1200, height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  if (isDev) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile(path.join(__dirname,'..','renderer','build','index.html'));
  }
}

app.whenReady().then(()=> {
  createWindow();
  app.on('activate', ()=> {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', ()=> {
  if (process.platform !== 'darwin') app.quit();
});

// No native menu needed because app uses an in-app toolbar.
// However keep a minimal menu for shortcuts on macOS.
const template = [
  { role: 'appMenu' },
  { role: 'fileMenu' },
  { role: 'editMenu' },
  { role: 'viewMenu' },
  { role: 'windowMenu' },
  { role: 'help', submenu: [
    { label: 'GitHub Repo', click: ()=> require('electron').shell.openExternal('https://github.com/libreakira-580') }
  ]}
].filter(Boolean);
Menu.setApplicationMenu(Menu.buildFromTemplate(template));

// IPC handlers (see main/ipc.js)
require('./ipc');
