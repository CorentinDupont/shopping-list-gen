import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click, pauseTest  } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | item', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /item/create', async function(assert) {
    await visit('/item/create');

    assert.equal(currentURL(), '/item/create');
  });
  test('create item', async function(assert) {
    await visit('/item/create');
    assert.equal(currentURL(), '/item/create');
    await fillIn('input#name', 'Bonjour');
    await fillIn('input#price', '5');
    await click('button[type=submit]')

    
  });
});
