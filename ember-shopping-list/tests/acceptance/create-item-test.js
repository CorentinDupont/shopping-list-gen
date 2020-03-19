import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

import { authenticateSession } from 'ember-simple-auth/test-support'

module('Acceptance | create-item', async function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  
  hooks.beforeEach(async function (){
    await authenticateSession({
      token: 'abcdDEF',
      token_type: 'Bearer'
    });
  })

  // valid item creation
  test('create item', async function(assert) {
    await visit('/item/create');
    assert.equal(currentURL(), '/item/create');
    await fillIn('input#name', 'Bonjour');
    await fillIn('input#price', 2);
    await click('input#create-item-button')
    assert.equal(currentURL(), '/item');
    await visit('/item/create');
    assert.equal(currentURL(), '/item/create');
    await fillIn('input#name', 'Bonsoir');
    await fillIn('input#price', 5);
    await click('input#create-item-button')
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
    await click('input#create-item-button')
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

  //invalid item creation caused by duplicate item name in db
  test('duplicate name while creating item', async function(assert) {
    await visit('/item/create');
    assert.equal(currentURL(), '/item/create');
    const nameLabelText = this.element.querySelector('label[for=name]').textContent;

    await fillIn('input#name', 'myItemName');
    await fillIn('input#price', 5);
    await click('input#create-item-button')
    
    await visit('/item/create');
    await fillIn('input#name', 'myItemName');
    await fillIn('input#price', 5);
    await click('input#create-item-button');
    assert.equal(currentURL(), '/item/create')
    assert.notEqual(
      this.element.querySelector('label[for=name]').textContent,
      nameLabelText,
    )
  });
});

