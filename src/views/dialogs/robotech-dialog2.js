import { DialogController } from '../../core/dialog-service/dialog-controller';
import { inject } from 'aurelia-framework';

@inject(DialogController)
export class RobotechDialog2 {
  /** @type {Number} */
  input;
  /**
   * @param {DialogController} controller
   */
  constructor(controller) {
    this._controller = controller;
  }

  activate() {
  }

  return() {
    this._controller.cancel();
  }
}
