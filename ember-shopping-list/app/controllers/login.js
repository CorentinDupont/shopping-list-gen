import Controller from '@ember/controller';
import { inject } from '@ember/serivce';

export default Controller.extend({
  session: inject.service('session'),
  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password)
      .catch(e => {this.set('errorMessage', e.error)})
    }

  }
})