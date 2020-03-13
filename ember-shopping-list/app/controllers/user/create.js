/* eslint-disable ember/no-ember-super-in-es-classes */
import Controller from '@ember/controller';
import  { action } from '@ember/object';

export default class UserCreateController extends Controller {
  @action
  create() {
    this.model.save()
  }
}
