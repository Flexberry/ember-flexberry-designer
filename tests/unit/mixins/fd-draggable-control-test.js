import Ember from 'ember';
import FdDraggableControlMixin from 'ember-flexberry-designer/mixins/fd-draggable-control';
import { module, test } from 'qunit';

module('Unit | Mixin | fd draggable control');

// Replace this with your real tests.
test('it works', function(assert) {
  let FdDraggableControlObject = Ember.Object.extend(FdDraggableControlMixin);
  let subject = FdDraggableControlObject.create();
  assert.ok(subject);
});
