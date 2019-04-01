import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-generation/first', 'Unit | Route | fd-generation/first', {
  // Specify the other units that are required for this test.
  needs: ['service:fd-current-project-context']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
