const { app } = require("electron");

exports.Window = {

	initEvent: function() {
		global.mainWindow.on("closed", () => {
			global.mainWindow = null;
		});
		global.mainWindow.webContents.on("enter-html-full-screen", function(e) {
			if (!global.mainWindow.isFullScreen()) {
				global.mainWindow.setWindowButtonVisibility(true);
			} else {
				global.mainWindow.setWindowButtonVisibility(false);
			}
			global.mainWindow.setFullScreen(!global.mainWindow.isFullScreen());
		});
	},
};
