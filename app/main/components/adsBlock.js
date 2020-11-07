const { session } = require("electron");
var { ElectronBlocker } = require('@cliqz/adblocker-electron');

exports.AdsBlock = {
	init: function () {
		ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
			blocker.enableBlockingInSession(session.defaultSession);
		});
	}
};
