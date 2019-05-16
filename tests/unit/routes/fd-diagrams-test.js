import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-diagrams', 'Unit | Route | fd diagrams', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:fd-current-project-context',
    'service:fdSheetService'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
