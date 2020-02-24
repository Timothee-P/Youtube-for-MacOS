let Cinema = {
	start: function() {
		document.querySelector("ytd-app").setAttribute("class", "ytp-big-mode fullVideo");
		this.setVideoTitleTop();
		CinemaHeader.startEvent();
	},
	end: function() {
		document.querySelector("ytd-app").setAttribute("class", "ytp-big-mode");
		CinemaHeader.startEvent();
	},

	setVideoTitleTop: function() {
		if (!document.querySelector(".ytp-gradient-bottom.top")) {
			this.buildVideoTitleTop();
		}
		if (document.querySelector("h1.ytd-video-primary-info-renderer") && document.querySelector(".ytd-video-owner-renderer img").src) {
			document.querySelector(".ytd-img-top").setAttribute("src", document.querySelector(".ytd-video-owner-renderer img").src);
			document.querySelector(".ytd-title-top").innerHTML = document.querySelector("h1.ytd-video-primary-info-renderer").innerText;
			document.querySelector("button.ytp-button.ytp-cards-button").title = "";
		} else {
			setTimeout(() => {
				this.setVideoTitleTop();
			}, 100);
		}
	},
	buildVideoTitleTop: function() {
		var div = document.createElement("div");
		div.setAttribute("class", "ytp-gradient-bottom top");
		div.innerHTML = "<h1 class='ytd-title-top'></h1><img class='ytd-img-top'/>";
		document.querySelector("#movie_player").appendChild(div);
	}
};
