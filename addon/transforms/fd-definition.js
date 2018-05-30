import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(definition) {
    let ret = [];
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(definition, 'text/xml');
    if (xmlDoc) {
      let view = xmlDoc.getElementsByTagName('View');
      if (view.length > 0) {
        let viewPropertiesList = view[0].getElementsByTagName('ViewPropertiesList');
        if (viewPropertiesList.length > 0) {
          let itemList = viewPropertiesList[0].getElementsByTagName('Item');
          for (let item of itemList) {
            let propertyName = item.getAttribute('PropertyName');
            let caption = item.getAttribute('Caption');
            let path = item.getAttribute('Path');
            let visible =  item.getAttribute('Visible');
            let isMaster =  item.getAttribute('IsMaster');
            let lookupType =  item.getAttribute('LookupType');
            let masterPropertyName =  item.getAttribute('MasterPropertyName');
            let masterCustomizationString =  item.getAttribute('MasterCustomizationString');
            ret.push({
              propertyName:propertyName,
              caption:caption,
              path:path,
              visible: visible,
              isMaster: isMaster,
              lookupType: lookupType,
              masterPropertyName: masterPropertyName,
              masterCustomizationString: masterCustomizationString
            });
          }
        }
      }
    }

    return ret;
  },

  serialize(deserialized) {
    if (!deserialized) {
      return deserialized;
    }

    let viewPropertiesList = '';
    for (let i = 0; i < deserialized.length; i++) {
      let d = deserialized[i];
      let propertyName = `PropertyName="${d.propertyName}"`;
      let caption = `Caption="${d.caption}"`;
      let path = `Path="${d.path}"`;
      let visible = `Visible="${d.visible === 'True' ? 'True' : 'False'}"`;
      let isMaster = `IsMaster="${d.isMaster === 'True' ? 'True' : 'False'}"`;
      let lookupType = `LookupType="${d.lookupType}"`;
      let masterPropertyName = `MasterPropertyName="${d.masterPropertyName}"`;
      let masterCustomizationString = `MasterCustomizationString="${d.masterCustomizationString}"`;
      viewPropertiesList += `<Item ${propertyName} ${caption} ${path} ${visible} ${isMaster} ${lookupType} ${masterPropertyName} ${masterCustomizationString} />`;
    }

    return `<View><ViewPropertiesList>${viewPropertiesList}</ViewPropertiesList><ViewDetailsList /></View>`;
  }
});
