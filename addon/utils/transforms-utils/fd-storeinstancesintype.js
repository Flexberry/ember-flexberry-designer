/**
  @module ember-flexberry-designer
*/

import { A } from '@ember/array';
import FdClassExternalStoreInstancesInType from '../../objects/fd-storeinstancesintype';

/**
  Returns an array of storeInstancesInType.

  @method deserialize
  @param {String} storeInstancesInType Definition the storeInstancesInType in XML format.
  @return {Array} An array of storeInstancesInType.
*/
export function deserialize(storeInstancesInType) {
  let ret = A();
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(storeInstancesInType, 'text/xml');
  if (xmlDoc) {

    // Get DataSourceCustomizerList from xml.
    let dataSourceCustomizerList = xmlDoc.getElementsByTagName('DataSourceCustomizerList');
    if (dataSourceCustomizerList.length > 0) {
      let itemList = dataSourceCustomizerList[0].getElementsByTagName('Item');

      // Get each item as FdClassExternalStoreInstancesInType from DataSourceCustomizerList.
      for (let item of itemList) {
        let itemObject;
        let dataService = item.getAttribute('DataService');
        let data = item.getAttribute('data');

        itemObject = FdClassExternalStoreInstancesInType.create({
          dataService: dataService,
          data: data,
        });

        ret.pushObject(itemObject);
      }
    }
  }

  return ret;
}

/**
  Returns definition the storeInstancesInType in XML format.

  @method serialize
  @param {Array} deserialized An array storeInstancesInType.
  @return {String} Definition the storeInstancesInType in XML format.
*/
export function serialize(deserialized) {
  if (!deserialized) {
    return deserialized;
  }

  let storeInstancesInTypeItemList = '';

  // Push all FdClassExternalStoreInstancesInType to item xml.
  for (let i = 0; i < deserialized.length; i++) {
    let d = deserialized[i];
    if (d instanceof FdClassExternalStoreInstancesInType) {
      let dataService = `DataService="${d.dataService}"`;
      let correctData = d.data.replaceAll('"', '&quot;');
      let data = `data="${correctData}"`;
      storeInstancesInTypeItemList += `<Item ${dataService} ${data} />`;
    }
  }

  return `<DataSourceCustomizerList>${storeInstancesInTypeItemList}</DataSourceCustomizerList>`;
}
