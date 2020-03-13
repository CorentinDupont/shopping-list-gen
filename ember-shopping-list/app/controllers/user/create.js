/* eslint-disable ember/no-ember-super-in-es-classes */
import Controller from '@ember/controller';
import  { action } from '@ember/object';
/*import { tracked } from '@glimmer/tracking';*/

export default class UserCreateController extends Controller {
  @action
  create() {
    console.log(this.model)
    this.model.save()
  }
}
