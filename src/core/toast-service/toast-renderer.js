import { DOM } from 'aurelia-framework';
import { Toast } from 'bootstrap';

const hideDelay = 7000;

/**
 * Implémente l'affichage de la fenêtre modale
 */
export class ToastRenderer {
  /** @type {HTMLElement} */
  static _rootContainer;
  /** @type {Toast} */
  _bsToast;

  /**
   * Crée ou retourne le conteneur html (div) qui héberge les toasts
   * @returns {HTMLElement}
   */
  createOrGetRootHost() {
    if (!ToastRenderer._rootContainer) {
      // @ts-ignore
      ToastRenderer._rootContainer = DOM.createElement('div');
      ToastRenderer._rootContainer.setAttribute(
        'class',
        'toast-container position-absolute bottom-0 end-0 p-3'
      );
      DOM.querySelector('body').append(ToastRenderer._rootContainer);
    }
    return ToastRenderer._rootContainer;
  }

  /**
   * Ouvre le toast
   * @returns {Promise<void>}
   */
  async show(toastHost) {
    this._bsToast = new Toast(toastHost, { delay: hideDelay });
    this._bsToast.show();
    return new Promise((resolve, _reject) => {
      toastHost.addEventListener('hidden.bs.toast', () => {
        toastHost.remove();
        resolve();
      });
    });
  }
}
