/**
 * Extend a Global object.
 */
declare module NodeJS  {
  interface Global {
    /**
     * Application root path.
     * @type {string}
     */
    APP_PATH: string;

    /**
     * The path where the module to be executed is located.
     * @type {string}
     */
    DIST_PATH: string;
  }
}