import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | authentication', async function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('login', async function(assert) {
    await visit('/login');
    assert.equal(currentURL(), '/login');
    await fillIn('input#identification', 'lol')
    await fillIn('input#password', 'lol')
    await click('input[type=button]')
    assert.equal(currentURL(), '/item')
  }) 

  test('register qui fonctionne', async function(assert) {
    await visit('/register')
    assert.equal(currentURL(), '/register');
    await fillIn('input#username', 'string')
    await fillIn('input#password', 'string')
    await click('input[type=button]')
    assert.equal(currentURL(), '/login')
  })
});

