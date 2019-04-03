import DS from 'ember-data';
import { A } from '@ember/array';
import { get } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import FdViewAttributesProperty from '../objects/fd-view-attributes-property';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';

export default DS.Transform.extend({
  deserialize(definition) {
    let ret = A();
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
          let visible = item.getAttribute('Visible') === 'True' ? true : false;
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
          let loadOnLoadAgregator = item.getAttribute('LoadOnLoadAgregator') === 'True' ? true : false;
          let detailPath = item.getAttribute('DetailPath');
          let detailCaption = item.getAttribute('DetailCaption');
          let detailVisible = item.getAttribute('DetailVisible') === 'True' ? true : false;
          ret.pushObject(FdViewAttributesDetail.create({
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

    // TODO in version Ember 2.12+ replace on 'uniqBy'.
    let uniqRet = A();
    let seen = Object.create(null);
    ret.forEach((item) => {
      let guid = guidFor(get(item, 'name'));
      if (!(guid in seen)) {
        seen[guid] = true;
        uniqRet.push(item);
      }
    });

    return uniqRet;
  },

  serialize(deserialized) {
    if (!deserialized) {
      return deserialized;
    }

    let viewPropertiesList = '';
    let viewDetailsList = '';
    for (let i = 0; i < deserialized.length; i++) {
      let d = deserialized[i];
      if (d instanceof FdViewAttributesDetail) {
        let detailName = `DetailName="${d.name}"`;
        let detailViewName = `DetailViewName="${d.detailViewName}"`;
        let loadOnLoadAgregator = `LoadOnLoadAgregator="${d.loadOnLoadAgregator === true ? 'True' : 'False'}"`;
        let detailPath = `DetailPath="${d.path}"`;
        let detailCaption = `DetailCaption="${d.caption}"`;
        let detailVisible = `DetailVisible="${d.visible === true ? 'True' : 'False'}"`;
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
        let visible = `Visible="${d.visible === true ? 'True' : 'False'}"`;
        viewPropertiesList += `<Item ${propertyName} ${caption} ${path} ${visible}` +
         ` ${isMaster} ${lookupType} ${masterPropertyName} ${masterCustomizationString} />`;
      }
    }

    return `<View><ViewPropertiesList>${viewPropertiesList}</ViewPropertiesList><ViewDetailsList>${viewDetailsList}</ViewDetailsList></View>`;
  }
});
