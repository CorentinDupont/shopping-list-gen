import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | item/create', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:item/create');
    assert.ok(controller);
  });

  test('it creates', function(assert) {
    let controller = this.owner.lookup('controller:item/create');

    controller.send('handleCreateItem')
  })
});
