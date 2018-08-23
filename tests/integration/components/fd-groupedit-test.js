import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-groupedit', 'Integration | Component | fd-groupedit', {
  integration: true
});

test('it renders and enough', function(assert) {
  this.render(hbs`{{fd-groupedit}}`);
  assert.equal(this.$().text().trim(), '');
});
