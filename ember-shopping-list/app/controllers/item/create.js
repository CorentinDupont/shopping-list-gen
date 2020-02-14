import Controller from '@ember/controller';

export default class ItemCreateController extends Controller {
    actions: {
        handleCreateItem: function() {
            alert(`Item ${this.get('name')} added !`);
        }
    }
}
