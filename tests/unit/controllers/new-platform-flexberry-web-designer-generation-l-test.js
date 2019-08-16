import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:new-platform-flexberry-web-designer-generation-l', 'Unit | Controller | new platform flexberry web designer generation l', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'controller:advlimit-dialog',
    'service:user-settings',
    'service:objectlistview-events',
    'controller:colsconfig-dialog',
    'service:objectlistviewEvents',
    'service:adv-limit',
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
