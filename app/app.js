const { app,ipcMain } = require("electron");
global.isDev = require("electron-is-dev");

var TopMenu = require("./utils/topMenu.js");
var Cookies = require("./utils/cookies.js");
var AdsBlock = require("./utils/adsBlock.js");
var Settings = require("./utils/settings.js");

var MainWindow = require("./main/windows/mainWindow.js");

class App {
	constructor() {
		app.on("ready", async () => {
			this.menu = new TopMenu()
			this.cookies = new Cookies()
			this.adsBlock = new AdsBlock()
			this.settings = new Settings()
			this.initEvent()
			
			this.window = new MainWindow()
			
			// if (isDev) this.window.webContents.openDevTools();
		})
	}

	initEvent() {
		app.on("window-all-closed", () => {
			app.quit();
		});

		app.on("before-quit", () => {
			this.window.clearCache();
		});
	}
}


global.app = new App();