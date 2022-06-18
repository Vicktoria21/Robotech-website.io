import { inject, Factory } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { AureliaConfiguration } from 'aurelia-configuration';
import { Oauth2Interceptor } from 'aurelia-kis-oidc';

import environment from '../../config/environment.json';
import { logger } from './logger';
import { ToastService } from './toast-service/toast-service';
import { IndicatorInterceptor } from './indicator-interceptor';

const defaultErrorMessage = `Une erreur de communication s'est produite.`;

/**
 * Construit un object ProblemDetail à partir de tout type d'erreurs
 * @param {unknown} error
 * @returns {Promise<ProblemDetail>}
 */
async function buildProblemDetail(error) {
  if (error instanceof Response) {
    let text = '';
    try {
      text = await error.text();
      const errorObject = JSON.parse(text);
      return 'title' in errorObject && 'status' in errorObject && 'detail' in errorObject
        ? errorObject
        : {
            title: `Erreur appel api (réponse non RFC 7807)`,
            status: error.status,
            detail: errorObject
          };
    } catch {
      return {
        title: `Erreur appel api (réponse non JSON)`,
        status: error.status,
        detail: text
      };
    }
  }
  return { title: 'Api http non accessible ou bloquée par CORS', status: -1, detail: error };
}

/**
 * Construit une chaîne représentant le détail de l'erreur
 * @param {any} errorDetail
 * @returns {string}
 */
function buildErrorDetail(errorDetail) {
  if (typeof errorDetail === 'string') return errorDetail;
  if ('message' in errorDetail) return errorDetail.message;
  return JSON.stringify(errorDetail, Object.getOwnPropertyNames(errorDetail));
}

/**
 * Construit un message html destiné à l'utilisateur final à partir du ProblemDetail générique spécifié
 * @type { (problem: ProblemDetail) => string }
 */
const buildDefaultUserMessage = problem =>
  `<dl><dt>${problem.title}</dt>${
    problem.status && problem.status !== -1
      ? '<dd>Code http <strong>' + problem.status + '</strong></dd>'
      : ''
  }<dd>${buildErrorDetail(problem.detail)}</dd></dl>`;

/**
 * Construit un message html destiné à l'utilisateur final à partir du ProblemDetail de type BusinessError
 * @type { (problem: ProblemDetail) => string }
 */
// eslint-disable-next-line no-control-regex
const buildBusinessUserMessage = problem => problem.detail.replace(new RegExp('\n'), '<br>');

/**
 * Construit un message html destiné à l'utilisateur final à partir du ProblemDetail de type ValidationError
 * @type { (problem: ProblemDetail) => string }
 */
const buildValidationUserMessage = problem => problem.errors.map(error => error.errorMessage).join('<br>');

/**
 * Construit un message html destiné à l'utilisateur final
 * et un message utilisateur dédié à la notification
 * @param {ProblemDetail} problem
 * @returns {string}
 */
function buildUserMessage(problem) {
  let userMessage = environment.debug ? buildDefaultUserMessage(problem) : defaultErrorMessage;
  try {
    if (problem.status === 406) userMessage = buildBusinessUserMessage(problem);
    if (problem.status === 400) userMessage = buildValidationUserMessage(problem);
    // eslint-disable-next-line no-empty
  } catch {}
  return userMessage;
}

@inject(AureliaConfiguration, Factory.of(HttpClient), IndicatorInterceptor, Oauth2Interceptor, ToastService)
export class HttpClientConfigurator {
  /**
   * @param {AureliaConfiguration} configuration
   * @param {HttpClientFactory} createHttpClient
   * @param {Interceptor} oauth2Interceptor
   * @param {Interceptor} indicatorInterceptor
   * @param {ToastService} toast
   */
  constructor(configuration, createHttpClient, indicatorInterceptor, oauth2Interceptor, toast) {
    this._configuration = configuration;
    this._sasClient = createHttpClient();
    this._oauth2Interceptor = oauth2Interceptor;
    this._indicatorInterceptor = indicatorInterceptor;
    this._toast = toast;
  }

  /**
   * Configure les clients http de l'application
   */
  configure() {
    const sasApiUrl = this._configuration.get('urls.ado');
    this._sasClient.configure(this._configureHttpClient(sasApiUrl).bind(this));
  }

  /** @type {HttpClient} */
  get sasClient() {
    return this._sasClient;
  }

  /**
   * Gère l'affichage des erreurs de communication http
   * @param {unknown} error
   */
  async handleApiError(error) {
    const problem = await buildProblemDetail(error);
    const userMessage = buildUserMessage(problem);
    logger.error(JSON.stringify(problem));
    this._toast.error(userMessage);
  }

  /**
   * Configure le client http spécifié
   * @param {string} url
   * @returns {(configuration: HttpClientConfiguration) => void} configuration
   */
  _configureHttpClient(url) {
    const handleApiError = this.handleApiError.bind(this);
    return configuration =>
      configuration
        .withBaseUrl(url)
        .withDefaults({
          headers: {
            Accept: 'application/json'
          },
          // credentials: 'include',
          mode: 'cors'
        })
        .withInterceptor(this._indicatorInterceptor)
        .withInterceptor(this._oauth2Interceptor)
        .rejectErrorResponses()
        .withInterceptor({
          requestError(error) {
            handleApiError(error);
            throw error;
          },
          responseError(error) {
            handleApiError(error);
            throw error;
          }
        });
  }
}
