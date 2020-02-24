const { BrowserWindow, session } = require("electron");
const fs = require("fs");
const path = require("path");

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
			titleBarStyle: "hidden",
			webPreferences: {
				nodeIntegration: true,
				preload: path.join(__dirname, "renderer/index.js"),
				disableHtmlFullscreenWindowResize: true
			}
		});
		global.mainWindow.loadURL(`https://www.youtube.com/`);

		Ipc.load();
		this.onLoaded();
		Window.initEvent();
	},

	onLoaded: function() {
		global.mainWindow.webContents.once("did-finish-load", async function() {
			setTimeout(() => {
				global.loadingWindow.destroy();
				global.mainWindow.show();
			}, 100);
		});
		global.mainWindow.webContents.on("did-finish-load", async () => {
			await fs.readFile(__dirname + "/css/style.css", "utf-8", async function(error, data) {
				await global.mainWindow.webContents.insertCSS(data);
			});
			setTimeout(() => {
				Window.isCinemaLink();
			}, 100);
		});
	},

	createLoader: function() {
		global.loadingWindow = new BrowserWindow({
			width: 450,
			height: 500,
			backgroundColor: "#272727",
			frame: false,
			titleBarStyle: "hidden"
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
	}
};

exports.init = init;
