const { ipcRenderer } = require("electron");

var app = {
	init: function() {
		this.injectCSS();
		window.addEventListener("yt-page-data-updated", function(e) {
			this.isCinemaLink();
		});
		ipcRenderer.send("asynchronous-message", ["showYT"]);
	},
	injectCSS: function() {
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = " // STYLE.CSS INSERT HERE ON BUILD // ";
		document.getElementsByTagName("head")[0].appendChild(css);
	},
	isCinemaLink: function() {
		if (window.location.pathname == "/watch") {
			this.cinemaOn();
		} else {
			this.cinemaOff();
		}
	}
};

// Wait for js file to load
setTimeout(() => {
	app.init();
}, 10);
