"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = __importDefault(require("../src/config/database"));
/**
 * Connect to DB.
 */
exports.default = new class extends sequelize_1.default.Sequelize {
    /**
     * Create a sequelize instance.
     */
    constructor() {
        const env = 'development';
        // const env = process.env.NODE_ENV||'development';
        const options = database_1.default[env];
        super(options.database, options.username, options.password || undefined, options);
    }
    /**
     * Returns true if the DB can be connected.
     */
    async isConnect() {
        try {
            await this.authenticate();
            return true;
        }
        catch {
            return false;
        }
    }
};
