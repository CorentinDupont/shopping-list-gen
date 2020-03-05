/* eslint-disable ember/no-ember-super-in-es-classes */
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
  async handleCreateItem() {
    const items = await this.store.findAll('item');
    if (this.validate()) {
      let tested_item = items.filter(e => e.get('name') === this.model.name && e.get('isNew') !== true)
      if (tested_item.length > 0) {
        this.error.name = 'Un ingrédient avec ce nom existe déjà'
      } else {
        this.model.save()
        .then(() => {
          this.transitionToRoute('item')
        })
        .catch(adapterError => {
          switch(adapterError.errors[0].status) {
            case "400": 
            this.error = {...this.error, name: 'Un ingrédient avec ce nom existe déjà'}
          }
        });
      }
    }
  }
  @action
  validate() {
    
    this.error = {
      name: null,
      price: null
    }; 
    const testPrice = typeof Number(this.model.price) === 'number' && !isNaN(this.model.price) && this.model.price > 0;
    const testName = typeof this.model.name === 'string' && !!this.model.name.trim();
    if (!testPrice) {
      this.error.price = 'Le prix doit être un nombre et supérieur à 0';
    }
    if (!testName) {
      this.error.name = 'Le nom de l\'item ne peut être vide';
    }
    if (testPrice && testName){
      return true;
    }else{
      return false
    }
  }
}
