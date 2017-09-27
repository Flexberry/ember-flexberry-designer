import Ember from 'ember';
import { module, test } from 'qunit';
import { Query } from 'ember-flexberry-data';
import FdLimitByStageMixin from 'ember-flexberry-designer/mixins/fd-limit-by-stage';

module('Unit | Mixin | fd limit by stage');

test('it really works', function(assert) {
  let subject = Ember.Object.extend(FdLimitByStageMixin).create();

  // Imitation the service.
  subject.set('currentContext', Ember.Object.create({ getCurrentStage() { return 'stage'; } }));

  assert.ok(subject.objectListViewLimitPredicate() instanceof Query.SimplePredicate);
});
