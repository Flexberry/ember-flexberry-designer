import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visual-edit-form', 'Integration | Component | visual edit form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visual-edit-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visual-edit-form}}
      template block text
    {{/visual-edit-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
