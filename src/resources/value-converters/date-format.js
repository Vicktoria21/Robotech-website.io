import { DATE_FORMAT } from '../../constants/application-constants';
import { isNilOrEmpty } from 'core/functions';
import dayjs from 'core/dayjs';

export class DateFormatValueConverter {
  /**
   * Convertit la valeur de date au format spécifié en string ISO 8601 UTC pour le stockage
   * @param {string} value
   * @param {string} format
   * @returns {string}
   */
  fromView(value, format = DATE_FORMAT) {
    if (isNilOrEmpty(value)) return;
    if (!dayjs(value, format, true).isValid()) return;
    return dayjs.utc(value, format).toISOString();
  }

  /**
   * Convertit la valeur ISO 8601 UTC fournie en string pour l'affichage au format spécifié
   * @param {string} value
   * @param {string} format
   * @returns {string}
   */
  toView(value, format = DATE_FORMAT) {
    if (isNilOrEmpty(value)) return;
    return dayjs.utc(value).local().format(format);
  }
}
