import { LogManager } from 'aurelia-framework';

import { APPLICATION_LOG_ID } from '../constants/application-constants';

/**
 * L'instance de logger de l'application
 */
export const logger = LogManager.getLogger(APPLICATION_LOG_ID);
