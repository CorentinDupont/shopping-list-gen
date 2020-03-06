import Controller from '@ember/controller';
import  { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ItemCreateController extends Controller {

  @tracked
  error = {
    name: null,
    price: null
  }; 
  @action
  handleCreateItem() {
    if (this.validate) 
      this.model.save();
      this.transitionToRoute('item');
  }
  @action
  validate() {
    this.error = {
      name: null,
      price: null
    }; 
    const testPrice = typeof this.model.price === 'number' && Number(this.model.price) !== NaN && this.model.price > 0;
    const testName = typeof this.model.name === 'string' && !!this.model.name.trim();
    if (!testPrice) {
      this.error.price = 'Le prix doit être un nombre et supérieur à 0';
    }
    if (!testName) {
      this.error.name = 'Le nom de l\'item ne peut être vide';
    }

    if (testPrice && testName) 
      return true;
    else
      return false
  }
}
