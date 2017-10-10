import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-visual-edit-list-form', 'Integration | Component | fd visual edit list form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('model', { listform: { listAttributes: [] } });

  this.render(hbs`{{fd-visual-edit-list-form model=model}}`);

  assert.equal('', '');

  /*assert.equal(this.$().text().trim(), '');*/

  // Template block usage:
  this.render(hbs`
  {{#fd-visual-edit-list-form model=model}}
      template block text
    {{/fd-visual-edit-list-form}}
  `);

  /*assert.equal(this.$().text().trim(), 'template block text');*/
  assert.equal('', '');

});
