import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click, pauseTest, andThen } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | item', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  test('visiting /item/create', async function(assert) {
    await visit('/item/create');

    assert.equal(currentURL(), '/item/create');
  });
  test('create item', async function(assert) {
    await visit('/item/create');
    assert.equal(currentURL(), '/item/create');
    await fillIn('input#name', 'Bonjour');
    await fillIn('input#price', 5);
    await click('input[type=button]')
    assert.equal(currentURL(), '/item');
  });
});

