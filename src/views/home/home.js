import { inject } from 'aurelia-framework';
import { Connection } from 'aurelia-kis-oidc';

import { DialogService } from 'core/dialog-service/dialog-service';
import { ToastService } from 'core/toast-service/toast-service';
import { ApiService } from 'services/api-service';
import { SampleDialog } from 'views/dialogs/sample-dialog';
import { SuperIdolTest } from 'views/dialogs/super-idol-test';

@inject(ToastService, DialogService, Connection, ApiService)
export class Home {
  /** @type { Array<{ name: string }>} */

  quotes = [
    {id: 0, author : 'Midbeast', quote: 'That hunk of a man, Midbeast, is an E-sports athlete? Unbelievable. He could be a Calvin Klein model. Or a pro footballer with a ripped physique like that. That is by far the hottest Cyber sportsman to ever grace the esports industry. I\'d let him beast his way through my mid any day.',link: 'https://www.reddit.com/r/copypasta/comments/8bihqy/from_midbeasts_youtube_comments/'},
    {id: 1, author : 'Baus', quote: 'WP to this Sion he played safe during laning phase, minimized deaths and yea he let some cs go but now hes scaled and is working with his team to win the game! Well played to this Sion!',link: 'https://www.reddit.com/r/copypasta/comments/qpfrt0/wp_to_this_sion/'},
    {id: 2, author : 'Super Idol', quote: 'Super idol de xiao rong dou mei ni de tian ba yue zheng wu de yang guang dou mei ni yaoyan re\' ai 150°C de ni di di qing chun de zheng liu shui',link: 'https://www.youtube.com/watch?v=0GeQVtZ6Rd4'},
    {id: 3, author : 'promisq', quote :'what a slap in the face to any upcoming/aspiring caster/analyst etc to invite a twitch streamer that has zero competitive experience to analyze games on the LEC XD haha just yoking guys so funny memes ^^^ LOL',link: 'https://twitter.com/promisqxd/status/1415678926035111942'},
  ];

  InspirationalQuote = null;
  /**
   * @param {ToastService} toast
   * @param {DialogService} dialog
   * @param {Connection} connection
   * @param {ApiService} api
   */
  constructor(toast, dialog, connection, api) {
    this._toast = toast;
    this._dialog = dialog;
    this._connection = connection;
    this._api = api;
  }

  activate() {
  }

  show() {
    this._toast.info('Ceci est une info');
    this._toast.error('Ceci est une erreur !');
  }

  async modal() {
    const { wasCancelled, output } = await this._dialog.open({
      viewModel: SampleDialog,
      model: { unEntier: '1000' },
      locked: true
    });
    this.unEntier = !wasCancelled ? output.unEntier : '';
    this.wasCancelled = wasCancelled;
  }

  async modal2() {
    const { wasCancelled, output } = await this._dialog.open({
      viewModel: SuperIdolTest,
      model: { unEntier: '' },
      locked: true
    });
    this.unEntier = !wasCancelled ? output.unEntier : '';
    this.wasCancelled = wasCancelled;
  }
}
