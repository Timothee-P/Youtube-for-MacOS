const Store = require('./store.js');

module.exports = class Settings extends Store{
    constructor() {
        super({
            configName: 'user-preferences',
            defaults: {
                windowBounds: { width: 1600, height: 900 }
            }
        })
    }
};
