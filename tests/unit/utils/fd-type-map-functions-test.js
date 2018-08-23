import { module, test } from 'qunit';

import { deserialize, serialize } from 'ember-flexberry-designer/utils/fd-type-map-functions';

module('Unit | Utility | fd-type-map-functions');

test('it works', function(assert) {
  const deserialized = [{ name: 'bool', value: 'System.Boolean', assemblyDll: '' }];
  const serialized = '<TypeMap><bool value="System.Boolean" assemblydll="" /></TypeMap>';

  assert.deepEqual(deserialize(serialized), deserialized, `The 'deserialize' function is OK.`);
  assert.equal(serialize(deserialized), serialized, `The 'serialize' function is OK.`);
});
