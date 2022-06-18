import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AureliaConfiguration } from 'aurelia-configuration';
import { OpenidRouting, Connection } from 'aurelia-kis-oidc';
import dayjs from 'core/dayjs';
import 'bootstrap/dist/js/bootstrap.bundle';

import { APPLICATION_TITLE } from './constants/application-constants';
import { ROUTE, routes } from './constants/router-configuration';
import { HttpClientConfigurator } from 'core/http-client-configurator';
import { IndicatorInterceptor } from 'core/indicator-interceptor';

@inject(Router, AureliaConfiguration, OpenidRouting, Connection, HttpClientConfigurator, IndicatorInterceptor)
export class App { // Classe principale qui représente l'application
  /** @type {Router} */
  router;
  /** @type {IndicatorInterceptor} */
  apiCall;
  /** @type {Connection} */
  connection;
  /** @type {string} */
  environment;
  /** @type {string} */
  applicationTitle;

  /**
   * Crée une instance de la Single Page Application aurelia
   * @param {Router} router le routeur de l'application
   * @param {AureliaConfiguration} _configuration les paramètres de l'application spécifiques à l'environnement
   * @param {OpenidRouting} openidRouting le module openid de configuration du routeur
   * @param {Connection} connection la connection openid
   * @param {HttpClientConfigurator} clientConfigurator le configurateur de clients http
   * @param {IndicatorInterceptor} indicatorInterceptor
   */
  constructor(router, _configuration, openidRouting, connection, clientConfigurator, indicatorInterceptor) {
    this.router = router;
    this.environment = _configuration.get('environment');
    this.connection = connection;
    this.apiCall = indicatorInterceptor;

    this._openidRouting = openidRouting;
    this.applicationTitle = APPLICATION_TITLE;

    this.dateDuJour = dayjs().format('dddd Do MMMM YYYY');
    this.heureDuJour = dayjs().format('hh:mm:ss');
    setInterval(() => this.heureDuJour=dayjs().format('hh:mm:ss a'),1000)
    clientConfigurator.configure();
  }

  /**
   * Configure le routeur de l'application
   * @param {RouterConfiguration} configuration - la configuration du routeur
   * @param {Router} _router - le routeur aurelia
   */
  configureRouter(configuration, _router) {
    configuration.title = APPLICATION_TITLE;
    configuration.options.pushState = true;
    configuration.options.root = '/';
    // eslint-disable-next-line unicorn/no-array-callback-reference
    configuration.map(routes); // Définir les routes
    configuration.fallbackRoute(ROUTE.home);
    this._openidRouting.configureRouter(configuration);
  }
}
