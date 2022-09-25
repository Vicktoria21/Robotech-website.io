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
  accueil : 'accueil',
  who : 'who'
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
    route: 'who',
    name: ROUTE.who,
    moduleId: PLATFORM.moduleName('views/who/who'),
    nav: true,
    title: 'Qui sommes-nous ?',
    
  },
  {

    route: 'actu',
    name: ROUTE.actu,
    moduleId: PLATFORM.moduleName('views/actu/actu'),
    nav: true,
    title: 'Notre Actu'
  },
  {
    route: 'projets',
    name: ROUTE.projets,
    moduleId: PLATFORM.moduleName('views/projets/projets'),
    nav: true,
    title: 'Nos Projets'
  },
  {
    route: 'photos',
    name: ROUTE.photos,
    moduleId: PLATFORM.moduleName('views/photos/photos'),
    nav: true,
    title: 'Nos Photos'
  },
  {
    route: 'contact',
    name: ROUTE.contact,
    moduleId: PLATFORM.moduleName('views/contact/contact'),
    nav: true,
    title: 'Nous Contacter'
  }
];

