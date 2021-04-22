import express from 'express'
import config from '~/config/config';
import GlobalVariables from '~/middlewares/GlobalVariables';
import EnvironmentVariables from '~/middlewares/EnvironmentVariables';
import TemplateEngine from '~/middlewares/TemplateEngine';
import Http from '~/middlewares/Http';
import CORS from '~/middlewares/CORS';
import LocalVariables from '~/middlewares/LocalVariables';
import UserAuthentication from '~/authentication/UserAuthentication';
import Router from '~/routing/Router';
import UserModel from '~/models/UserModel';
import path from 'path';

// Creates and configures an ExpressJS web server.
const app = express();

// Set global variables.
GlobalVariables.mount();

// Set environment variables.
EnvironmentVariables.mount({envPath: config.envPath});

// Enable Handlebars template engine.
if (config.enableView)
  TemplateEngine.mount(app);

// Defines all the requisites in HTTP.
Http.mount(app, {maxBodySize: config.maxBodySize});

// Enables the CORS.
if (config.enableCors)
  CORS.mount(app);

// Set local variables.
LocalVariables.mount(app, {override: config.overrideBaseUrl});

// Incorporate user authentication into your application.
if (config.userAuthentication && config.userAuthentication.enabled)
  UserAuthentication.mount(app, {...config.userAuthentication, model: UserModel});

// Set up URL routing.
Router.mount(app, {
  routesPath: path.join(process.cwd(), 'dist/routes'),
  defaultController: config.defaultController
});

export default app;