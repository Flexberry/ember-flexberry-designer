import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:fd-generation-process-form', 'Unit | Controller | fd generation process form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:appState',
    'service:fd-current-project-context',
    'service:fd-generation',
    'service:lookup-events'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
