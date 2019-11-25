import { moduleFor, test } from 'ember-qunit';

moduleFor('route:fd-configuration-list-form', 'Unit | Route | fd configuration list form', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:cols-config-menu',
    'service:fd-current-project-context',
    'service:objectlistviewEvents',
    'service:formLoadTimeTracker',
    'service:colsConfigMenu',
    'service:appState',
    'service:adv-limit',
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
