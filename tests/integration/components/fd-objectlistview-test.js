import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-objectlistview', 'Integration | Component | fd-objectlistview', {
  integration: true
});

test('it renders and works', function(assert) {
  this.render(hbs`{{fd-objectlistview view=wiev types=types}}`);

  this.set('types', [{ type: 'string' }, { type: 'bool' }]);
  this.set('wiev', {
    definition: A([
      EmberObject.create({ caption: 'Column #1' }),
      EmberObject.create({ name: 'Column #2' }),
    ]),
  });

  assert.equal(this.$('tbody tr').length, 5, '5 rows per page by default.');
  assert.ok(/\s*Column #1\s*Column #2\s*/.test(this.$('th').text()), 'The headers are correct.');

  run(() => {
    this.$('.flexberry-dropdown .item[data-value=1]').click();
  });

  assert.equal(this.$('tbody tr').length, 10, 'Switch to 10 rows on per page.');

  this.$('.next-page-button').click();
  assert.equal(this.$('tbody tr').length, 5, 'Go to next page.');
  assert.ok(this.$('.next-page-button').hasClass('disabled'), 'This is the last page.');
});
