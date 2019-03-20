import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import FdClassExternalStoreInstancesInType from 'ember-flexberry-designer/objects/fd-storeinstancesintype';

moduleFor('transform:fd-storeinstancesintype', 'Unit | Transform | fd storeinstancesintype');

test('it exists', function(assert) {

  let objectModel = Ember.A([
    FdClassExternalStoreInstancesInType.create({
      dataService: 'dataService1',
      data: 'data1',
    }),
    FdClassExternalStoreInstancesInType.create({
      dataService: 'dataService2',
      data: 'data2',
    }),
    FdClassExternalStoreInstancesInType.create({
      dataService: 'dataService3',
      data: 'data3',
    }),
  ]);

  let xml = '' +
  '<DataSourceCustomizerList>' +
  '<Item DataService="dataService1" data="data1" />' +
  '<Item DataService="dataService2" data="data2" />' +
  '<Item DataService="dataService3" data="data3" />' +
  '</DataSourceCustomizerList>';

  let transform = this.subject();
  assert.ok(transform);

  let deserializeResult = transform.deserialize(xml);
  assert.deepEqual(deserializeResult, objectModel, 'Store instances in type deserialize does not work');

  let serializeResult = transform.serialize(deserializeResult);
  assert.equal(serializeResult, xml, 'Store instances in type serialize does not work');
});
