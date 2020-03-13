import Route from '@ember/routing/route';

export default class ItemCreateRoute extends Route/*.extend(AuthenticatedRouteMixin)*/ {

  model(){
    return this.store.createRecord('item')
  }
} 
