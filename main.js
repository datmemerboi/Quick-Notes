const electron = require('electron'),
			app = electron.app,
			BrowserWindow = electron.BrowserWindow,
			Menu = electron.Menu,
			child = require('child_process');

var mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		resizable: false,
		webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.loadFile('index.html');
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', () => {
	let template = [
		{
			label: "Menu",
			submenu: [
				{
					label: "Refresh",
					role: "reload",
					accelerator: "F5"
				},
				{ type: "separator" },
				{
					label: "Inspect",
					click: () => {
						mainWindow.webContents.openDevTools()
					},
					accelerator: "F12"
				}
			]
		},
		{
			label: "Export"
		},
		// {
		// 	label: "Backup",
		// 	submenu: [
		// 		{
		// 			label: "Export Now",
		// 			click: () => {
		// 				child.exec("node src/createBackup.js", (err, stdout)=>{
		// 					if(err){throw err;}
		// 				});
		// 				}
		// 		},
		// 		{
		// 			type: "separator"
		// 		},
		// 		{
		// 			label: "View Backup files",
		// 			click: () => {
		// 				electron.shell.showItemInFolder("./backup/ ");
		// 			}
		// 		}
		// 	]
		// },
		{
			label: "About",
			submenu: [
				{
					label: "datmemerboi",
					click: () => {
						electron.shell.openExternal("https://datmemerboi.github.io/")
					}
				},
				{ type: "separator" },
				{
					label: "Github Repo",
					click: () => {
						electron.shell.openExternal("https://www.github.com/datmemerboi/Quick-Notes/");
					}
				}
			]
		},
		{
			label: "Quit",
			role: "quit"
		}
	];

	menuBar = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menuBar)

	createWindow();
});

app.on('activate', () => {
	if(mainWindow === null) { createWindow(); }
});

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
