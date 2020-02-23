const { app } = require("electron");

const { menu } = require("./functions/menu.js");
const { init } = require("./init.js");

app.on("ready", () => {
	menu.load();
	init.loadCookies(true);
	app.dock.show();

	init.createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("before-quit", () => {
	global.mainWindow.webContents.session.clearCache(() => {});
});

app.on("activate", () => {
	if (global.mainWindow === null) {
		Window.create();
	}
});
