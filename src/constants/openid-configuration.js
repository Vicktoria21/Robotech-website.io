import { WebStorageStateStore, Log } from 'oidc-client';
import { AureliaConfiguration } from 'aurelia-configuration';
import { LogManager } from 'aurelia-framework';

import { NUMBER_LOCALE } from './application-constants';
import { DialogService } from 'core/dialog-service/dialog-service';
import { ReconnectionDialog } from 'views/dialogs/reconnection-dialog';

const OPENID_PLUGIN = 'OpenidPlugin';

/** @type {(error: Record<string, string>) => boolean} */
const loginRequiredSelector = error =>
  error.error === 'interaction_required' ||
  error.error === 'login_required' ||
  error.message === 'invalid_grant';

/** @type {(profile: Record<string, string>) => string} */
const userIdClaimSelector = profile => profile.preferred_username;

/** @type {(aurelia: Aurelia) => (loginFunction: () => void) => void} */
const reconnectPrompt = aurelia => loginFunction => {
  const dialog = aurelia.container.get(DialogService);
  return dialog.open({ viewModel: ReconnectionDialog, model: { loginFunction } });
};

/** @type {(aurelia: Aurelia) => PluginConfiguration} */
export default aurelia => {
  const configuration = aurelia.container.get(AureliaConfiguration);
  const openidConfiguration = configuration.get('authentication');
  const logger = LogManager.getLogger(OPENID_PLUGIN);
  Log.level = Log.DEBUG; // Log.INFO;
  Log.logger = logger;

  return {
    userIdClaimSelector,
    loginRequiredSelector,
    reconnectPrompt: reconnectPrompt(aurelia),
    userManagerSettings: {
      // Paramètres OpenID Connect
      authority: openidConfiguration.authority,
      client_id: openidConfiguration.clientId,
      response_type: 'code',
      scope: `openid profile email ${openidConfiguration.apiScope}`,
      post_logout_redirect_uri: `${openidConfiguration.redirectHost}/signout-oidc`,
      redirect_uri: `${openidConfiguration.redirectHost}/signin-oidc`,
      silent_redirect_uri: `${openidConfiguration.redirectHost}/signin-oidc`,
      // Autres paramètres
      // - définit le nombre de seconde d'avance sur l'expiration du token pour déclencher l'événement 'accessTokenExpiring'
      accessTokenExpiringNotificationTime: 90,
      // - définit la tolérance d'écart de temps pour la date d'expiration du token côté client (en s)
      clockSkew: 90,
      // - déactive le renouvellement automatique et transparente de l'access token
      automaticSilentRenew: false,
      // - déactive le monitoring de la session utilisateur au niveau du fournisseur OIDC pour déclencher l'événement 'userSignedOut'
      monitorSession: false,
      // - désactive la suppression des claims du protocole OIDC dans la propriété user.profile
      filterProtocolClaims: false,
      // - désactive l'appel du endpoint userInfo pour récupérer des attributs utilisateurs supplémentaires
      loadUserInfo: false,
      // - définit le stockage
      stateStore: new WebStorageStateStore({
        store: window.sessionStorage
      }),
      userStore: new WebStorageStateStore({
        store: window.sessionStorage
      }),
      ui_locales: NUMBER_LOCALE
    }
  };
};
