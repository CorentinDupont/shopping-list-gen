import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class ItemCreateRoute extends Route.extend(AuthenticatedRouteMixin) {

  model(){
    return this.store.createRecord('item')
  }
} 
