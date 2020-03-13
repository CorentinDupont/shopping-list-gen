import Controller from '@ember/controller';
import {
  getOwner
} from '@ember/application';
import {
  action
} from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class LoginController extends Controller {
  @tracked identification
  @tracked password

  @action
  async authenticate() {
    let session = getOwner(this).lookup('service:session');
    await session.authenticate('authenticator:oauth2', this.identification, this.password).catch((e) => {
      if (e.status == 400) {
        this.set('errorMessage', `Erreur ! identifiant et/ou mot de passe incorrect(s) !`);
      }
    });
  }

  @action
  async logout() {
    let session = getOwner(this).lookup('service:session');
    await session.invalidate();
  }
}
