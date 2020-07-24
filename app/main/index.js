const { app } = require("electron");

const { Menu } = require("./menu.js");
const { Cookies } = require("./cookies.js");
const { Ipc } = require("./ipc.js");
const { Window } = require("./window.js");
const { session } = require("electron");
var { ElectronBlocker } = require('@cliqz/adblocker-electron');
var fetch = require('cross-fetch'); // required 'fetch'

app.allowRendererProcessReuse = true; // Default value false is deprecated, it will change to "true" in Electron 9

app.on("ready", async () => {
	Menu.load();
	Cookies.load(true);
	app.dock.show();
	ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
		blocker.enableBlockingInSession(session.defaultSession);
	});
	Ipc.load();

	Window.init();
});
