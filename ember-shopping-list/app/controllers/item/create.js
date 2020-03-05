import Controller from '@ember/controller';
import  { action } from '@ember/object';

export default class ItemCreateController extends Controller {

  @action
  handleCreateItem() {
    debugger;
    
    
    this.model.save();

  }
}
