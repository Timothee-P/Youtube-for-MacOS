const { ipcRenderer } = require("electron");

var app = {
	init: function () {
		this.injectCSS();
		window.addEventListener("yt-page-data-updated", function (e) {
			if (window.location.pathname == "/watch") {
				Cinema.cinemaOn();
			} else {
				Cinema.cinemaOff();
			}
		});
		Offline.init();
		ipcRenderer.send("mainWindow-ready", []);
	},
	injectCSS: function () {
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = " // RENDERER.CSS INSERT HERE ON BUILD // ";
		document.getElementsByTagName("head")[0].appendChild(css);
	}
};

// Wait for js file to load
function thisJsFileLoaded() {
	if (document.getElementsByTagName("head").length === 0) {
		setTimeout(() => {
			thisJsFileLoaded();
		}, 20);
	} else {
		app.init();
	}
}

setTimeout(() => {thisJsFileLoaded()}, 10);
