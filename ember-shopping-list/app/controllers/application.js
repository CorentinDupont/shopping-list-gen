// import Ember from 'ember';
// import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
// export default Ember.Route.extend(ApplicationRouteMixin, {
//   actions: {
//     invalidateSession: function () {
//       this.get('session').invalidate();
//     }
//   }
// });


import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
  session: service(),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  },
  sessionRequiresAuthentication(){
    this.get('session').validate();
  }
});