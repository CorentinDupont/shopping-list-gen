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
      await this.session.authenticate('authenticator:oauth2', identification, password);
    } catch (e) {
      this.set('errorMessage', e.error)
    };

    
    if(identification != null  && password != null ) 
    console.log('You\'re logged in !');
  }
}
