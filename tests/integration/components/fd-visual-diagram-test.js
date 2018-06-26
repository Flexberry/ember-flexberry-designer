import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-visual-diagram', 'Integration | Component | fd visual diagram', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{fd-visual-diagram}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#fd-visual-diagram}}
      template block text
    {{/fd-visual-diagram}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
