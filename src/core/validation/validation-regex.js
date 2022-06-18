export const validationRegex = {
  alphanumerique: /^\w*$/,
  entier: /^\d+$/,
  etatCivil:
    /^(?=.*[A-Za-zÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåæçèéêëìíîïñòóôõöùúûüýÿŒœŸ])[ 'A-Za-zÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåæçèéêëìíîïñòóôõöùúûüýÿŒœŸ-]*$/,
  email: /^([\dA-Za-z]([+._-][\dA-Za-z]+)*)+@(([\dA-Za-z][\dA-Za-z-]*[\dA-Za-z]*\.)+[\dA-Za-z]{2,17})$/,
  telephone: /^(01|02|03|04|05|06|07|09)\d{8}$/i,
  telephonePortable: /^(06|07)\d{8}$/i
};
