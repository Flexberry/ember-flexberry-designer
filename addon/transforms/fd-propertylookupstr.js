import DS from 'ember-data';
import { A } from '@ember/array';

export default DS.Transform.extend({
  deserialize(definition) {
    let ret = A();
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(definition, 'text/xml');
    if (xmlDoc) {
      let viewPropertiesList = xmlDoc.getElementsByTagName('PropertiesList');
      if (viewPropertiesList.length > 0) {
        let itemList = viewPropertiesList[0].getElementsByTagName('Item');
        for (let item of itemList) {
          let propertyName = item.getAttribute('PropertyName');
          let containerName = item.getAttribute('ContainerName');
          let itemObject = {
            property: propertyName,
            container: containerName
          };

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

    let propertiesList = '';
    for (let i = 0; i < deserialized.length; i++) {
      let d = deserialized[i];
      let propertyName = `PropertyName="${d.property}"`;
      let containerName = `ContainerName="${d.container}"`;
      propertiesList += `<Item ${propertyName} ${containerName} />`;
    }

    return `<Properties><PropertiesList>${propertiesList}</PropertiesList></Properties>`;
  }
});
