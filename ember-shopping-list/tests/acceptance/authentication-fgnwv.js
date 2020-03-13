import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | authentication', async function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
    
  /*
  hooks.beforeEach(async function (){
    await authenticateSession({
      token: 'abcdDEF',
      token_type: 'Bearer'
    });
  })
  */

  test('login', async function(assert) {
    await visit('/login');
    assert.equal(currentURL(), '/login');
    await fillIn('input#identification', 'lol')
    await fillIn('input#password', 'lol')
    await click('button[type=submit]')
    assert.equal(currentURL(), '/')
  }) 

  test('register qui fonctionne',async function(assert) {
    await visit('/register')
    assert.equal(currentURL(), '/register');
    await fillIn('input#identification', 'lol')
    await fillIn('input#password', 'lol')
    await click('button[type=submit]')
    assert.equal(currentURL(), '/')
  })
});

