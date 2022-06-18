import 'regenerator-runtime/runtime';
import { PLATFORM } from 'aurelia-pal';

import environment from '../config/environment.json';
import { logger } from 'core/logger';
import { configureValidation } from 'core/validation';
import configureOpenid from './constants/openid-configuration';
import { Aurelia } from 'aurelia-framework';

/**
 * Configure l'instance Aurelia.
 * @param {Aurelia} aurelia L'application aurelia
 */
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-configuration'))
    .plugin(PLATFORM.moduleName('aurelia-kis-oidc'), () => configureOpenid(aurelia))
    .plugin(PLATFORM.moduleName('aurelia-validation'), () => configureValidation())
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia
    .start()
    .then(() => aurelia.setRoot(PLATFORM.moduleName('app')))
    .catch(error => logger.error(error));
}
