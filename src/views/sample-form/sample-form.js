import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ToastService } from 'core/toast-service/toast-service';
import { ROUTE } from '../../constants/router-configuration';

@inject(Router, ToastService)
export class SampleForm {
  /** @type {Number} */
  montant;
  /** @type {Number} */
  taux;
  /** @type {Number} */
  nbPieces;

  /**
   * Crée une instance du modèle de l'écran SampleForm
   * @param {Router} router le routeur de l'application
   * @param {ToastService} toast le routeur de l'application
   */
  constructor(router, toast) {
    this._router = router;
    this.montant = 1200.5;
    this.taux = 0.125;
    this.nbPieces = 2;
    this.test = 42;
    this._toast = toast;
  }

  /**
   * Retour vers la page d'accueil
   * @returns boolean
   */
  async retourAccueil() {
    return this._router.navigateToRoute(ROUTE.home);
  }

  async sauvegarder() {
    this._toast.info('Sauvegarde effectuée');
  }

  // Affiche les paroles de Super Idol :)
  async secretMessage(){
    this._toast.error('Super Idol de xiao long');
    setTimeout(()=> this._toast.info('Dou mei ni de tian'),1500);
    setTimeout(()=> this._toast.error('ba yue zheng wu de yang guang'),3000);
    setTimeout(()=> this._toast.info('dou mei ni yaoyan'),4500);
    setTimeout(()=> this._toast.error('e\' ai 150°C de ni'),6000);
    setTimeout(()=> this._toast.info('di di qing chun de zheng liu shui'),8000);
  }
}
