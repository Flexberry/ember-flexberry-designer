//import fdPreloadStageMetadata from 'dummy/utils/fd-preload-stage-metadata';
import { module, test } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import { run } from '@ember/runloop';

let App;

module('Unit | Utility | fd preload stage metadata', {
  beforeEach() {
    App = startApp();
  },

  afterEach() {
    run(App, 'destroy');
  },
});

// Replace this with your real tests.
test('it works', function(assert) {
  // For test need beckend.
  /*
  let store = App.__container__.lookup('service:store');

  let result = fdPreloadStageMetadata(store, '00000000-0000-0000-0000-000000000000');
  assert.ok(result);*/
  assert.ok(true);
});
