const { app, ipcMain } = require("electron");

exports.Ipc = {
	load: () => {
		ipcMain.on("asynchronous-message-resize", (event, arg1, arg2) => {
			global.mainWindow.setBounds({ width: parseInt(arg1), height: parseInt(arg2) });
			global.mainWindow.setAspectRatio(parseInt(arg1) / parseInt(arg2));
		});
		ipcMain.on("asynchronous-message", (event, arg, arg1) => {
			if (arg == "showButton") {
				global.mainWindow.setWindowButtonVisibility(true);
			} else if (arg == "hideButton") {
				global.mainWindow.setWindowButtonVisibility(false);
			} else if (arg == "resizeOff") {
				global.mainWindow.setAspectRatio(0);
			} else if (arg == "fullscreen") {
				if (global.mainWindow.isFullScreen()) {
					global.mainWindow.setFullScreen(false);
				} else {
					global.mainWindow.setFullScreen(true);
				}
			} else if (arg == "pip") {
				boundWin = global.mainWindow.getBounds();
				app.dock.hide();
				global.mainWindow.setAlwaysOnTop(true);
				global.mainWindow.setVisibleOnAllWorkspaces(true);
				global.mainWindow.setFullScreenable(false);
				global.mainWindow.setBounds({
					x: 50,
					y: 50,
					width: 550,
					height: Math.floor(arg1)
				});
				app.dock.show();
			} else if (arg == "pipOff") {
				global.mainWindow.setBounds(boundWin);
				global.mainWindow.setAlwaysOnTop(false);
				global.mainWindow.setVisibleOnAllWorkspaces(false);
				global.mainWindow.setFullScreenable(true);
			} else if (arg == "showBackArrow") {
				global.mainWindow.webContents.send("asynchronous-swipe", "showBack");
			} else if (arg == "showForwardArrow") {
				global.mainWindow.webContents.send("asynchronous-swipe", "showForward");
			} else if (arg == "goBack") {
				global.mainWindow.webContents.send("asynchronous-swipe", "goBack");
			} else if (arg == "goForward") {
				global.mainWindow.webContents.send("asynchronous-swipe", "goForward");
			}
		});
	}
};
