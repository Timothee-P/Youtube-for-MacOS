const { app } = require("electron");

const { Menu } = require("./main/components/menu.js");
const { Cookies } = require("./main/components/cookies.js");
const { Ipc } = require("./main/ipc.js");
const { Window } = require("./main/window.js");
const { AdsBlock } = require("./main/components/adsBlock.js");

app.allowRendererProcessReuse = true; // Default value false is deprecated, it will change to "true" in Electron 9

app.on("ready", async () => {
	Menu.init();
	Cookies.init(true);
	AdsBlock.init();
	Ipc.init();

	Window.init();
});

app.on("window-all-closed", () => {
	app.quit();
});

app.on("before-quit", () => {
	global.mainWindow.webContents.session.clearCache(() => { });
});