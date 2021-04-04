"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const Database_1 = __importDefault(require("~/database/Database"));
/**
 * Model base class.
 */
class Model extends sequelize_1.default.Model {
    // public static types: sequelize.DataTypes = sequelize.DataTypes;
    /**
     * Mount on application.
     */
    static mount() {
        this.init(this.attributes, {
            modelName: this.table,
            sequelize: Database_1.default,
            freezeTableName: true,
            timestamps: false
        });
        this.association();
        return this;
    }
    /**
     * Define table associations.
     * @see https://sequelize.org/master/manual/assocs.html
     */
    static association() {
        // Define association in subclass
    }
    /**
     * Start a transaction.
     *
     * @example
     * // First, we start a transaction and save it into a variable
     * const t = await SampleModel.begin();
     *
     * try {
     *   // Then, we do some calls passing this transaction as an option:
     *   const user = await SampleModel.create({ name: 'Bart' }, { transaction: t });
     *
     *   // If the execution reaches this line, no errors were thrown.
     *   // We commit the transaction.
     *   await t.commit();
     * } catch (error) {
     *   // If the execution reaches this line, an error was thrown.
     *   // We rollback the transaction.
     *   await t.rollback();
     * }
     * @see https://sequelize.org/master/manual/transactions.html
     */
    static async begin() {
        return Database_1.default.transaction();
    }
    /**
     * Returns data that matches the ID.
     */
    static async findById(id) {
        return this.findOne({ where: { id }, raw: true });
    }
}
exports.default = Model;
/**
 * Column type.
 * @type {sequelize.DataTypes}
 */
Model.types = sequelize_1.default.DataTypes;
