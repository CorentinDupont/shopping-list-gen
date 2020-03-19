import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession } from 'ember-simple-auth/test-support'

module('Acceptance | item', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function (){
    await authenticateSession({
      token: 'abcdDEF',
      token_type: 'Bearer'
    });
  })

  test('visiting /item', async function(assert) {
    await visit('/item');

    assert.equal(currentURL(), '/item');
  });
});
