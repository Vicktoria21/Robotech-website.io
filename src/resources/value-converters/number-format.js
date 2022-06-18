import { NUMBER_LOCALE } from '../../constants/application-constants';

export class NumberFormatValueConverter {
  /**
   * Convertit la valeur fournie en string pour l'affichage
   * @param {number} value
   * @param {{ digits: Number?, suffix: string? }} options
   * @returns {string}
   */
  toView(value, options) {
    const { digits, suffix } = { digits: 2, suffix: '', ...options };
    if (!value || Number.isNaN(value)) return;
    return `${value.toLocaleString(NUMBER_LOCALE, { minimumFractionDigits: digits })}${suffix}`;
  }
}
