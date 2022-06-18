import 'regenerator-runtime/runtime';
import { Home } from '../../../../src/views/home/home';

const toast = {};
const dialog = {};
const noConnection = {
  isUserLoggedIn: false
};
const connection = {
  isUserLoggedIn: true
};
const api = {
  getProjets: jest.fn(() => [{ id: 1, nom: 'Projet' }])
};

describe('Le viewmodel Home', () => {
  let sut;

  describe(`si l'utilisateur n'est pas connecté`, () => {
    beforeEach(() => {
      sut = new Home(toast, dialog, noConnection, api);
    });

    it(`ne récupère pas les projets`, () => {
      sut.activate();
      expect(api.getProjets).not.toBeCalled();
    });
  });

  describe(`si l'utilisateur est pas connecté`, () => {
    beforeEach(() => {
      sut = new Home(toast, dialog, connection, api);
    });

    it(`récupère pas les projets`, () => {
      sut.activate();
      expect(api.getProjets).toBeCalled();
    });
  });
});
