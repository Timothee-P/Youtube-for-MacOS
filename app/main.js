// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, session } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");

const ipc = ipcMain;
var ses;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const template = require("./menu.js").menu;

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1600,
		height: 900,
		frame: false,
		titleBarStyle: "hidden",
		webPreferences: {
			nodeIntegration: true
		}
	});

	// and load the index.html of the app.
	mainWindow.loadURL(`file://${__dirname}/index.html`);
	app.dock.show();
	ses = mainWindow.webContents.session;

	// Open the DevTools.
	//mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on("closed", function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
	const cookieWide = {
		url: "https://www.youtube.com",
		name: "wide",
		value: "1"
	};
	const cookieBlack = {
		url: "https://www.youtube.com",
		name: "PREF",
		value: "f1=50000000&f4=4000000&f6=400"
	};
	const cookieConsent = {
		url: "https://www.youtube.com",
		name: "CONSENT",
		value: "YES+V10"
	};
	session.defaultSession.cookies.set(cookieWide, (error) => {
		if (error) console.error(error);
	});
	session.defaultSession.cookies.set(cookieBlack, (error) => {
		if (error) console.error(error);
	});
	session.defaultSession.cookies.set(cookieConsent, (error) => {
		if (error) console.error(error);
	});
	session.defaultSession.webRequest.onBeforeRequest(["*://*./*"], function(details, callback) {
		var test_url = details.url;
		var check_block_list = /\.(gr|hk||fm|eu|it|es|is|net|ke|me||tz|za|zm|uk|us|in|com|de|fr|zw|tv|sk|se|php|pk|pl)\/ads?[\-_./\?]|(stats?|rankings?|yt3.ggpht.com|ad.doubleclick.net|pagead|get_midroll_info?|tracks?|adview?|trigg|webtrends?|webtrekk|statistiche|visibl|searchenginejournal|visit|webstat|survey|spring).*.(com|net|de|fr|co|it|se)|cloudflare|\/statistics\/|torrent|[\-_./]ga[\-_./]|[\-_./]counter[\-_./\?]|ad\.admitad\.|\/widgets?[\-_./]?ads?|\/videos?[\-_./]?ads?|\/valueclick|userad|track[\-_./]?ads?|\/top[\-_./]?ads?|\/sponsor[\-_./]?ads?|smartadserver|\/sidebar[\-_]?ads?|popunder|\/includes\/ads?|\/iframe[-_]?ads?|\/header[-_]?ads?|\/framead|\/get[-_]?ads?|\/files\/ad*|exoclick|displayad|\ajax\/ad|adzone|\/assets\/ad*|advertisement|\/adv\/*\.|ad-frame|\.com\/bads\/|follow-us|connect-|-social-|googleplus.|linkedin|footer-social.|social-media|gmail|commission|adserv\.|omniture|netflix|huffingtonpost|dlpageping|log204|geoip\.|baidu|reporting\.|paypal|maxmind|geo\.|api\.bit|hits|predict|cdn-cgi|record_|\.ve$|radar|\.pop|\.tinybar\.|\.ranking|.cash|\.banner\.|adzerk|gweb|alliance|adf\.ly|monitor|urchin_post|imrworldwide|gen204|twitter|naukri|hulu.com|baidu|seotools|roi-|revenue|tracking.js|\/tracking[\-_./]?|elitics|demandmedia|bizrate|click-|click\.|bidsystem|affiliates?\.|beacon|hit\.|googleadservices|metrix|googleanal|dailymotion|ga.js|survey|trekk|visit_|arcadebanners?|visitor\.|ielsen|cts\.|link_|ga-track|FacebookTracking|quantc|traffic|evenuescien|roitra|pixelt|pagetra|metrics|[-_/.]?stats?[.-_/]?|common_|accounts\.|contentad|iqadtile|boxad|audsci.js|ebtrekk|seotrack|clickalyzer|youtube|\/tracker\/|ekomi|clicky|[-_/.]?click?[.-_/]?|[-_/.]?tracking?[.-_/]?|[-_/.]?track?[.-_/]?|ghostery|hscrm|watchvideo|clicks4ads|mkt[0-9]|createsend|analytix|shoppingshadow|clicktracks|admeld|google-analytics|-analytic|googletagservices|googletagmanager|tracking\.|thirdparty|track\.|pflexads|smaato|medialytics|doubleclick|cloudfront|-static|-static-|static-|sponsored-banner|static_|_static_|_static|sponsored_link|sponsored_ad|googleadword|analytics\.|googletakes|adsbygoogle|analytics-|-analytic|analytic-|googlesyndication|google_adsense2|googleAdIndexTop|\/ads\/|google-ad-|google-ad?|google-adsense-|google-adsense.|google-adverts-|google-adwords|google-afc-|google-afc.|google\/ad\?|google\/adv\.|google160.|google728.|_adv|google_afc.|google_afc_|google_afs.|google_afs_widget|google_caf.js|google_lander2.js|google_radlinks_|googlead|googleafc.|googleafs.|googleafvadrenderer.|googlecontextualads.|googleheadad.|googleleader.|googleleads.|googlempu.|ads_|_ads_|_ads|easyads|easyads|easyadstrack|ebayads|[.\-_/\?](ads?|clicks?|tracks?|tracking|logs?)[.\-_/]?(banners?|mid|trends|pathmedia|tech|units?|vert*|fox|area|loc|nxs|format|call|script|final|systems?|show|tag\.?|collect*|slot|right|space|taily|vids?|supply|true|targeting|counts?|nectar|net|onion|parlor|2srv|searcher|fundi|nimation|context|stats?|vertising|class|infuse|includes?|spacers?|code|images?|vers|texts?|work*|tail|track|streams?|ability||world*|zone|position|vertisers?|servers?|view|partner|data)[.\-_/]?/gi;
		var check_white_list = /status|yt3.ggpht.com|ssl.gstatic.com|www.gstatic.com|accounts.google.com|apis.google.com|premoa.*.jpg|index|www.youtube.com|googlevideo.com|rakuten|nitori-net|search\?tbs\=sbi\:|google.*\/search|ebay.*static.*g|\/shopping\/product|aclk?|translate.googleapis.com|encrypted-|product|www.googleadservices.com\/pagead\/aclk|target.com|.css/gi;
		var check_reblock_list = /status|target.com|pagead|get_midroll_info?|tracks?|adview?|ads/gi;

		var block_me = check_block_list.test(test_url);
		var release_me = check_white_list.test(test_url);
		var reblock_me = check_reblock_list.test(test_url);

		if (reblock_me) {
			callback({ cancel: true });
		} else if (release_me) {
			callback({ cancel: false });
		} else if (block_me) {
			callback({ cancel: true });
		} else {
			callback({ cancel: false });
		}
	});
	createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("before-quit", function() {
	ses.clearCache(function() {});
});

app.on("activate", function() {
	// On macOS it's common to re-create a window in the app when the
	// dock make is clicked and there are no other windows open.
	if (mainWindow === null) {
		const cookieWide = {
			url: "https://www.youtube.com",
			name: "wide",
			value: "1"
		};
		const cookieConsent = {
			url: "https://www.youtube.com",
			name: "CONSENT",
			value: "YES+V10"
		};
		const cookieBlack = {
			url: "https://www.youtube.com",
			name: "PREF",
			value: "f1=50000000&f4=4000000&f6=400"
		};
		session.defaultSession.cookies.set(cookieWide, (error) => {
			if (error) console.error(error);
		});
		session.defaultSession.cookies.set(cookieConsent, (error) => {
			if (error) console.error(error);
		});
		session.defaultSession.cookies.set(cookieBlack, (error) => {
			if (error) console.error(error);
		});
		createWindow();
	}
});
var boundWin;
ipcMain.on("asynchronous-message-resize", (event, arg1, arg2) => {
	mainWindow.setBounds({ width: parseInt(arg1), height: parseInt(arg2) });
	mainWindow.setAspectRatio(parseInt(arg1) / parseInt(arg2));
});
ipcMain.on("asynchronous-message", (event, arg, arg1) => {
	if (arg == "showButton") {
		mainWindow.setWindowButtonVisibility(true);
	} else if (arg == "hideButton") {
		mainWindow.setWindowButtonVisibility(false);
	} else if (arg == "resizeOff") {
		mainWindow.setAspectRatio(0);
	} else if (arg == "fullscreen") {
		if (mainWindow.isFullScreen()) {
			mainWindow.setFullScreen(false);
		} else {
			mainWindow.setFullScreen(true);
		}
	} else if (arg == "pip") {
		boundWin = mainWindow.getBounds();
		app.dock.hide();
		mainWindow.setAlwaysOnTop(true);
		mainWindow.setVisibleOnAllWorkspaces(true);
		mainWindow.setFullScreenable(false);
		mainWindow.setBounds({
			x: 50,
			y: 50,
			width: 550,
			height: Math.floor(arg1)
		});
		app.dock.show();
	} else if (arg == "pipOff") {
		mainWindow.setBounds(boundWin);
		mainWindow.setAlwaysOnTop(false);
		mainWindow.setVisibleOnAllWorkspaces(false);
		mainWindow.setFullScreenable(true);
	} else if (arg == "showBackArrow") {
		mainWindow.webContents.send("asynchronous-swipe", "showBack");
	} else if (arg == "showForwardArrow") {
		mainWindow.webContents.send("asynchronous-swipe", "showForward");
	} else if (arg == "goBack") {
		mainWindow.webContents.send("asynchronous-swipe", "goBack");
	} else if (arg == "goForward") {
		mainWindow.webContents.send("asynchronous-swipe", "goForward");
	}
});
