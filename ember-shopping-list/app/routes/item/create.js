import Route from '@ember/routing/route';
import item from '../../../mirage/factories/item';

export default class ItemCreateRoute extends Route {

  model(){
    debugger;
    return this.store.createRecord('item')
  }
}
