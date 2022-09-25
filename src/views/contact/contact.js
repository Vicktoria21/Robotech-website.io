/*****************************************************************************************************************/
/*****************************************************************************************************************/

// CODE MINIMAL POUR LE JAVASCRIPT
import { inject } from 'aurelia-framework';
import { Connection } from 'aurelia-kis-oidc';

import { DialogService } from 'core/dialog-service/dialog-service';
import { ToastService } from 'core/toast-service/toast-service';
import { ApiService } from 'services/api-service';

@inject(ToastService, DialogService, Connection, ApiService)
export class Home {
    
  /** @type { Array<{ name: string }>} */
  /**
   * @param {ToastService} toast
   * @param {DialogService} dialog
   * @param {Connection} connection
   * @param {ApiService} api
   */
  constructor(toast, dialog, connection, api) {
    this._toast = toast;
    this._dialog = dialog;
    this._connection = connection;
    this._api = api;
  }

  activate() {
  }

}

/*****************************************************************************************************************/
/*****************************************************************************************************************/
