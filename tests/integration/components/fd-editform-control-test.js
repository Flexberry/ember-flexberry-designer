import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import FdEditformRow from 'ember-flexberry-designer/objects/fd-editform-row';
import FdEditformControl from 'ember-flexberry-designer/objects/fd-editform-control';
import FdEditformGroup from 'ember-flexberry-designer/objects/fd-editform-group';
import FdEditformTabgroup from 'ember-flexberry-designer/objects/fd-editform-tabgroup';
import FdEditformTab from 'ember-flexberry-designer/objects/fd-editform-tab';

moduleForComponent('fd-editform-control', 'Integration | Component | fd-editform-control', {
  integration: true
});

test('it renders and works', function(assert) {
  this.set('selectControlAction', control => this.set('selectedControl', control));
  this.render(hbs`{{fd-editform-control control=control selectControlAction=selectControlAction}}`);

  this.set('control', FdEditformControl.create({ type: 'bool', caption: 'Attribute #1' }));
  assert.ok(/\s*Attribute #1\s*/.test(this.$().text()), 'With simple control.');

  this.set('control', FdEditformGroup.create({
    caption: 'Group #1',
    rows: Ember.A([
      FdEditformRow.create({
        controls: Ember.A([
          FdEditformControl.create({ type: 'bool', caption: 'Attribute #1' }),
        ]),
      }),
    ]),
  }));
  assert.ok(/\s*Group #1\s*Attribute #1\s*/.test(this.$().text()), 'With group.');

  this.set('control', FdEditformTabgroup.create({
    tabs: Ember.A([
      FdEditformTab.create({
        caption: 'Tab #1',
        rows: Ember.A([
          FdEditformRow.create({
            controls: Ember.A([
              FdEditformControl.create({ type: 'bool', caption: 'Attribute #1' }),
            ]),
          }),
        ]),
      }),
    ]),
  }));
  assert.ok(/\s*Tab #1\s*Attribute #1\s*/.test(this.$().text()), 'With tabs.');

  assert.ok(this.get('selectedControl') === undefined, 'No selected control.');
  this.$('.active.item').click();
  assert.ok(this.get('selectedControl') === this.get('control.tabs.firstObject'), 'Click by tab.');
});
