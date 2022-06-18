import { bindable, bindingMode, computedFrom } from 'aurelia-framework';
/** @typedef {'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'} RibbonPosition */
/** @typedef {'dev' | 'recette' | 'preprod' | 'prod'} EnvironmentType */
/** @typedef {{ type: EnvironmentType, name: string }} EnvironmentDescriptor */

export class EnvironmentRibbonCustomElement {
  /** @type {EnvironmentDescriptor} */
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  environment;

  /** @type {RibbonPosition} */
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  position = 'top-left';

  @computedFrom('position')
  get cssPosition() {
    return this.position
      .split('-')
      .map(part => `er-${part}`)
      .join(' ');
  }

  @computedFrom('environment')
  get cssColor() {
    return `er-${this.environment.type.toLowerCase()}`;
  }
}
