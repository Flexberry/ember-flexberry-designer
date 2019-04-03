import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:new-platform-flexberry-web-designer-storage-type-l', 'Unit | Controller | new platform flexberry web designer storage type l', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:user-settings',
    'service:objectlistview-events',
    'controller:colsconfig-dialog'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
