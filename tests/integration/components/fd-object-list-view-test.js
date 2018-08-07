import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-object-list-view', 'Integration | Component | fd-object-list-view', {
  integration: true
});

test('it renders and works', function(assert) {
  this.render(hbs`{{fd-object-list-view headers=headers rows=rows showCheckBoxInRow=showCheckBoxInRow}}`);

  assert.equal(this.$().text().trim(), '');

  this.set('headers', Ember.A(['Column #1', 'Column #2']));
  this.set('rows', Ember.A([
    Ember.A(['Cell #1', 'Cell #2']),
    Ember.A(['Cell #3', 'Cell #4']),
  ]));

  assert.equal(this.$('thead tr').length, 1, 'The table has a header.');
  assert.equal(this.$('tbody tr').length, this.get('rows.length'), 'The table has all rows.');
  assert.ok(/\s*Column #1\s*Column #2\s*/.test(this.$('th').text()), 'The headers are correct.');
  assert.notOk(this.$('th').is('.collapsing'), 'The column with checkboxes - no.');

  this.set('showCheckBoxInRow', true);

  assert.ok(this.$('th').is('.collapsing'), 'The column with checkboxes - yes.');
});
