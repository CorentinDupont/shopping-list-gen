import Route from '@ember/routing/route';

export default class ItemRoute extends  Route/*.extend(AuthenticatedRouteMixin) */ {

  model() {
    return this.store.findAll('item');
  }

}
