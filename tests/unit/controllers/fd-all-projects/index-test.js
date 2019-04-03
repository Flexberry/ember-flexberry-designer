import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:fd-all-projects/index', 'Unit | Controller | fd all projects/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:appState',
    'service:fd-current-project-context'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
