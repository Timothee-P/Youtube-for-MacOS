const { ipcRenderer } = require("electron");

ipcRenderer.on("asynchronous-message", (event, arg) => {
	if (arg === "cinemaOn") {
		Cinema.start();
	} else if (arg === "cinemaOff") {
		headerState = {
			isVisible: false,
			isScrolling: false,
			cursorIsTop: false
		};
		Cinema.end();
	}
});
