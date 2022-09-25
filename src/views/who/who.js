/*****************************************************************************************************************/
/*****************************************************************************************************************/

// CODE MINIMAL POUR LE JAVASCRIPT
import { inject } from 'aurelia-framework';
import { Connection } from 'aurelia-kis-oidc';

import { DialogService } from 'core/dialog-service/dialog-service';
import { ToastService } from 'core/toast-service/toast-service';
import { ApiService } from 'services/api-service';
import { RobotechDialog } from 'views/dialogs/robotech-dialog';
import { RobotechDialog2 } from 'views/dialogs/robotech-dialog2';

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

  async modal() {
    const { wasCancelled, output } = await this._dialog.open({
      viewModel: RobotechDialog,
      locked: true
    });
  }

  async modal2() {
    const { wasCancelled, output } = await this._dialog.open({
      viewModel: RobotechDialog2,
      locked: true
    });
  }
}

/*****************************************************************************************************************/
/*****************************************************************************************************************/
