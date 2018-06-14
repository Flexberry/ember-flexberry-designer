import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import FdEditformRow from 'ember-flexberry-designer/objects/fd-editform-row';
import FdEditformControl from 'ember-flexberry-designer/objects/fd-editform-control';

moduleForComponent('fd-editform-row', 'Integration | Component | fd-editform-row', {
  integration: true
});

test('it renders and works', function(assert) {
  this.set('selectAction', control => this.set('selectedControl', control));
  this.render(hbs`{{fd-editform-row row=row selectAction=selectAction}}`);

  this.set('row', FdEditformRow.create({
    controls: Ember.A([
      FdEditformControl.create({
        type: 'bool',
        caption: 'Attribute #1',
      }),
    ]),
  }));
  assert.ok(/\s*Attribute #1\s*/.test(this.$().text()), 'With one control.');
  assert.ok(this.$('.ember-view:first').hasClass('field'));
  assert.notOk(this.$('.ember-view:first').hasClass('fields'));
  assert.notOk(this.$('.ember-view:first').hasClass('equal'));
  assert.notOk(this.$('.ember-view:first').hasClass('width'));

  assert.ok(this.get('selectedControl') === undefined, 'No selected control.');
  this.$('input').click();
  assert.ok(this.get('selectedControl') === this.get('row.controls.firstObject'), 'Click with one control.');

  this.set('row', FdEditformRow.create({
    controls: Ember.A([
      FdEditformControl.create({
        type: 'bool',
        caption: 'Attribute #1',
      }),
      FdEditformControl.create({
        type: 'bool',
        caption: 'Attribute #2',
      }),
    ]),
  }));
  assert.ok(/\s*Attribute #1\s*Attribute #2\s*/.test(this.$().text()), 'With many controls.');
  assert.notOk(this.$('.ember-view:first').hasClass('field'));
  assert.ok(this.$('.ember-view:first').hasClass('fields'));
  assert.ok(this.$('.ember-view:first').hasClass('equal'));
  assert.ok(this.$('.ember-view:first').hasClass('width'));

  this.set('selectedControl', undefined);
  this.$('.ember-view:first').click();
  assert.ok(this.get('selectedControl') === undefined, 'No selected control.');
  this.$('.field:first').click();
  assert.ok(this.get('selectedControl') === this.get('row.controls.firstObject'), 'Selected first control.');
  this.$('.field:last').click();
  assert.ok(this.get('selectedControl') === this.get('row.controls.lastObject'), 'Selected last control.');
});
