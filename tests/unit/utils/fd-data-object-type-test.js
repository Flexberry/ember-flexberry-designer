import { module, test } from 'qunit';
import FdDataObjectTypes from 'ember-flexberry-designer/objects/fd-data-object-types';
import { deserialize, serialize } from 'ember-flexberry-designer/utils/transforms-utils/fd-data-object-type';

module('Unit | Utility | dataObjectType');

test('it exists', function(assert) {
  let objectModel = FdDataObjectTypes.create({
    className: 'TestClassName',
    newContainerName: 'TestNewContainerName',
    editContainerName: 'TestEditContainerName'
  });

  let xml = '' +
    '<Types>' +
    '<TypesList>' +
    '<Item ClassName="TestClassName" NewContainerName="TestNewContainerName" EditContainerName="TestEditContainerName" />' +
    '</TypesList>' +
    '</Types>';

  let deserializeResult = deserialize(xml);
  assert.deepEqual(deserializeResult, objectModel, 'DataObjectType deserialize does not work');

  let serializeResult = serialize(objectModel);
  assert.equal(serializeResult, xml, 'DataObjectType serialize does not work');
});
