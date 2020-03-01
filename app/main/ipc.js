const { ipcMain } = require("electron");
const { Window } = require("./window.js");

exports.Ipc = {
	load: function() {
		ipcMain.on("asynchronous-message", (event, arg) => {
			if (arg[0] == "showYT") {
				Window.showYT();
			} else if (arg[0] == "offline") {
				Window.offline();
			} else if (arg[0] == "cinemaOn") {
				if (!global.mainWindow.isFullScreen()) {
					global.mainWindow.setWindowButtonVisibility(false);
				}
			} else if (arg[0] == "cinemaOff") {
				global.mainWindow.setWindowButtonVisibility(true);
				global.mainWindow.setAspectRatio(0);
			} else if (arg[0] == "showButton") {
				global.mainWindow.setWindowButtonVisibility(true);
			} else if (arg[0] == "hideButton") {
				if (!global.mainWindow.isFullScreen()) {
					global.mainWindow.setWindowButtonVisibility(false);
				}
			} else if (arg[0] == "resizeRatio") {
				global.mainWindow.setBounds({ width: parseInt(arg[1]), height: parseInt(arg[2]) });
				global.mainWindow.setAspectRatio(parseInt(arg[1]) / parseInt(arg[2]));
			} else if (arg[0] == "goBack") {
				global.mainWindow.webContents.goBack();
			} else if (arg[0] == "goForward") {
				global.mainWindow.webContents.goForward();
			}
		});
	}
};
