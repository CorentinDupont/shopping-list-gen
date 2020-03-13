import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RegisterController extends Controller {
    @tracked username
    @tracked password

    @action
    async create(){
        let user = this.store.createRecord('user', {username: this.model.username, password: this.model.password})
        user.save()
        this.transitionToRoute('login')
    }
}
