import { moduleFor, test } from 'ember-qunit';

moduleFor('route:new-platform-flexberry-web-designer-generation-l', 'Unit | Route | new platform flexberry web designer generation l', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:cols-config-menu',
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
