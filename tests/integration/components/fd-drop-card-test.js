import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-drop-card', 'Integration | Component | fd-drop-card', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.set('myAction', function(val) { ... });

  this.render(hbs`{{fd-drop-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#fd-drop-card}}
      template block text
    {{/fd-drop-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
