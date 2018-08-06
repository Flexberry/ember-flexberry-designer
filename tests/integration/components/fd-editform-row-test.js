import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import FlexberryTextboxComponent from 'ember-flexberry/components/flexberry-textbox';

import FdEditformRow from 'ember-flexberry-designer/objects/fd-editform-row';
import FdEditformControl from 'ember-flexberry-designer/objects/fd-editform-control';

moduleForComponent('fd-editform-row', 'Integration | Component | fd-editform-row', {
  integration: true,

  beforeEach() {
    if (FlexberryTextboxComponent.proto().i18n) {
      Ember.assert(`Please, delete 'beforeEach' and 'afterEach' hooks.`);
    } else {
      FlexberryTextboxComponent.reopen({ i18n: Ember.inject.service() });
    }
  },

  afterEach() {
    FlexberryTextboxComponent.reopen({ i18n: null });
  },
});

test('it renders and works', function(assert) {
  this.set('selectItemAction', row => this.set('selectedRow', row));
  this.render(hbs`{{fd-editform-row row=row selectedItem=selectedRow selectItemAction=selectItemAction}}`);

  this.set('row', FdEditformRow.create({
    controls: Ember.A([
      FdEditformControl.create({ caption: 'Attribute #1' }),
    ]),
  }));
  assert.ok(/\s*Attribute #1\s*/.test(this.$().text()), 'With one control.');
  assert.notOk(this.$('.fd-editform-row').hasClass('fields'));
  assert.notOk(this.$('.fd-editform-row').hasClass('equal'));
  assert.notOk(this.$('.fd-editform-row').hasClass('width'));

  this.set('row', FdEditformRow.create({
    controls: Ember.A([
      FdEditformControl.create({ caption: 'Attribute #1' }),
      FdEditformControl.create({ caption: 'Attribute #2' }),
    ]),
  }));
  assert.ok(/\s*Attribute #1\s*Attribute #2\s*/.test(this.$().text()), 'With many controls.');
  assert.ok(this.$('.fd-editform-row').hasClass('fields'));
  assert.ok(this.$('.fd-editform-row').hasClass('equal'));
  assert.ok(this.$('.fd-editform-row').hasClass('width'));

  assert.notOk(this.get('selectedRow'), 'No selected row.');
  assert.notOk(this.$('.fd-editform-row').hasClass('selected'), `No 'selected' CSS-class.`);

  this.$('input:first').click();
  assert.ok(this.get('selectedRow') === this.get('row.controls.firstObject'), 'Click on control in row.');
  assert.ok(this.$('.fd-editform-row .fd-editform-control').hasClass('selected'), 'Control highlighted.');

  this.$('.fd-editform-row').click();
  assert.ok(this.get('selectedRow') === this.get('row'), 'Click on row.');
  assert.ok(this.$('.fd-editform-row').hasClass('selected'), 'Row highlighted.');
});
