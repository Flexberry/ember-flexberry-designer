import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-association-edit-form', 'Unit | Route | fd association edit form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:fd-current-project-context',
    'service:objectlistview-events',
    'service:appState',
    'service:detail-interaction'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
