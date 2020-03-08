const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const child = require('child_process')

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width:1920, height:1080,
		resizable:false, icon:"./favicon.png",
		webPreferences:{ nodeIntegration:true }
	});
	mainWindow.loadFile('index.html');
	mainWindow.on('closed', ()=>{
		mainWindow = null;
	});
}

app.on('ready', ()=>{
	var template = [
		{
			label:"Menu",
			submenu:[
				{
					label:"Refresh",
					role:"reload"
				}
			]
		},
		{
			label:"Backup",
			submenu:[
				{
					label:"Export Now",
					click:()=>{
						child.exec("node src/createBackup.js", (err, stdout)=>{
							if(err){throw err;}
						});
						}
				},{
					type:"separator"
				},
				{
					label:"View Backup files",
					click:()=>{
						electron.shell.showItemInFolder("./backup/ ");
					}
				}
			]
		},
		{
			label:"Github",
			click:()=>{
				electron.shell.openExternal("https://github.com/datmemerboi/");
			}
		},
		{
			label:"Inspect",
			click:()=>{mainWindow.webContents.openDevTools()},
			accelerator:"CmdOrCtrl+Shift+I"
		},
		{
			label:"Quit",
			role:"quit"
		}
	]
	menuBar = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menuBar)
	createWindow();
});
app.on('activate', ()=>{
	if(mainWindow==null)
		createWindow();
});
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
