const { ipcMain } = require("electron");

module.exports =  class Cinema {
	constructor(window) {
		this.window = window
		this.initEvent()		
	}

	initEvent() {
		this.window.webContents.on("enter-html-full-screen",  (e) =>{
			this.toogleFullScreen();
		})
		ipcMain.on("cinema-message", (event, arg) => { 
			if (arg[0] == "cinemaOn") {
				if (!this.window.isFullScreen()) {
					this.window.setWindowButtonVisibility(false);
				}
			} else if (arg[0] == "cinemaOff") {
				this.window.setWindowButtonVisibility(true);
				this.window.setAspectRatio(0);
			} else if (arg[0] == "showButton") {
				this.window.setWindowButtonVisibility(true);
			} else if (arg[0] == "hideButton") {
				if (!this.window.isFullScreen()) {
					this.window.setWindowButtonVisibility(false);
				}
			} else if (arg[0] == "resizeRatio") {
				this.window.setBounds({ width: parseInt(arg[1]), height: parseInt(arg[2]) });
				this.window.setAspectRatio(parseInt(arg[1]) / parseInt(arg[2]));
			} else if (arg[0] == "goBack") {
				this.window.webContents.goBack();
			} else if (arg[0] == "goForward") {
				this.window.webContents.goForward();
			}
		})
	}

	toogleFullScreen() {
		if (!this.window.isFullScreen()) {
			this.window.setWindowButtonVisibility(true);
		} else {
			this.window.setWindowButtonVisibility(false);
		}
		this.window.setFullScreen(!this.window.isFullScreen());
	}
};
