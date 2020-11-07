const { Menu } = require("electron");

module.exports = class TopMenu {
	constructor() {
		Menu.setApplicationMenu(this.buildTemplate());
	};

	buildTemplate() {
		return Menu.buildFromTemplate([
			...(process.platform === "darwin"
				? [
						{
							label: "Youtube",
							submenu: [
								{ role: "about" },
								{ type: "separator" },
								{ role: "services" },
								{ type: "separator" },
								{ role: "hide" },
								{ role: "hideothers" },
								{ role: "unhide" },
								{ type: "separator" },
								{ role: "quit" }
							]
						}
				  ]
				: []),
			{
				label: "Home",
				submenu: [{ role: "close" }]
			},
			// { role: 'editMenu' }
			{
				label: "Edit",
				submenu: [
					{ role: "cut" },
					{ role: "copy" },
					{ role: "paste" },

					{ role: "pasteAndMatchStyle" },
					{ role: "delete" },
					{ role: "selectAll" },
					{ type: "separator" },
					{
						label: "Speech",
						submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
					}
				]
			},
			// { role: 'viewMenu' }
			{
				label: "View",
				submenu: [
					{ role: "reload" },
					{ role: "forcereload" },
					{ role: "toggledevtools" },
					{ type: "separator" },
					{ role: "resetzoom" },
					{ role: "zoomin" },
					{ role: "zoomout" },
					{ type: "separator" },
					{ role: "togglefullscreen" }
				]
			},
			// { role: 'windowMenu' }
			{
				label: "Window",
				submenu: [
					{ role: "minimize" },
					{ role: "zoom" },

					{ type: "separator" },
					{ role: "front" },
					{ type: "separator" },
					{ role: "window" }
				]
			},
			{
				role: "help",
				submenu: []
			}
		]);
	}
};