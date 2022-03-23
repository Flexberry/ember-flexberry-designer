import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:fd-data-types-map', 'Unit | Controller | fd data types map', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:appState',
    'service:fd-dialog-service',
    'service:fdSheetService',
    'service:fdLockService',
    'service:fd-readonly-mode-service'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
