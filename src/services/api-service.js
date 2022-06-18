import { inject } from 'aurelia-framework';
import { HttpClientConfigurator } from 'core/http-client-configurator';

@inject(HttpClientConfigurator)
export class ApiService {
  /**
   * @param {HttpClientConfigurator} clientConfigurator le configurateur de client http
   */
  constructor(clientConfigurator) {
    this._client = clientConfigurator._sasClient;
  }

}
