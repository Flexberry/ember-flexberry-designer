import { module, test } from 'qunit';
import { A } from '@ember/array';
import FdClassExternalStoreInstancesInType from 'ember-flexberry-designer/objects/fd-storeinstancesintype';
import { deserialize, serialize } from 'ember-flexberry-designer/utils/transforms-utils/fd-storeinstancesintype';

module('Unit | Utility | fd storeinstancesintype');

test('it exists', function(assert) {

  let objectModel = A([
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

  assert.deepEqual(deserialize(xml), objectModel, `The 'deserialize' function is OK.`);
  assert.equal(serialize(objectModel), xml, `The 'serialize' function is OK.`);
});
