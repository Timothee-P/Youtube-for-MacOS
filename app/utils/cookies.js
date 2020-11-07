const { session } = require("electron");

module.exports = class Cookies {
	constructor() {
		this.setWidescreen();
		this.setConsent();
		this.setDarkTheme();
	}

	// Cinema mode 
	setWidescreen() {
		session.defaultSession.cookies.set({
			url: "https://www.youtube.com",
			name: "wide",
			value: "1"
		});
	}

	// RGPD
	setConsent() {
		session.defaultSession.cookies.set({
			url: "https://www.youtube.com",
			name: "CONSENT",
			value: "YES+V10"
		});	
	}

	// DarkTheme
	setDarkTheme() {
		session.defaultSession.cookies.set({
			url: "https://www.youtube.com",
			name: "PREF",
			value: "f1=50000000&f4=4000000&f6=400"
		});
	}
};
