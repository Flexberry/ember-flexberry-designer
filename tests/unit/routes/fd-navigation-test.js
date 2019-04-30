import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-navigation', 'Unit | Route | fd navigation', {
  // Specify the other units that are required for this test.
  needs: [
    'service:fd-current-project-context',
    'service:fdSheetService'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
