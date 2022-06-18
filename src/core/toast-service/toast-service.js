import { inject, Container, CompositionEngine, ViewSlot, NewInstance, PLATFORM } from 'aurelia-framework';
import { ToastRenderer } from './toast-renderer';
import { toastType } from './toast-type';

/**
 * Gère la fonctionnalité de fenêtre modale
 */
@inject(CompositionEngine, Container, NewInstance.of(ToastRenderer))
export class ToastService {
  /**
   * @param {CompositionEngine} compositionEngine
   * @param {Container} container
   * @param {ToastRenderer} renderer
   */
  constructor(compositionEngine, container, renderer) {
    this._container = container;
    this._compositionEngine = compositionEngine;
    this._renderer = renderer;
  }

  /**
   * @param {string} message
   */
  async _show(message, type) {
    const host = this._renderer.createOrGetRootHost();
    /** @type {CompositionContext} */
    const compositionContext = {
      viewModel: { message, type },
      view: PLATFORM.moduleName('core/toast-service/toast.html'),
      container: this._container,
      bindingContext: undefined,
      viewResources: undefined,
      viewSlot: new ViewSlot(host, true)
    };
    /** @type {Controller} */
    // @ts-ignore
    const viewModelController = await this._compositionEngine.compose(compositionContext);
    // @ts-ignore
    const toastDiv = viewModelController.view.firstChild.nextSibling;
    await this._renderer.show(toastDiv);
    viewModelController.view.unbind();
    viewModelController.view.removeNodes();
  }

  async info(message) {
    await this._show(message, toastType.info);
  }

  async error(message) {
    await this._show(message, toastType.error);
  }
}
