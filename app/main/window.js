const { BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const { Events } = require("./event.js");

var navigationUrl = "https://www.youtube.com/";
exports.Window = {
	init: function () {
		global.mainWindow = new BrowserWindow({
			width: 1600,
			height: 900,
			frame: false,
			backgroundColor: "#272727",
			titleBarStyle: "hidden",
			show: false,
			webPreferences: {
				nodeIntegration: true,
				disableHtmlFullscreenWindowResize: true,
				preload: path.join(__dirname, "../renderer/build/index.js")
			}
		});
		global.mainWindow.loadURL(navigationUrl);
		if (isDev) {
			global.mainWindow.webContents.openDevTools();
		}
		Events.initWindow();
	},
	showMainWindow: function () {
		global.mainWindow.show();
	}
};
