/* eslint-disable ember/no-ember-super-in-es-classes */
import Controller from '@ember/controller';
import  { action } from '@ember/object';
/*import { tracked } from '@glimmer/tracking';*/

export default class ItemCreateController extends Controller {
  @action
  create() {
    this.model.save()
  }
}
