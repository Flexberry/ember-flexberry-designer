import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-view-list-form', 'Unit | Route | fd view list form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
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
