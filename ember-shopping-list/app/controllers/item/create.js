import Controller from '@ember/controller';
import  { action } from '@ember/object';

export default class ItemCreateController extends Controller {

  @action
  handleCreateItem() {

    let item  = this.store.createRecord('item', {
        name: this.get('name'),
        price: this.get('price')
    });
    
    item.save();

  }
}
