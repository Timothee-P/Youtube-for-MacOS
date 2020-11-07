const { BrowserWindow } = require("electron");
const path = require("path");

class LoadingWindow extends BrowserWindow{
	constructor() {;
		super({
            width: 600,
            height: 400,
            frame: false,
            backgroundColor: "#272727",
        })
        this.loadFile(path.join(__dirname, "../../template/loading.html"));
	}
}

module.exports = LoadingWindow