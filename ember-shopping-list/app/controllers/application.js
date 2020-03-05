import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  // session=inject.service('session');

  @action
  logout() {
    this.get('session').invalidate();
  }
}