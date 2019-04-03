import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-class-edit-form', 'Unit | Route | fd class edit form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:objectlistview-events',
    'service:appState',
    'service:detail-interaction'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
