import Controller from '@ember/controller';
import EmberObject, { action } from '@ember/object';
import Application from '@ember/application';

export default class RegisterController extends Controller {

    @action
    async accountCreation(){
        let user = this.store.createRecord('user', {username: this.indentification, password: this.password})
        user.save()
        this.transitionToRoute('login')
    }
}
