module.exports = class WindowBounds {
    constructor() {
        var windowBounds = global.app.settings.get("windowBounds")

        this.width = windowBounds.width
        this.height = windowBounds.height
    }

    set(width,height) {
        this.width = width
        this.height = height
        global.app.settings.get("windowBounds", { width:this.width,height:this.height})
    }
};
