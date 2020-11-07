const { session } = require("electron");
var { ElectronBlocker } = require('@cliqz/adblocker-electron');
var fetch = require('cross-fetch')

module.exports = class AdsBlock {
	constructor() {
		ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
			blocker.enableBlockingInSession(session.defaultSession);
		});
	}
};
