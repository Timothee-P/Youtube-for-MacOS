const { app } = require("electron");

exports.Window = {
	initEvent: () => {
		global.mainWindow.on("closed", () => {
			global.mainWindow = null;
		});
	}
};
