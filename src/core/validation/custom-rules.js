import { ValidationRules } from 'aurelia-validation';
import { validationRegex } from './validation-regex';

export function defineCustomRules() {
  ValidationRules.customRule(
    'emailValide',
    (propertyValue, _parentObject) => !propertyValue || propertyValue.match(validationRegex.email),
    `Ce champ n'est pas valide.`
  );

  ValidationRules.customRule(
    'intervalleEntier',
    (propertyValue, _parentObject, min, max) =>
      propertyValue === null ||
      propertyValue === undefined ||
      (Number.isInteger(propertyValue) && propertyValue >= min && propertyValue <= max),
    `Ce champ doit être compris entre \${$config.min} et \${$config.max} .`,
    (min, max) => ({
      min,
      max
    })
  );

  ValidationRules.customRule(
    'intervalleNombre',
    (propertyValue, _parentObject, min, max) =>
      propertyValue === null ||
      propertyValue === undefined ||
      (!Number.isNaN(propertyValue) && propertyValue >= min && propertyValue <= max),
    `Ce champ doit être compris entre \${$config.min} et \${$config.max} .`,
    (min, max) => ({
      min,
      max
    })
  );
}
