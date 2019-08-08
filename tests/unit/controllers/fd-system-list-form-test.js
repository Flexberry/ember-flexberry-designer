import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:fd-system-list-form', 'Unit | Controller | fd system list form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'controller:advlimit-dialog',
    'service:user-settings',
    'service:objectlistview-events',
    'controller:colsconfig-dialog',
    'service:adv-limit',
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
