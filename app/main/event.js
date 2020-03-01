const { app } = require("electron");

const { Window } = require("./window.js");

Events = {
	initApp: function() {
		app.on("window-all-closed", () => {
			app.quit();
		});

		app.on("before-quit", () => {
			global.mainWindow.webContents.session.clearCache(() => {});
		});

		app.on("activate", () => {
			// if (global.mainWindow === null) {
			// 	Window.init();
			// }
		});
	},
	initWindow: function() {
		// global.mainWindow.on("closed", () => {
		// 	global.mainWindow = null;
		// });
		global.mainWindow.webContents.on("enter-html-full-screen", function(e) {
			if (!global.mainWindow.isFullScreen()) {
				global.mainWindow.setWindowButtonVisibility(true);
			} else {
				global.mainWindow.setWindowButtonVisibility(false);
			}
			global.mainWindow.setFullScreen(!global.mainWindow.isFullScreen());
		});
	}
};

exports.Events = Events;
