import Controller from '@ember/controller';
// import { inject } from '@ember/service';
import {
  action
} from '@ember/object';


export default class LoginController extends Controller {
  // session = inject.service('session');

  @action
  async authenticate() {
    let { identification, password } = this.getProperties('identification', 'password');

    try {
      // debugger;
      // await this.session.authenticate('authenticator:oauth2', identification, password);
      this.get('session').authenticate('authenticator:oauth2', identification, password);
      debugger;
    } catch (e) {
      this.set('errorMessage', e.error)
    }
  }
}
