import { validationMessages } from 'aurelia-validation';

export function defineValidationMessages() {
  validationMessages.default = `Ce champ doit être valide.`;
  validationMessages.required = 'Ce champ doit être renseigné.';
  validationMessages.matches = `Ce champ  n'est pas au bon format.`;
  validationMessages.email = `Le format de l'email est incorrect.`;
  validationMessages.minLength = `Ce champ doit faire au moins \${$config.length} caractère\${$config.length === 1 ? '' : 's'}.`;
  validationMessages.maxLength = `Ce champ est limité à \${$config.length} caractère\${$config.length === 1 ? '' : 's'}.`;
  validationMessages.minItems = `Ce champ doit contenir au moins \${$config.count} item\${$config.count === 1 ? '' : 's'}.`;
  validationMessages.maxItems = `Ce champ ne doit pas contenir moins de \${$config.count} item\${$config.count === 1 ? '' : 's'}.`;
  validationMessages.min = `Ce champ doit valoir au minimum \${$config.constraint}.`;
  validationMessages.max = `Ce champ doit valoir au maximum \${$config.constraint}.`;
  validationMessages.range = `Ce champ doit valoir entre \${$config.min} (inclus) et \${$config.max} (inclus).`;
  validationMessages.between = `Ce champ doit valoir entre \${$config.min} et \${$config.max}.`;
  validationMessages.equals = `Ce champ doit valoir \${$config.expectedValue}.`;
}
