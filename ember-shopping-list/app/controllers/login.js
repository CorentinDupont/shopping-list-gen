import Controller from '@ember/controller';
import {
  getOwner
} from '@ember/application';
import {
  action
} from '@ember/object';


export default class LoginController extends Controller {
  @action
  async authenticate() {
    let {
      identification,
      password
    } = this.getProperties('identification', 'password');
    let session = getOwner(this).lookup('service:session');
    await session.authenticate('authenticator:oauth2', identification, password).catch((e) => {
      console.error(e);
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
