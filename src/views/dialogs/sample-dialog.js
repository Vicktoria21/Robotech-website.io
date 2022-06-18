import { DialogController } from '../../core/dialog-service/dialog-controller';
import { inject } from 'aurelia-framework';

@inject(DialogController)
export class SampleDialog {
  /** @type {Number} */
  input;
  /**
   * @param {DialogController} controller
   */
  constructor(controller) {
    this._controller = controller;
  }

  activate({ unEntier }) {
    this.unEntier = unEntier;
  }

  confirm() {
    this._controller.ok({ unEntier: this.unEntier * 2});
  }

  cancel() {
    this._controller.cancel();
  }
}
