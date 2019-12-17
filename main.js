const {app, BrowserWindow, ipcMain} = require('electron');
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width:1920,
    height:1080,
    resizable:false,
    webPreferences:{ nodeIntegration:true }
  });
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', ()=>{
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('activate', ()=>{
  if(mainWindow==null)
    createWindow();
});
