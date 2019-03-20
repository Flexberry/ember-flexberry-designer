import DS from 'ember-data';
import Ember from 'ember';
import FdClassExternalStoreInstancesInType from '../objects/fd-storeinstancesintype';

export default DS.Transform.extend({
  deserialize(storeInstancesInType) {
    let ret = Ember.A();
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
  },

  serialize(deserialized) {
    if (!deserialized) {
      return deserialized;
    }

    let storeInstancesInTypeItemList = '';

    // Push all FdClassExternalStoreInstancesInType to item xml.
    for (let i = 0; i < deserialized.length; i++) {
      let d = deserialized[i];
      if (d instanceof FdClassExternalStoreInstancesInType) {
        let dataService = `DataService="${d.dataService}"`;
        let data = `data="${d.data}"`;
        storeInstancesInTypeItemList += `<Item ${dataService} ${data} />`;
      }
    }

    return `<DataSourceCustomizerList>${storeInstancesInTypeItemList}</DataSourceCustomizerList>`;
  }
});
