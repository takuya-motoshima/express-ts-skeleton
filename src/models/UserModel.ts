import sequelize from 'sequelize';
import Model from '~/database/Model';

/**
 * User model.
 */
export default (class extends Model {
  /**
   * Table name used by the model.
   * @type {string}
   */
  protected static table: string = 'user';

  /**
   * Table column list.
   * @type {sequelize.ModelAttributes}
   */
  protected static attributes: sequelize.ModelAttributes = {
    id: {
      type: Model.types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: Model.types.STRING,
    password: Model.types.STRING,
    name: Model.types.STRING,
    created: Model.types.DATE,
    modified: Model.types.DATE
  }
}).mount();