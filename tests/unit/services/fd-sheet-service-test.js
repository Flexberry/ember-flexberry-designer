import { moduleFor, test } from 'ember-qunit';

moduleFor('service:fd-sheet-service', 'Unit | Service | fd sheet service', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  needs: [
    'service:fdLockService'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
