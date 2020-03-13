import Route from '@ember/routing/route';

export default class RegisterRoute extends Route {
    model(){
        return this.store.createRecord('user')
    }
}
