import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-user-form-edit-form', 'Unit | Route | fd user form edit form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:objectlistview-events',
    'service:appState',
    'service:detail-interaction',
    'service:adv-limit',
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
