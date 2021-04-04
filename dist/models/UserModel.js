"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("~/database/Model"));
/**
 * User model.
 */
exports.default = (_a = class extends Model_1.default {
    },
    /**
     * Table name used by the model.
     * @type {string}
     */
    _a.table = 'user',
    /**
     * Table column list.
     * @type {sequelize.ModelAttributes}
     */
    _a.attributes = {
        id: {
            type: Model_1.default.types.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: Model_1.default.types.STRING,
        password: Model_1.default.types.STRING,
        name: Model_1.default.types.STRING,
        created: Model_1.default.types.DATE,
        modified: Model_1.default.types.DATE
    },
    _a).mount();
