import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:fd-all-projects/new', 'Unit | Controller | fd all projects/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:appState',
    'service:fd-current-project-context',
    'service:fdSheetService',
    'service:fd-dialog-service',
    'service:fdLockService'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
