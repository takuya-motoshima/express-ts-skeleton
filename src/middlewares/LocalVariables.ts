import express from 'express';

/**
 * Local variable option type.
 */
interface LocaltVariablesOptions {
  override?: (baseUrl: string) => string|undefined
}

/**
 * Set local variables.
 * It can be accessed in all views as {{var}} or {{{var}}}.
 * 
 * Below is a description of the variables.
 * baseUrl: The base URL for this application.
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app: express.Express, options: LocaltVariablesOptions) {
    // Initialize options.
    options = Object.assign({
      override: undefined
    }, options);

    // Generate baseUrl for this application based on request header.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      let baseUrl;
      if (req.headers.referer)
        baseUrl = new URL(req.headers.referer).origin;
      else
        baseUrl = 'x-forwarded-proto' in req.headers ? `${req.headers['x-forwarded-proto']}://${req.headers.host}` : `//${req.headers.host}`;
      if (options && options.override)
        baseUrl = options.override(baseUrl);

      // Set baseUrl to a local variable.
      app.locals.baseUrl = baseUrl;
      next();
    });
  }
}