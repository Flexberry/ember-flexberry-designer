import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-data-types-map', 'Unit | Route | fd data types map', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:fd-current-project-context',
    'service:fdSheetService',
    'service:fd-dialog-service',
    'service:appState'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
