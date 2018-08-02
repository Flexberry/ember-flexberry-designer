import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-lookup', 'Integration | Component | fd-lookup', {
  integration: true
});

test('it renders and works', function(assert) {
  assert.expect(2);

  this.set('caption', {});
  this.set('wiev', {});

  this.set('showLookupAction', (caption, view) => {
    assert.ok(this.get('caption') === caption);
    assert.ok(this.get('wiev') === view);
  });

  this.render(hbs`{{fd-lookup caption=caption view=wiev showLookupAction=showLookupAction}}`);

  this.$('.button.ui-change').click();
});
