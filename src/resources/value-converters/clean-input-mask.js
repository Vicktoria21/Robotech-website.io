export class CleanInputMaskValueConverter {
  /**
   * Convertit la valeur
   * @param {string} value
   * @param {number} minimumFractionDigits
   * @returns {number | string}
   */
  fromView(value, minimumFractionDigits = 2) {
    const filteredValue = value.replace(/ /g, '').replace(/_/g, '').replace(',', '.').replace('€', '').trim();
    const parsedValue = Number.parseFloat(filteredValue);
    if (Number.isNaN(parsedValue)) return;
    return parsedValue;
  }
}
