/**
  @module ember-flexberry-designer
*/

import { A } from '@ember/array';
import FdClassExternalStoreInstancesInType from '../../objects/fd-storeinstancesintype';

/**
  Сhanges for correct parsing.

  @method correctData
  @param {String} data
*/
let correctData = function(data) {
  /* eslint-disable */
  data = data.replaceAll('&', '&amp;');
  data = data.replaceAll('"', '&quot;');
  data = data.replaceAll('\'', '&apos;');
  data = data.replaceAll('<', '&lt;');
  data = data.replaceAll('>', '&gt;');
  /* eslint-enable */

  return data;
};

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
      let correctDataValue = correctData(d.data);
      let data = `data="${correctDataValue}"`;
      storeInstancesInTypeItemList += `<Item ${dataService} ${data} />`;
    }
  }

  return `<DataSourceCustomizerList>${storeInstancesInTypeItemList}</DataSourceCustomizerList>`;
}
