import { PLATFORM } from 'aurelia-framework';

// Ici qu'on donne les noms de chaque onglet

/**
 * L'énumération des noms de routes de l'application
 */
export const ROUTE = {
  home: 'home',
  formulaire: 'formulaire',
  parametre: 'parametre',
  youtube : 'youtube',
  accueil : 'accueil'
};

/**
 * Le tableau des routes de l'application
 * @type {Array<RouteConfig>}
 */
export const routes = [
  {
    route: ['','accueil'],
    name: ROUTE.accueil,
    moduleId: PLATFORM.moduleName('views/accueil/accueil'),
    nav: true,
    title: 'Accueil'
  },
  {

    route: ['home'],
    name: ROUTE.home,
    moduleId: PLATFORM.moduleName('views/home/home'),
    nav: true,
    title: 'Temp'
  },
  {
    route: 'formulaire',
    name: ROUTE.formulaire,
    moduleId: PLATFORM.moduleName('views/sample-form/sample-form'),
    nav: true,
    title: 'Formulaire'
  },
  {
    route: 'parametre',
    name: ROUTE.parametre,
    moduleId: PLATFORM.moduleName('views/settings/settings'),
    nav: false,
    title: 'Paramètres'
  },
  {
    route: 'youtube',
    name: ROUTE.youtube,
    moduleId: 'youtube',
    href: 'https://www.youtube.com/',
    nav: true,
    title: 'Youtube'
  }
];

