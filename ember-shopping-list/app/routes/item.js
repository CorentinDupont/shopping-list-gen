import Route from '@ember/routing/route';

export default class ItemRoute extends Route {
    model() {
        return ['Carotte', 'Pomme de terre', 'José Bové'];
      }
}
