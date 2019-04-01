import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-generation/list/log', 'Unit | Route | fd-generation/list/log', {
  // Specify the other units that are required for this test.
  needs: ['service:fd-sheet-service']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
