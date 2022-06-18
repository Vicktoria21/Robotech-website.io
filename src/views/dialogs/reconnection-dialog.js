import { DialogController } from '../../core/dialog-service/dialog-controller';
import { inject } from 'aurelia-framework';

@inject(DialogController)
export class ReconnectionDialog {
  /**
   * @param {DialogController} controller
   */
  constructor(controller) {
    this._controller = controller;
  }

  activate({ loginFunction }) {
    this._loginFunction = loginFunction;
  }

  confirm() {
    this._loginFunction();
    this._controller.ok();
  }

  cancel() {
    this._controller.cancel();
  }
}
