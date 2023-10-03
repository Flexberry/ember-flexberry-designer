/**
  @module ember-flexberry-designer
*/

import { assert } from '@ember/debug';
import { getProperties } from '@ember/object';
import { isEmpty } from '@ember/utils';

/**
  Сhanges for correct parsing.

  @method correctTypeMap
  @param {String} serialized Definition the type map in XML format.
*/
export function correctTypeMap(serialized) {
  /* eslint-disable */
  serialized = serialized.replace(/((?<=value\=\"\S*)|(?<=assemblydll\=\"\S*))\</g, '&lt;');
  serialized = serialized.replace(/((?<=value\=\"\S*)|(?<=assemblydll\=\"\S*))\>/g, '&gt;');
  /* eslint-enable */

  return serialized;
}

/**
  Checks for parsing a type map.

  @method checkCorrectTypeMap
  @param {String} serialized Definition the type map in XML format.
*/
export function checkCorrectTypeMap(serialized) {
  let isCorrect = false;
  if (serialized) {
    serialized = correctTypeMap(serialized);
    let document = new DOMParser().parseFromString(serialized, 'text/xml');
    let parsererrorList = document.getElementsByTagName('parsererror');
    isCorrect = parsererrorList.length === 0;
    if (!isCorrect) {
      let parsererror = parsererrorList[0].outerText;
      isCorrect = isEmpty(parsererror);
    }
  } else {
    isCorrect = true;
  }

  return isCorrect;
}

/**
  Returns an array of types contained in the type map.

  @example
    ```javascript
    [{ name: 'bool', value: 'System.Boolean', assemblyDll: '' }]
    ```

  @method deserialize
  @param {String} serialized Definition the type map in XML format.
  @return {Array} An array of types contained in the type map.
*/
export function deserialize(serialized) {
  let deserialized = [];
  if (serialized) {
    serialized = correctTypeMap(serialized);
    let document = new DOMParser().parseFromString(serialized, 'text/xml');
    let typeMaps = document.getElementsByTagName('TypeMap');
    let types = typeMaps[0].getElementsByTagName('*');
    for (let i = 0; i < types.length; i++) {
      let name = types[i].tagName;
      let value = types[i].getAttribute('value');
      let assemblyDll = types[i].getAttribute('assemblydll');
      deserialized.push({ name, value, assemblyDll });
    }

    assert('The type map must contain one definition.', typeMaps.length === 1);
  }

  return deserialized;
}

/**
  Returns definition the type map in XML format.

  @example
    ```javascript
    '<TypeMap><bool value="System.Boolean" assemblydll="" /></TypeMap>'
    ```

  @method serialize
  @param {Array} deserialized An array of types contained in the type map.
  @return {String} Definition the type map in XML format.
*/
export function serialize(deserialized) {
  let serialized = [];
  for (let i = 0; i < deserialized.length; i++) {
    let type = getProperties(deserialized[i], 'name', 'value', 'assemblyDll');
    serialized.push(`<${type.name} value="${type.value}" assemblydll="${type.assemblyDll || ''}" />`);
  }

  return serialized.length > 0 ? `<TypeMap>${serialized.join('')}</TypeMap>` : null;
}
