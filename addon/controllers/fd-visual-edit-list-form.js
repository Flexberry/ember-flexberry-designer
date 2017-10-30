import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['formId', 'classId'],

  listform: null,

  listforms: [],

  listAttributes: [],

  editControl: {},

  attributes: [  ],

  _parseDefinition: function(definition) {
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
            let visible =  item.getAttribute('Visible');
            let isMaster =  item.getAttribute('IsMaster');
            let lookupType =  item.getAttribute('LookupType');
            let masterPropertyName =  item.getAttribute('MasterPropertyName');
            let masterCustomizationString =  item.getAttribute('MasterCustomizationString');
            ret.push({
              propertyName:propertyName,
              caption:caption,
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

  setAttributes: function(attributes) {
    Ember.set(this, 'listAttributes', attributes);
  },

});
