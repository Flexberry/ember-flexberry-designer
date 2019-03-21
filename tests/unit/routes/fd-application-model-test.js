import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-application-model', 'Unit | Route | fd application model', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:fd-current-project-context'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
