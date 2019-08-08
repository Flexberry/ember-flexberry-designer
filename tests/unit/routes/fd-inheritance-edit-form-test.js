import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-inheritance-edit-form', 'Unit | Route | fd inheritance edit form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:cols-config-menu',
    'service:fd-current-project-context',
    'service:objectlistview-events',
    'service:appState',
    'service:detail-interaction',
    'service:adv-limit',
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
