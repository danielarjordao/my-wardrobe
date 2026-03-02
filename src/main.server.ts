import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

// For server-side rendering, we export a bootstrap function that can be called by the server
const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context)
    .catch((err) => console.error(err));

export default bootstrap;
