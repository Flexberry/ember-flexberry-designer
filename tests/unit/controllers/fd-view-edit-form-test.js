import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:fd-view-edit-form', 'Unit | Controller | fd view edit form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'controller:advlimit-dialog',
    'controller:colsconfig-dialog',
    'service:appState',
    'service:objectlistviewEvents',
    'controller:lookup-dialog',
    'controller:flexberry-file-view-dialog',
    'service:user-settings',
    'service:detail-interaction',
    'service:adv-limit',
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
