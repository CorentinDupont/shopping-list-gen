import Controller from '@ember/controller';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';

export default class AppController extends Controller {
  get session() {
    return getOwner(this).lookup('service:session');
  }
  
  @action
  invalidateSession() {
    this.session.invalidate();
  }

  @action
  sessionRequiresAuthentication(){
    this.session.validate();
  }
}