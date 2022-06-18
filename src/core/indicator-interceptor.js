/**
 * Implémente un intercepteur indiquant qu'une requête est en cours
 * @category public
 */
/** @type {Interceptor} */
export class IndicatorInterceptor {
  /** @type {boolean} */
  inProgress;

  /** @param {Request} request */
  request(request) {
    this.inProgress = true;
    return request;
  }

  /** @param {Error} error */
  requestError(error) {
    this.inProgress = false;
    return error;
  }

  /** @param {Response} response */
  response(response) {
    this.inProgress = false;
    return response;
  }

  /** @param {Error} error */
  responseError(error) {
    this.inProgress = false;
    return error;
  }
}
