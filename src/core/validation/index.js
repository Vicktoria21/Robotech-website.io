import { defineValidationMessages } from './messages';
import { defineCustomRules } from './custom-rules';

export function configureValidation() {
  // définit les messages de validation génériques
  defineValidationMessages();
  // définit des règles de validation génériques
  defineCustomRules();
}
