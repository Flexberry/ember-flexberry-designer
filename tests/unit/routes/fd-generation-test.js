import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-generation', 'Unit | Route | fd-generation', {
  // Specify the other units that are required for this test.
   needs: ['service:fd-current-project-context']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
