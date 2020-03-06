import Controller from '@ember/controller';
import { getOwner } from '@ember/application';
import { action } from '@ember/object';


export default class LoginController extends Controller {
  @action
  async authenticate() {
    let { identification, password } = this.getProperties('identification', 'password');

    // try {
      let session = getOwner(this).lookup('service:session');
      await session.authenticate('authenticator:oauth2', identification, password).catch( (e) => {
        console.error(e);
       this.set('errorMessage', `${e.status} ${e.statusText} !`);
      });
  }
}
