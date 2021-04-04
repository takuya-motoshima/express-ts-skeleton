import express from 'express';
import createError from 'http-errors';
import {File} from 'nodejs-shared';
import path from 'path';

/**
 * Router option type.
 */
interface RouterOptions {
  defaultController: string|undefined
}

/**
 * Set up URL routing.
 *
 * Define URL routing based on the path of the file in the routes directory.
 * For example, if you have "routes/api/users.js", you can request the method in "user.js (ts)" with the base URL as "https:////api/users".
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app: express.Express, options: RouterOptions) {
    // Initialize options.
    options = Object.assign({
      defaultController: undefined
    }, options);

    // Set the URL to route based on the path of the file in the routes directory.
    const routesPath = path.join(global.DIST_PATH, 'routes');
    // const routesPath = path.join(process.cwd(), 'routes');
    for (let filepath of File.find(`${routesPath}/**/*.js`)) {
      const {default: router} = require(filepath);
      const matches = filepath.match(/\/routes(?:(\/..*))?\/(..*)\.js/);
      if (!matches) continue;
      const [_, dir, filename] = matches;
      const url = dir ? `${dir}/${filename.toLowerCase()}` : `/${filename.toLowerCase()}`;
      console.debug(`Map ${url}`);
      app.use(url === options.defaultController ? '/' : url, router);
    }

    // Catch 404 and forward to error handler.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(createError(404));
    });

    // Error handler.
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Set locals, only providing error in development.
      if (req.xhr) {
        res.status(err.status||500);
        res.json({error: err.message});
      } else {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // Render the error page.
        res.status(err.status||500);
        res.render('error');
      }
    });
  }
}
