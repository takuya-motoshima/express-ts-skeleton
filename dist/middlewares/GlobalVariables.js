"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Set global variables.
 * It can be accessed like "global.xxx" in all router and model classes.
 *
 * Below is a description of the variables.
 * APP_PATH: The directory where app.js is located.
 * DIST_PATH: The path where the module to be executed is located.
 */
class default_1 {
    /**
     * Mount on application.
     */
    static mount(options) {
        // Application root path.
        global.APP_PATH = process.cwd();
        console.debug(`Set APP_PATH: ${global.APP_PATH}`);
        // Module path.
        global.DIST_PATH = options.distPath;
        console.debug(`Set DIST_PATH: ${global.DIST_PATH}`);
    }
}
exports.default = default_1;
