const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");

var Cinema = require("../components/cinema.js")

class MainWindow extends BrowserWindow{
	constructor() {
		super({
			width: 1600,
			height: 900,
			frame: false,
			backgroundColor: "#272727",
			titleBarStyle: "hidden",
			show:false,
			webPreferences: {
				nodeIntegration: true,
				disableHtmlFullscreenWindowResize: true,
				preload: path.join(__dirname, "../../assets/build/index.js")
			}
		})
		this.loadURL("https://www.youtube.com/");
		this.initEvents();
		this.cinema = new Cinema(this)
	}

	initEvents() {
		ipcMain.on('mainWindow-ready', (e, data) => {
			this.show()
		})
	}

	clearCache() {
		this.webContents.session.clearCache(() => {});
	}
}

module.exports = MainWindow