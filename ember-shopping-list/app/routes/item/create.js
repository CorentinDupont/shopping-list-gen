import Route from '@ember/routing/route';

export default class ItemCreateRoute extends Route {

  model(){
    return this.store.createRecord('item')
  }
} 
