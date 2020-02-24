const { ipcRenderer } = require("electron");
var headerState = {
	isVisible: false,
	isScrolling: false,
	cursorIsTop: false
};
var isLoaded = false;

ipcRenderer.on("asynchronous-message", (event, arg) => {
	if (arg === "cinemaOn") {
		Cinema.start();
	} else if (arg === "cinemaOff") {
		Cinema.end();
	}
});

window.addEventListener("DOMContentLoaded", (event) => {
	isLoaded = true;
	document.querySelector("ytd-app").setAttribute("class", "ytp-big-mode");
});
document.addEventListener("fullscreenchange", function() {
	document.exitFullscreen();
});
let Cinema = {
	start: function() {
		document.querySelector("ytd-app").setAttribute("class", "ytp-big-mode fullVideo");
		this.setVideoHeader();
		document.addEventListener("mousemove", this.onMouseMove);
		document.addEventListener("mouseleave", this.onMouseOut);
		document.addEventListener("scroll", this.onScroll);
		setTimeout(() => {
			ipcRenderer.send("asynchronous-message", [
				"resizeRatio",
				document.getElementsByClassName("video-stream")[0].style.width,
				document.getElementsByClassName("video-stream")[0].style.height
			]);
		}, 300);
	},
	end: function() {
		headerState = {
			isVisible: false,
			isScrolling: false,
			cursorIsTop: false
		};
		if (isLoaded) {
			document.querySelector("ytd-app").setAttribute("class", "ytp-big-mode");
			document.removeEventListener("mousemove", this.onMouseMove);
			document.removeEventListener("mouseleave", this.onMouseOut);
			document.removeEventListener("scroll", this.onScroll);
		}
	},
	mainHeader: function() {
		if (headerState.isScrolling === true) {
			this.showHeader();
		} else {
			if (headerState.cursorIsTop === true) {
				this.showHeader();
			} else {
				this.hideHeader();
			}
		}
	},
	showHeader: function() {
		if (!headerState.isVisible) {
			headerState.isVisible = true;
			if (document.querySelector(".ytp-cards-button")) {
				document.querySelector(".ytp-cards-button").style.transform = "translateY(58px)";
			}
			document.getElementById("masthead-container").style.top = "0";
			ipcRenderer.send("asynchronous-message", ["showButton"]);
		}
	},
	hideHeader: function() {
		if (headerState.isVisible) {
			headerState.isVisible = false;
			if (document.querySelector(".ytp-cards-button")) {
				document.querySelector(".ytp-cards-button").style.transform = "";
			}
			document.getElementById("masthead-container").style.top = "";
			ipcRenderer.send("asynchronous-message", ["hideButton"]);
		}
	},

	onMouseMove: function(event) {
		if (event.screenY < 250) {
			headerState.cursorIsTop = true;
		} else {
			headerState.cursorIsTop = false;
		}
		Cinema.mainHeader();
	},
	onScroll: function(event) {
		if (window.scrollY > 0) {
			headerState.isScrolling = true;
		} else {
			headerState.isScrolling = false;
		}
		Cinema.mainHeader();
	},
	onMouseOut: function() {
		headerState.cursorIsTop = false;
		Cinema.mainHeader();
	},

	setVideoHeader: function() {
		if (!document.querySelector(".ytp-gradient-bottom.top")) {
			this.buildVideoHeader();
		}
		if (document.querySelector("h1.ytd-video-primary-info-renderer") && document.querySelector(".ytd-video-owner-renderer img").src) {
			document.querySelector(".ytd-img-top").setAttribute("src", document.querySelector(".ytd-video-owner-renderer img").src);
			document.querySelector(".ytd-title-top").innerHTML = document.querySelector("h1.ytd-video-primary-info-renderer").innerText;
			document.querySelector("button.ytp-button.ytp-cards-button").title = "";
		} else {
			setTimeout(() => {
				this.setVideoHeader();
			}, 100);
		}
	},
	buildVideoHeader: function() {
		var div = document.createElement("div");
		div.setAttribute("class", "ytp-gradient-bottom top");
		div.innerHTML = "<h1 class='ytd-title-top'></h1><img class='ytd-img-top'/>";
		document.querySelector("#movie_player").appendChild(div);
	}
};
