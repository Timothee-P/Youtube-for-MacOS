const { BrowserWindow } = require("electron");
const path = require("path");

const { Events } = require("./event.js");

exports.Window = {
	init: function() {
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
		global.mainWindow.loadURL(`https://www.youtube.com/`);
		Events.initWindow();
	},
	showYT: function() {
		global.mainWindow.show();
	},
	offline: function() {
		global.mainWindow.loadURL(path.join(__dirname, "../template/offline.html"));
	}
};
