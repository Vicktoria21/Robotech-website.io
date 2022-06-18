import { PLATFORM } from 'aurelia-framework';

export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('./custom-attributes/input-mask'),
    PLATFORM.moduleName('./elements/environment-ribbon/environment-ribbon'),
    PLATFORM.moduleName('./elements/loading-indicator/loading-indicator'),
    PLATFORM.moduleName('./value-converters/date-format'),
    PLATFORM.moduleName('./value-converters/number-format'),
    PLATFORM.moduleName('./value-converters/clean-input-mask')
  ]);
}
