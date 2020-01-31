import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fd-uml-diagram', 'Integration | Component | fd-uml-diagram', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });


  this.set('mockLinkFunction', function() {});

  this.render(hbs`{{fd-uml-diagram
    enableEditLinks = mockLinkFunction
    enableWrapBaseLinks = mockLinkFunction
    disableEditLinks = mockLinkFunction
  }}`);

  assert.equal(this.$().text().trim(), '');
});
