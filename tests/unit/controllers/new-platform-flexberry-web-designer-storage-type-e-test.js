import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:new-platform-flexberry-web-designer-storage-type-e', 'Unit | Controller | new platform flexberry web designer storage type e', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'controller:advlimit-dialog',
    'controller:colsconfig-dialog',
    'controller:filters-dialog',
    'service:objectlistviewEvents',
    'controller:lookup-dialog',
    'controller:flexberry-file-view-dialog',
    'service:user-settings',
    'service:appState',
    'service:detail-interaction',
    'service:adv-limit',
    'service:lookup-events'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
