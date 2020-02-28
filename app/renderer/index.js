const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", (event) => {
	ipcRenderer.send("asynchronous-message", ["cssReady"]);
	Cinema.isCinemaLink();
});
window.addEventListener("load", (event) => {
	ipcRenderer.send("asynchronous-message", ["appReady"]);
	window.addEventListener("yt-page-data-updated", function(e) {
		Cinema.isCinemaLink();
	});
});
document.addEventListener("fullscreenchange", function() {
	document.exitFullscreen();
});
