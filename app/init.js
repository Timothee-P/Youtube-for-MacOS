const { BrowserWindow, session } = require("electron");
const fs = require("fs");

const { Ipc } = require("./functions/ipc.js");
const { Window } = require("./functions/window.js");

init = {
	createWindow: function() {
		this.createLoader();

		global.mainWindow = new BrowserWindow({
			width: 1600,
			height: 900,
			show: false,
			frame: false,
			titleBarStyle: "hidden"
		});
		global.mainWindow.loadURL(`https://www.youtube.com/`);

		Ipc.load();
		this.onLoaded();
		Window.initEvent();
	},

	createLoader: function() {
		global.loadingWindow = new BrowserWindow({
			width: 450,
			height: 500,
			backgroundColor: "#272727",
			frame: false,
			titleBarStyle: "hidden",
			webPreferences: {
				nodeIntegration: true
			}
		});
		global.loadingWindow.loadURL(`file://${__dirname}/template/loading.html`);
	},

	loadCookies: (isBlack) => {
		session.defaultSession.cookies.set({
			url: "https://www.youtube.com",
			name: "wide",
			value: "1"
		});

		session.defaultSession.cookies.set({
			url: "https://www.youtube.com",
			name: "CONSENT",
			value: "YES+V10"
		});

		if (isBlack) {
			session.defaultSession.cookies.set({
				url: "https://www.youtube.com",
				name: "PREF",
				value: "f1=50000000&f4=4000000&f6=400"
			});
		}
	},
	onLoaded: function() {
		global.mainWindow.webContents.on("did-finish-load", async function() {
			await fs.readFile(__dirname + "/css/style.css", "utf-8", async function(error, data) {
				await global.mainWindow.webContents.insertCSS(data);
			});
			await fs.readFile(__dirname + "/renderer/index.js", "utf-8", async function(error, data) {
				await global.mainWindow.webContents.executeJavaScript(data);
			});
			setTimeout(() => {
				global.loadingWindow.destroy();
				global.mainWindow.show();
			}, 10);
		});
	},
	initWindowEvent: function() {}
};

exports.init = init;
