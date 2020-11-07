const { session } = require("electron");

exports.Cookies = {
	init: function(isBlack) {
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
