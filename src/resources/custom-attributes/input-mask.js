import { inject, customAttribute, DOM } from 'aurelia-framework';
import Inputmask from 'inputmask';

/** @type {Inputmask.Options} */
const defaultMaskConfiguration = {
  rightAlign: false,
  radixPoint: ',',
  groupSeparator: ' ',
  positionCaretOnClick: 'radixFocus',
  jitMasking: true
};

/** @type {Record<string, Inputmask.Options>} */
const maskConfiguration = {
  currency: {
    radixPoint: ',',
    groupSeparator: ' ',
    digits: 2,
    jitMasking: true,
    positionCaretOnClick: 'radixFocus'
  },
  percentage: {
    min: 0,
    max: 100,
    radixPoint: ',',
    groupSeparator: ' ',
    digits: 1,
    jitMasking: true,
    suffix: ''
  }
};

@customAttribute('input-mask')
@inject(DOM.Element)
export class InputMaskCustomAttribute {
  /** @type {HTMLInputElement} */
  element;

  /** @type {string} */
  value;

  /**
   * @param {HTMLInputElement} element
   */
  constructor(element) {
    this.element = element;
  }

  attached() {
    const inputMask = new Inputmask(this.value, maskConfiguration[this.value] || defaultMaskConfiguration);
    inputMask.mask(this.element);
  }
}
