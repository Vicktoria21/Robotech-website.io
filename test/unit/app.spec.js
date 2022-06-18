import 'regenerator-runtime/runtime';
import { App } from '../../src/app';
import { APPLICATION_TITLE } from '../../src/constants/application-constants';

const routerConfig = {
  title: '',
  options: {
    pushState: false,
    root: ''
  },
  fallbackRoute: jest.fn(),
  map: () => {}
};
class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}
const router = new RouterStub();
const configuration = {
  get: key => key
};
const openidRouting = {
  configureRouter: jest.fn()
};
const connection = {};
const clientConfigurator = {
  configure: jest.fn()
};
const indicator = {};

describe('Le module App', () => {
  let sut;

  beforeEach(() => {
    sut = new App(router, configuration, openidRouting, connection, clientConfigurator, indicator);
    sut.configureRouter(routerConfig, router);
  });

  describe('expose pour le databinding la propriété', () => {
    it(`'router' => l'affichage des routes dans la navbar`, () => {
      expect(sut.router).toBeDefined();
    });
    it(`'environment' => affichage du ruban environnement`, () => {
      expect(sut.environment).toBeDefined();
    });
    it(`'connection' => gestion de la connexion oidc`, () => {
      expect(sut.connection).toBeDefined();
    });
    it(`'dateDuJour' => affichage date dans le footer`, () => {
      expect(sut.dateDuJour).toBeDefined();
    });
    it(`'applicationTitle' => affichage dans l'écran de connexion`, () => {
      expect(sut.applicationTitle).toEqual(APPLICATION_TITLE);
    });
  });

  it(`définit les routes avec des '/'`, () => {
    expect(routerConfig.options.pushState).toEqual(true);
  });
  it(`configure 'home' comme route par défaut`, () => {
    expect(routerConfig.fallbackRoute).toBeCalledWith('home');
  });
  it('définit les routes directement à la racine', () => {
    expect(routerConfig.options.root).toEqual('/');
  });

  it(`configure la connexion oidc avec le router`, () => {
    expect(openidRouting.configureRouter).toBeCalledWith(routerConfig);
  });
  it(`configure les clients http`, () => {
    expect(clientConfigurator.configure).toBeCalled();
  });
});
