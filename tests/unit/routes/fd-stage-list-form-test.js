import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-stage-list-form', 'Unit | Route | fd stage list form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:appState',
    'service:fd-current-project-context',
    'service:objectlistviewEvents',
    'service:formLoadTimeTracker',
    'service:colsConfigMenu'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
