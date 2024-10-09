import modelHasChanges from 'dummy/utils/model-has-changes';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import startApp from 'dummy/tests/helpers/start-app';
import executeTestWithData from 'dummy/tests/helpers/execute-test-with-data';
import { A } from '@ember/array';
import uuid from 'npm:node-uuid';

let App;
module('Unit | Utility | model-has-changes', {
  beforeEach() {
    App = startApp();
  },

  afterEach() {
    run(App, 'destroy');
  },
});

test('it works undefined value', function(assert) {
  let result = modelHasChanges() === false;
  assert.ok(result);
});

// TODO delete stage.
test('it works', function(assert) {
  let done = assert.async();

  run(() => {
    let store = App.__container__.lookup('service:store');

    // Arrange.
    let createTestData = function(stage) {
      return A([
        store.createRecord('fd-dev-class', {
          name: `TestMainClass`,
          nameStr: `TestMainClass`,
          stage: stage,
          id: uuid.v4(),
          caption: '',
          description: '',
          stereotype: '«implementation»',
          referenceCount: 1
        }),
        store.createRecord('fd-dev-class', {
          name: `TestBSClass`,
          nameStr: `TestBSClass`,
          stage: stage,
          id: uuid.v4(),
          caption: '',
          description: '',
          stereotype: '«implementation»',
          referenceCount: 1
        })
      ]);
    };

    // Act & Assert.
    let testCallback = function(assert, arrayTestData) {
      let testMainClass = A(arrayTestData).findBy('name', 'TestMainClass');
      let testBSClass = A(arrayTestData).findBy('name', 'TestBSClass');

      assert.notOk(modelHasChanges(testMainClass));

      testMainClass.set('caption', 'TestCaption');

      assert.ok(modelHasChanges(testMainClass));

      testMainClass.rollbackAll();

      assert.notOk(modelHasChanges(testMainClass));

      testMainClass.set('businessServerClass', testBSClass);

      assert.ok(modelHasChanges(testMainClass));

      testMainClass.rollbackAll();

      assert.notOk(modelHasChanges(testMainClass));

      store.createRecord('fd-dev-attribute', {
        class: testMainClass,
      });

      assert.ok(modelHasChanges(testMainClass));
    };

    executeTestWithData(store, assert, done, createTestData, testCallback);
  });
});
