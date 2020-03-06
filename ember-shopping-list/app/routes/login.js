import Route from '@ember/routing/route';

export default class LoginRoute extends Route {
    model() {
        return this.store.findAll('user');
    }
}
