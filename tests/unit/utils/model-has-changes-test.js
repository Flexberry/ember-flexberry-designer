import modelHasChanges from 'dummy/utils/model-has-changes';
import { module, test } from 'qunit';

module('Unit | Utility | model-has-changes', function() {

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = modelHasChanges() === false;
    assert.ok(result);
  });
});
