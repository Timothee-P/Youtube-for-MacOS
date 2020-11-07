const { BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const { Events } = require("./event.js");

var navigationUrl = "https://www.youtube.com/";
var window = {
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
		window.initEvent();
	},

	initEvent: function () {
		global.mainWindow.webContents.on("enter-html-full-screen", function (e) {
			if (!global.mainWindow.isFullScreen()) {
				global.mainWindow.setWindowButtonVisibility(true);
			} else {
				global.mainWindow.setWindowButtonVisibility(false);
			}
			global.mainWindow.setFullScreen(!global.mainWindow.isFullScreen());
		});
	},

	showMainWindow: function () {
		global.mainWindow.show();
	}
};

exports.Window = window