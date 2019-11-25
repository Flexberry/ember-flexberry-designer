import { A } from '@ember/array';
import { module, test } from 'qunit';
import FdViewAttributesProperty from 'ember-flexberry-designer/objects/fd-view-attributes-property';
import FdViewAttributesMaster from 'ember-flexberry-designer/objects/fd-view-attributes-master';
import FdViewAttributesDetail from 'ember-flexberry-designer/objects/fd-view-attributes-detail';
import { deserialize, serialize } from 'ember-flexberry-designer/utils/transforms-utils/fd-definition';

module('Unit | Utility | fd definition');

test('it exists', function(assert) {

  let objectModel = A([
    FdViewAttributesProperty.create({
      name: 'TestProperty',
      caption: 'Test Property',
      path: 'pathTestProperty',
      visible: false,
    }),
    FdViewAttributesMaster.create({
      name: 'TestMaster',
      caption: 'Test Master',
      path: 'pathTestMaster',
      visible: true,
      lookupType: 'standard',
      masterPropertyName: 'TestMasterName',
      masterCustomizationString: ''
    }),
    FdViewAttributesDetail.create({
      name: 'TestDetail',
      detailViewName: 'TestDetailD',
      loadOnLoadAgregator: false,
      path: '',
      caption: 'Test Detail',
      visible: true
    }),
  ]);

  let xml = '' +
  '<View>' +
  '<ViewPropertiesList>' +
  '<Item PropertyName="TestProperty" Caption="Test Property" Path="pathTestProperty" Visible="False"' +
  ' IsMaster="False" LookupType="default" MasterPropertyName="" MasterCustomizationString="" />' +
  '<Item PropertyName="TestMaster" Caption="Test Master" Path="pathTestMaster" Visible="True"' +
  ' IsMaster="True" LookupType="standard" MasterPropertyName="TestMasterName" MasterCustomizationString="" />' +
  '</ViewPropertiesList>' +
  '<ViewDetailsList>' +
  '<Item DetailName="TestDetail" DetailViewName="TestDetailD" LoadOnLoadAgregator="False" DetailPath="" DetailCaption="Test Detail" DetailVisible="True" />' +
  '</ViewDetailsList>' +
  '</View>';

  let deserializeResult = deserialize(xml);
  assert.deepEqual(deserializeResult, objectModel, 'Definition deserialize does not work');

  let serializeResult = serialize(deserializeResult);
  assert.equal(serializeResult, xml, 'Definition serialize does not work');
});
