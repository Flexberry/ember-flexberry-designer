import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-object-list-view', 'Integration | Component | fd-object-list-view', {
  integration: true
});

test('it renders and works', function(assert) {
  this.render(hbs`{{fd-object-list-view view=ne-view}}`);

  assert.equal(this.$().text().trim(), '');

  this.set('ne-view', {
    definition: Ember.A([
      { caption: 'Column #1' },
      { caption: 'Column #2' },
    ]),
  });

  assert.equal(this.$('thead tr').length, 1, 'The table has a header.');
  assert.equal(this.$('tbody tr').length, 5, 'In the table 5 rows.');
  assert.ok(/\s*Column #1\s*Column #2\s*/.test(this.$('th').text()), 'The headers are correct.');
});
