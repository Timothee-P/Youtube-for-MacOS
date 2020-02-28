let CinemaHeader = {
	init: function() {
		headerState = {
			isVisible: false,
			isScrolling: false,
			cursorIsTop: false
		};
	},
	startEvent: function() {
		document.addEventListener("mousemove", this.onMouseMove);
		document.addEventListener("mouseleave", this.onMouseOut);
		document.addEventListener("scroll", this.onScroll);
	},
	endEvent: function() {
		document.removeEventListener("mousemove", this.onMouseMove);
		document.removeEventListener("mouseleave", this.onMouseOut);
		document.removeEventListener("scroll", this.onScroll);
	},
	manage: function() {
		if (headerState.isScrolling === true) {
			this.show();
		} else {
			if (headerState.cursorIsTop === true) {
				this.show();
			} else {
				this.hide();
			}
		}
	},

	show: function() {
		if (!headerState.isVisible) {
			headerState.isVisible = true;
			if (document.querySelector(".ytp-cards-button")) {
				document.querySelector(".ytp-cards-button").style.transform = "translateY(58px)";
			}
			document.getElementById("masthead-container").style.top = "0";
			ipcRenderer.send("asynchronous-message", ["showButton"]);
		}
	},
	hide: function(bypassIf = false) {
		if (bypassIf || headerState.isVisible) {
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
		CinemaHeader.manage();
	},
	onScroll: function(event) {
		if (window.scrollY > 0) {
			headerState.isScrolling = true;
		} else {
			headerState.isScrolling = false;
		}
		CinemaHeader.manage();
	},
	onMouseOut: function() {
		headerState.cursorIsTop = false;
		CinemaHeader.manage();
	}
};
var headerState = {};
CinemaHeader.init();
