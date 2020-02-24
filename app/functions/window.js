const { app } = require("electron");

exports.Window = {
	initEvent: function() {
		global.mainWindow.on("closed", () => {
			global.mainWindow = null;
		});
		global.mainWindow.on("page-title-updated", (e) => {
			this.isCinemaLink();
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
	isCinemaLink: function() {
		var url = global.mainWindow.webContents.getURL();
		console.log(url);
		if (new URL(url).pathname == "/watch") {
			this.cinemaOn();
		} else {
			this.cinemaOff();
		}
	},
	cinemaOn: function() {
		global.mainWindow.webContents.send("asynchronous-message", "cinemaOn");
		if (!global.mainWindow.isFullScreen()) {
			global.mainWindow.setWindowButtonVisibility(false);
		}
	},
	cinemaOff: function() {
		global.mainWindow.webContents.send("asynchronous-message", "cinemaOff");
		global.mainWindow.setWindowButtonVisibility(true);
		global.mainWindow.setAspectRatio(0);
	}
};
