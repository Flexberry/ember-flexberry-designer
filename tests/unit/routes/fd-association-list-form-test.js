import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-association-list-form', 'Unit | Route | fd association list form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:fd-current-project-context',
    'service:objectlistviewEvents',
    'service:formLoadTimeTracker',
    'service:colsConfigMenu',
    'service:appState'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
