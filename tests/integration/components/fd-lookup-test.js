import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-lookup', 'Integration | Component | fd-lookup', {
  integration: true
});

test('it renders and works', function(assert) {
  assert.expect(3);

  this.set('showLookupAction', (caption, wiev) => {
    assert.ok(this.get('caption') === caption);
    assert.ok(this.get('wiev') === wiev);
  });

  this.render(hbs`{{fd-lookup caption=caption view=wiev showLookupAction=showLookupAction}}`);

  assert.ok(this.$('.button.ui-change').hasClass('disabled'), 'Can not open without the view.');

  this.set('caption', {});
  this.set('wiev', {});

  this.$('.button.ui-change').click();
});
