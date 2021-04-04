import sequelize from 'sequelize';
import database from '~/config/database';

/**
 * Connect to DB.
 */
export default new class extends sequelize.Sequelize {
  /**
   * Create a sequelize instance.
   */
  constructor() {
    const env = 'development';
    // const env = process.env.NODE_ENV||'development';
    const options = database[env] as sequelize.Options;
    super(options.database as string, options.username as string, options.password as string||undefined, options);
  }

  /**
   * Returns true if the DB can be connected.
   */
  public async isConnect(): Promise<boolean> {
    try {
      await this.authenticate();
      return true;
    } catch {
      return false;
    }
  }
}
