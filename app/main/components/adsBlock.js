const { session } = require("electron");
var { ElectronBlocker } = require('@cliqz/adblocker-electron');
var fetch = require('cross-fetch')

exports.AdsBlock = {
	init: function () {
		ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
			blocker.enableBlockingInSession(session.defaultSession);
		});
	}
};
