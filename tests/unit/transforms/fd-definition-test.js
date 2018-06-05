import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import FdViewAttributesProperty from 'ember-flexberry-designer/objects/fd-view-attributes-property';
import FdViewAttributesMaster from 'ember-flexberry-designer/objects/fd-view-attributes-master';
import FdViewAttributesDatail from 'ember-flexberry-designer/objects/fd-view-attributes-datail';

moduleFor('transform:fd-definition', 'Unit | Transform | fd definition');

test('it exists', function(assert) {

  let objectModel = Ember.A([
    FdViewAttributesProperty.create({
      name: 'TestProperty',
      caption: 'Test Property',
      path: 'pathTestProperty',
      visible: 'False',
    }),
    FdViewAttributesMaster.create({
      name: 'TestMaster',
      caption: 'Test Master',
      path: 'pathTestMaster',
      visible: 'True',
      lookupType: 'standard',
      masterPropertyName: 'TestMasterName',
      masterCustomizationString: ''
    }),
    FdViewAttributesDatail.create({
      name: 'TestDatail',
      detailViewName: 'TestDatailD',
      loadOnLoadAgregator: 'True',
      path: '',
      caption: 'Test Datail',
      visible: 'True'
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
  '<Item DetailName="TestDatail" DetailViewName="TestDatailD" LoadOnLoadAgregator="True" DetailPath="" DetailCaption="Test Datail" DetailVisible="True" />' +
  '</ViewDetailsList>' +
  '</View>';

  let transform = this.subject();
  assert.ok(transform);

  let deserializeResult = transform.deserialize(xml);
  assert.deepEqual(deserializeResult, objectModel, 'Definition deserialize does not work');

  let serializeResult = transform.serialize(deserializeResult);
  assert.equal(serializeResult, xml, 'Definition serialize does not work');
});
