import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-control-panel-sequence-diagram', 'Integration | Component | fd control panel sequence diagram', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{fd-control-panel-sequence-diagram}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#fd-control-panel-sequence-diagram}}
      template block text
    {{/fd-control-panel-sequence-diagram}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
