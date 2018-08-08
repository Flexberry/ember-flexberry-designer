import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import FdViewAttributesProperty from 'ember-flexberry-designer/objects/fd-view-attributes-property';
import FdViewAttributesMaster from 'ember-flexberry-designer/objects/fd-view-attributes-master';
import FdViewAttributesDetail from 'ember-flexberry-designer/objects/fd-view-attributes-detail';

moduleFor('transform:fd-definition', 'Unit | Transform | fd definition');

test('it exists', function(assert) {

  let objectModel = Ember.A([
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

  let transform = this.subject();
  assert.ok(transform);

  let deserializeResult = transform.deserialize(xml);
  assert.deepEqual(deserializeResult, objectModel, 'Definition deserialize does not work');

  let serializeResult = transform.serialize(deserializeResult);
  assert.equal(serializeResult, xml, 'Definition serialize does not work');
});