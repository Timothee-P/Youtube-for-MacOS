const { app, ipcMain } = require("electron");

exports.Ipc = {
	load: function() {
		ipcMain.on("asynchronous-message-resize", (event, arg1, arg2) => {
			global.mainWindow.setBounds({ width: parseInt(arg1), height: parseInt(arg2) });
			global.mainWindow.setAspectRatio(parseInt(arg1) / parseInt(arg2));
		});
		ipcMain.on("asynchronous-message", (event, arg) => {
			if (arg[0] == "showButton") {
				global.mainWindow.setWindowButtonVisibility(true);
			} else if (arg[0] == "hideButton") {
				if (!global.mainWindow.isFullScreen()) {
					global.mainWindow.setWindowButtonVisibility(false);
				}
			} else if (arg[0] == "resizeRatio") {
				global.mainWindow.setBounds({ width: parseInt(arg[1]), height: parseInt(arg[2]) });
				global.mainWindow.setAspectRatio(parseInt(arg[1]) / parseInt(arg[2]));
			}
		});
	}
};
