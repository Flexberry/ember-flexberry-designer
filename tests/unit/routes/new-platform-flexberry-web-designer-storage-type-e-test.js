import { moduleFor, test } from 'ember-qunit';

moduleFor('route:new-platform-flexberry-web-designer-storage-type-e', 'Unit | Route | new platform flexberry web designer storage type e', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
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
