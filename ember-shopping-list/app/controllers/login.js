import Controller from '@ember/controller';
import { getOwner } from '@ember/application';

// import { inject } from '@ember/service';
import {
  action
} from '@ember/object';


export default class LoginController extends Controller {
  @action
  async authenticate() {
    let { identification, password } = this.getProperties('identification', 'password');

    try {
      let session = getOwner(this).lookup('service:session');
      // await this.session.authenticate('authenticator:oauth2', identification, password);
      session.authenticate('authenticator:oauth2', identification, password);
      
    } catch (e) {
      this.set('errorMessage', e.error)
    }
  }
}
