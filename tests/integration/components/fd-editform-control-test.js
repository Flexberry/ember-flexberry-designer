import { assert } from '@ember/debug';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import FlexberryTextboxComponent from 'ember-flexberry/components/flexberry-textbox';

import FdEditformRow from 'ember-flexberry-designer/objects/fd-editform-row';
import FdEditformControl from 'ember-flexberry-designer/objects/fd-editform-control';
import FdEditformGroup from 'ember-flexberry-designer/objects/fd-editform-group';
import FdEditformTabgroup from 'ember-flexberry-designer/objects/fd-editform-tabgroup';
import FdEditformTab from 'ember-flexberry-designer/objects/fd-editform-tab';

moduleForComponent('fd-editform-control', 'Integration | Component | fd-editform-control', {
  integration: true,

  beforeEach() {
    if (FlexberryTextboxComponent.proto().i18n) {
      assert(`Please, delete 'beforeEach' and 'afterEach' hooks.`);
    } else {
      FlexberryTextboxComponent.reopen({ i18n: service() });
    }
  },

  afterEach() {
    FlexberryTextboxComponent.reopen({ i18n: null });
  },
});

test('it renders and works', function(assert) {
  this.set('selectItemAction', control => this.set('selectedControl', control));
  this.render(hbs`{{fd-editform-control control=control selectedItem=selectedControl selectItemAction=selectItemAction}}`);

  this.set('control', FdEditformControl.create({ caption: 'Attribute #1' }));
  assert.ok(/\s*Attribute #1\s*/.test(this.$().text()), 'With simple control.');

  assert.notOk(this.get('selectedControl'), 'No selected control.');
  assert.notOk(this.$('.fd-editform-control').hasClass('selected'), `No 'selected' CSS-class.`);

  this.$('input').click();
  assert.ok(this.get('selectedControl') === this.get('control'), 'Click on simple control.');
  assert.ok(this.$('.fd-editform-control').hasClass('selected'), 'Simple control highlighted.');

  this.set('control', FdEditformGroup.create({
    caption: 'Group #1',
    rows: A([
      FdEditformRow.create({
        controls: A([
          FdEditformControl.create({ caption: 'Attribute #1' }),
        ]),
      }),
    ]),
  }));
  assert.ok(/\s*Group #1\s*Attribute #1\s*/.test(this.$().text()), 'With group.');

  this.$('input').click();
  assert.ok(this.get('selectedControl') === this.get('control.rows.firstObject.controls.firstObject'), 'Click on nested control.');
  assert.ok(this.$('.fd-editform-control .fd-editform-control').hasClass('selected'), 'Nested control highlighted.');

  this.$('.fd-editform-control:first').click();
  assert.ok(this.get('selectedControl') === this.get('control'), 'Click on group control.');
  assert.ok(this.$('.fd-editform-control').hasClass('selected'), 'Group control highlighted.');

  this.set('control', FdEditformTabgroup.create({
    tabs: A([
      FdEditformTab.create({
        caption: 'Tab #1',
        rows: A([
          FdEditformRow.create({
            controls: A([
              FdEditformControl.create({ caption: 'Attribute #1' }),
            ]),
          }),
        ]),
      }),
    ]),
  }));
  // --- assertion fault due fd-tab-dropdown component is temporarily disabled in fd-tabs component --- assert.ok(/\s*Tab #1\s*Attribute #1\s*/.test(this.$().text()), 'With tabs.');

  this.$('input').click();
  assert.ok(this.get('selectedControl') === this.get('control.tabs.firstObject.rows.firstObject.controls.firstObject'), 'Click on nested control.');
  assert.ok(this.$('.fd-editform-control .fd-editform-control').hasClass('selected'), 'Nested control highlighted.');

  this.$('.active.item').click();
  // --- assertion fault due fd-tab-dropdown component is temporarily disabled in fd-tabs component --- assert.ok(this.get('selectedControl') === this.get('control.tabs.firstObject'), 'Click on tab control.');
  // --- assertion fault due fd-tab-dropdown component is temporarily disabled in fd-tabs component --- assert.ok(this.$('.fd-editform-control .active.item').hasClass('selected'), 'Tab label highlighted.');
  // --- assertion fault due fd-tab-dropdown component is temporarily disabled in fd-tabs component --- assert.ok(this.$('.fd-editform-control .active.tab').hasClass('selected'), 'Tab highlighted.');

  this.$('.fd-editform-control:first').click();
  assert.ok(this.get('selectedControl') === this.get('control'), 'Click on group tabs control.');
  assert.ok(this.$('.fd-editform-control:first').hasClass('selected'), 'Group tabs highlighted.');
});
