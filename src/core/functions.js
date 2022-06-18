/**
 * Pause l'exécution pendant le délai spécifié  en millisecondes.
 * @param {number} delay - délai en millisecondes
 * @return {Promise} La promise résolue à l'issue du délai
 */
export const wait = delay => new Promise(resolve => setTimeout(resolve, delay));

/**
 * Est-ce que le paramètre spécifié est null ou undefined ?
 * @param {*} value - l'objet à tester
 * @return {boolean} true si l'objet est null ou undefined, false sinon.
 */
export const isNil = value => value === undefined || value === null;

/**
 * Est-ce que le paramètre spécifié est null, undefined ou vide ?
 * @param {*} value - l'objet à tester
 * @return {boolean} true si l'objet est null ou undefined ou vide, false sinon.
 */
export const isNilOrEmpty = value =>
  value === undefined ||
  value === null ||
  value.length === 0 ||
  Object.getOwnPropertyNames(value).length === 0;
