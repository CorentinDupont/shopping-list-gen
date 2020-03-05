// import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
// import Route from '@ember/routing/route';

// export default Route.extend(ApplicationRouteMixin);


import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin);
