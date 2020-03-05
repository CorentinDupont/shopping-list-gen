import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember-decorators/object';

export default class LoginController extends Controller {
  // session=inject.service('session');

  @action
  authenticate() {
    let { identification, password } = this.getProperties('identification', 'password');
    this.get('session').authenticate('authenticator:oauth2', identification, password)
    .catch(e => {this.set('errorMessage', e.error)})
  }
}