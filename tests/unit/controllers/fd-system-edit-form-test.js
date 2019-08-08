import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:fd-system-edit-form', 'Unit | Controller | fd system edit form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'controller:advlimit-dialog',
    'service:objectlistviewEvents',
    'controller:lookup-dialog',
    'controller:flexberry-file-view-dialog',
    'service:user-settings',
    'service:appState',
    'service:detail-interaction',
    'service:adv-limit',
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
