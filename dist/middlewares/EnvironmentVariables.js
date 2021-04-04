"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
/**
 * Set environment variables.
 *
 * Read the environment variable file in options.path and set it in "process.env".
 */
class default_1 {
    /**
     * Mount on application.
     */
    static mount(options) {
        console.debug(`Load ${options.envPath}`);
        // Initialize options.
        options = Object.assign({
            envPath: undefined
        }, options);
        if (!options.envPath)
            return;
        // Set environment variables in process.env.
        const env = dotenv_1.default.parse(fs_1.default.readFileSync(options.envPath));
        for (let key in env)
            process.env[key] = env[key];
    }
}
exports.default = default_1;
