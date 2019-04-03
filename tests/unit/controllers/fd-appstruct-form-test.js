import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:fd-appstruct-form', 'Unit | Controller | new platform flexberry web designer appstruct form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:fd-current-project-context',
    'service:appState',
    'service:objectlistviewEvents',
    'controller:lookup-dialog',
    'controller:flexberry-file-view-dialog',
    'service:user-settings',
    'service:detail-interaction'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
