import { module, test } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import { updateAuditAttributes } from 'ember-flexberry-designer/utils/fd-attributes-for-audit';
import { run } from '@ember/runloop';

let App;
let store;

module('Unit | Utility | fd-attributes-for-audit', {
  beforeEach() {
    App = startApp();
    store = App.__container__.lookup('service:store');
  },

  afterEach() {
    run(App, 'destroy');
  },
});

test('updateAuditAttributes test', function(assert) {
  run(() => {
    const testClassName = 'testClass';
    const testClass = store.createRecord('fd-dev-class', { id: testClassName, name: testClassName });
    testClass.set('addAuditFields', true);

    assert.equal(testClass.attributes.length, 0);
    updateAuditAttributes(testClass, store);
    assert.equal(testClass.attributes.length, 4);

    testClass.set('addAuditFields', false);
    updateAuditAttributes(testClass, store);
    assert.equal(testClass.attributes.length, 0);
  });
});
