import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

async function login() {
  await visit('/login');
  await fillIn('input#identification', 'string');
  await fillIn('input#password', 'string');
  await click('button[type=submit]');
}
module('Acceptance | item', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('login', async function(assert) {
    await login()
    assert.equal(currentURL(), '/login')
  });

  test('visiting /item/create', async function(assert) {
    await login()
    await visit('/item/create');
    assert.equal(currentURL(), '/item/create');
  });

  // valid item creation
  test('create item', async function(assert) {
    await login()
    await visit('/item/create');
    assert.equal(currentURL(), '/item/create');
    await fillIn('input#name', 'Bonjour');
    await fillIn('input#price', 5);
    await click('input[type=button]')
    assert.equal(currentURL(), '/item');
    await visit('/item/create');
    assert.equal(currentURL(), '/item/create');
    await fillIn('input#name', 'Bonsoir');
    await fillIn('input#price', 5);
    await click('input[type=button]')
    assert.equal(this.element.querySelectorAll('.item-detail').length, 2)
  });

  // invalid item creation caused by invalid value in form
  test('bad form informations to create item', async function(assert) {
    await visit('/item/create');
    assert.equal(currentURL(), '/item/create');

    const nameLabelText = this.element.querySelector('label[for=name]').textContent;
    const priceLabelText = this.element.querySelector('label[for=price]').textContent;
    await fillIn('input#name', '');
    await fillIn('input#price', -3);
    await click('input[type=button]')
    assert.equal(currentURL(), '/item/create');
    assert.notEqual(
      this.element.querySelector('label[for=name]').textContent,
      nameLabelText,
    )
    assert.notEqual(
      this.element.querySelector('label[for=price]').textContent,
      priceLabelText,
    )
  });

  // invalid item creation caused by duplicate item name in db
  test('duplicate name while creating item', async function(assert) {
    await visit('/item/create');
    assert.equal(currentURL(), '/item/create');
    const nameLabelText = this.element.querySelector('label[for=name]').textContent;

    await fillIn('input#name', 'myItemName');
    await fillIn('input#price', 5);
    await click('input[type=button]')
    
    await visit('/item/create');
    await fillIn('input#name', 'myItemName');
    await fillIn('input#price', 5);
    await click('input[type=button]');

    assert.equal(currentURL(), '/item/create')
    assert.notEqual(
      this.element.querySelector('label[for=name]').textContent,
      nameLabelText,
    )

  });
});

