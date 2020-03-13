import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginController extends Controller {
  @tracked
  session = service()

  @action
  invalidateSession() {
    this.get('session').invalidate();
  }

  @action
  sessionRequiresAuthentication(){
    this.get('session').validate();
  }
}