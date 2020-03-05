import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';
// import { isEmpty } from '@ember/utils';

// export default Base.extend({
  
//     authorize: function (jqXHR, requestOptions) {
//     var accessToken = this.get('session.content.secure.token');
//     if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
//       jqXHR.setRequestHeader('Authorization', 'Bearer ' + accessToken);
//     }
//   }
// });

export default Ember.Service.extend({
  accessToken: null,
  authenticate(login, password) {
    return Ember.$.ajax({
      method: "POST",
      url: "/token",
      data: { username: login, password: password }
    }).then((result) => {
      this.set('accessToken', result.access_token);
    });
  },
  invalidate() {
    this.set('accessToken', null);
  },
  isAuthenticated: Ember.computed.bool('accessToken')
});