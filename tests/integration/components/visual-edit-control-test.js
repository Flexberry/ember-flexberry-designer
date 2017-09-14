import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visual-edit-control', 'Integration | Component | visual edit control', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visual-edit-control}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visual-edit-control}}
      template block text
    {{/visual-edit-control}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
