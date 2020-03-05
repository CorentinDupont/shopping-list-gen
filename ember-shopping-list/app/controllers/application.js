import Controller from '@ember/controller';
import { inject } from '@ember/serivce';

export default Controller.extend({
  session: inject.service('session'),
  actions: {
    logout(){
      this.get('session').invalidate();
    }
  }

})