import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';



module('Acceptance | item', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /item', async function(assert) {
    await visit('/item');

    assert.equal(currentURL(), '/item');
  });
});
