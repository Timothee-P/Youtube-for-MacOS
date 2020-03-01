const { app } = require("electron");

const { Menu } = require("./menu.js");
const { Cookies } = require("./cookies.js");
const { AdsBlock } = require("./adsBlock.js");
const { Ipc } = require("./ipc.js");
const { Window } = require("./window.js");

app.allowRendererProcessReuse = true; // Default value false is deprecated, it will change to "true" in Electron 9

app.on("ready", () => {
	Menu.load();
	Cookies.load(true);
	app.dock.show();
	AdsBlock.start();
	Ipc.load();

	Window.init();
});
