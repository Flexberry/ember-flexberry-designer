import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-uml-diagram-toolbars/fd-std-toolbar', 'Integration | Component | fd uml diagram toolbars/fd std toolbar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('actions.toolbarButtonClicked', function() { });

  this.render(hbs`{{fd-uml-diagram-toolbars/fd-std-toolbar toolbarButtonClicked=(action "toolbarButtonClicked")}}`);

  assert.equal(this.$().text().trim(), '');
});
