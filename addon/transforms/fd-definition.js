import DS from 'ember-data';
import Ember from 'ember';
import FdViewAttributesProperty from '../objects/fd-view-attributes-property';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDatail from '../objects/fd-view-attributes-datail';

export default DS.Transform.extend({
  deserialize(definition) {
    let ret = Ember.A();
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(definition, 'text/xml');
    if (xmlDoc) {
      let viewPropertiesList = xmlDoc.getElementsByTagName('ViewPropertiesList');
      if (viewPropertiesList.length > 0) {
        let itemList = viewPropertiesList[0].getElementsByTagName('Item');
        for (let item of itemList) {
          let itemObject;
          let propertyName = item.getAttribute('PropertyName');
          let caption = item.getAttribute('Caption');
          let path = item.getAttribute('Path');
          let visible = item.getAttribute('Visible');
          if (item.getAttribute('IsMaster') === 'True') {
            let lookupType = item.getAttribute('LookupType');
            let masterPropertyName = item.getAttribute('MasterPropertyName');
            let masterCustomizationString = item.getAttribute('MasterCustomizationString');
            itemObject = FdViewAttributesMaster.create({
              name: propertyName,
              caption: caption,
              path: path,
              visible: visible,
              lookupType: lookupType,
              masterPropertyName: masterPropertyName,
              masterCustomizationString: masterCustomizationString
            });
          } else {
            itemObject = FdViewAttributesProperty.create({
              name: propertyName,
              caption: caption,
              path: path,
              visible: visible,
            });
          }

          ret.pushObject(itemObject);
        }
      }

      let viewDetailsList = xmlDoc.getElementsByTagName('ViewDetailsList');
      if (viewDetailsList.length > 0) {
        let itemList = viewDetailsList[0].getElementsByTagName('Item');
        for (let item of itemList) {
          let detailName = item.getAttribute('DetailName');
          let detailViewName = item.getAttribute('DetailViewName');
          let loadOnLoadAgregator = item.getAttribute('LoadOnLoadAgregator');
          let detailPath = item.getAttribute('DetailPath');
          let detailCaption = item.getAttribute('DetailCaption');
          let detailVisible = item.getAttribute('DetailVisible');
          ret.pushObject(FdViewAttributesDatail.create({
            name: detailName,
            detailViewName: detailViewName,
            loadOnLoadAgregator: loadOnLoadAgregator,
            path: detailPath,
            caption: detailCaption,
            visible: detailVisible
          }));
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
    let viewDetailsList = '';
    for (let i = 0; i < deserialized.length; i++) {
      let d = deserialized[i];
      if (d instanceof FdViewAttributesDatail) {
        let detailName = `DetailName="${d.name}"`;
        let detailViewName = `DetailViewName="${d.detailViewName}"`;
        let loadOnLoadAgregator = `LoadOnLoadAgregator="${d.loadOnLoadAgregator}"`;
        let detailPath = `DetailPath="${d.path}"`;
        let detailCaption = `DetailCaption="${d.caption}"`;
        let detailVisible = `DetailVisible="${d.visible}"`;
        viewDetailsList += `<Item ${detailName} ${detailViewName} ${loadOnLoadAgregator} ${detailPath} ${detailCaption} ${detailVisible} />`;
      } else {
        let isMaster = `IsMaster="False"`;
        let lookupType = `LookupType="default"`;
        let masterPropertyName = `MasterPropertyName=""`;
        let masterCustomizationString = `MasterCustomizationString=""`;
        if (d instanceof FdViewAttributesMaster) {
          isMaster = `IsMaster="True"`;
          lookupType = `LookupType="${d.lookupType}"`;
          masterPropertyName = `MasterPropertyName="${d.masterPropertyName}"`;
          masterCustomizationString = `MasterCustomizationString="${d.masterCustomizationString}"`;
        }

        let propertyName = `PropertyName="${d.name}"`;
        let caption = `Caption="${d.caption}"`;
        let path = `Path="${d.path}"`;
        let visible = `Visible="${d.visible === 'True' ? 'True' : 'False'}"`;
        viewPropertiesList += `<Item ${propertyName} ${caption} ${path} ${visible}` +
         ` ${isMaster} ${lookupType} ${masterPropertyName} ${masterCustomizationString} />`;
      }
    }

    return `<View><ViewPropertiesList>${viewPropertiesList}</ViewPropertiesList><ViewDetailsList>${viewDetailsList}</ViewDetailsList></View>`;
  }
});
