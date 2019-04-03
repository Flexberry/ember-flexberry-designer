import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import FdLimitByStageMixin from 'ember-flexberry-designer/mixins/fd-limit-by-stage';

module('Unit | Mixin | fd limit by stage');

test('it really works', function(assert) {
  let subject = EmberObject.extend(FdLimitByStageMixin).create();

  // Imitation the service.
  subject.set('currentContext', EmberObject.create({ getCurrentStage() { return 'stage'; } }));

  assert.ok(subject.objectListViewLimitPredicate() instanceof SimplePredicate);
});
