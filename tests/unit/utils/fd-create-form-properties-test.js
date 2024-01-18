import { module, test } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import { getNewFormCaption, getNewFormDescription } from 'ember-flexberry-designer/utils/fd-create-form-properties';
import { A } from '@ember/array';
import { run } from '@ember/runloop';

let App;
let store;

module('Unit | Utility | fd activity diagram primitives', {
  beforeEach() {
    App = startApp();
    store = App.__container__.lookup('service:store');
  },

  afterEach() {
    run(App, 'destroy');
  },
});

// Replace this with your real tests.
test('getNewFormCaption test', function(assert) {
  run(() => {
    const testClassName = 'testClass';
    const testViewName = 'testView';
    const typeCaption = 'L'

    const classCount = 2;
    let newFormCaptionClass = testClassName;
    let newFormCaptionView = testViewName;
    
    for (let i = 0; i <= classCount; i++) {
      store.createRecord('fd-dev-class', { name: newFormCaptionClass });
      store.createRecord('fd-dev-view', { name: newFormCaptionView });
      newFormCaptionClass = getNewFormCaption(store, testClassName, typeCaption);
      newFormCaptionView = getNewFormCaption(store, testViewName, typeCaption);
      
      assert.equal(newFormCaptionClass, `${testClassName}${i === 0 ? '' : i}${typeCaption}`);
      assert.equal(newFormCaptionView, `${testViewName}${i === 0 ? '' : i}${typeCaption}`);
    }
  })
});


// Replace this with your real tests.
test('getNewFormDescription test', function(assert) {
  run(() => {
    const testClassName = 'testClassNewFormDescription';

    const  newFormCaption = getNewFormDescription(testClassName);
      
    assert.equal(newFormCaption, `test class new form description`);

  })
});
