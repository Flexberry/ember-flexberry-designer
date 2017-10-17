import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['formId'],

  listform: null,

  listforms: [],

  listAttributes: [],

  associations: undefined,

  devClasses: undefined,

  viewClassId: null,

  definition: null,

  editControl: {},

  attributes: [/*
  {
    name: 'Логин',
    nameStr: 'Логин',
    description: null,
    id: '20fea097-0dab-45ed-957e-542acccdf623',
    hint: null,
    orderNum: 2,
    autoincrement: false,
    caption: null,
    realCaption: 'Логин',
    trim: true,
    dataServiceExpression: null,
    storage: null,
    publishName: null,
    realStorage: 'Логин',
    notNull: false,
    order: false,
    pBCustomAttributes: true,
    pBGetEnd: true,
    pBSetEnd: true,
    pBGetStart: true,
    pBSetStart: true,
    type: 'string',
    defaultValue: null,
    stored: true,
    accessModifier: 'Public'
  },
  {
    name: 'Name',
    nameStr: 'Name',
    description: null,
    id: '6f8cbbb3-abe1-4a60-b3d2-43882d5a7781',
    hint: null,
    orderNum: 1,
    autoincrement: false,
    caption: null,
    realCaption: 'Name',
    trim: true,
    dataServiceExpression: null,
    storage: null,
    publishName: null,
    realStorage: 'Name',
    notNull: false,  _parseDefinition: function(definition) {
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
              ret.push({ propertyName:propertyName, caption:caption });
            }
          }
        }
      }

      return ret;
    },
    order: false,
    pBCustomAttributes: true,
    pBGetEnd: true,
    pBSetEnd: true,
    pBGetStart: true,
    pBSetStart: true,
    type: 'string',
    defaultValue: null,
    stored: true,
    accessModifier: 'Public'
  },
  {
    name: 'Актуально',
    nameStr: 'Актуально',
    description: null,
    id: 'ad2adac3-fe78-4dc7-b2d2-59717b0875c7',
    hint: null,
    orderNum: 3,
    autoincrement: false,
    caption: null,
    realCaption: 'Актуально',
    trim: true,
    dataServiceExpression: null,
    storage: null,
    publishName: null,
    realStorage: 'Актуально',
    notNull: true,
    order: false,
    pBCustomAttributes: true,
    pBGetEnd: true,
    pBSetEnd: true,
    pBGetStart: true,
    pBSetStart: true,
    type: 'bool',
    defaultValue: 'true',
    stored: true,
    accessModifier: 'Public'
  },*/
  ],

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

//   setAttributes: function(attributes) {
//     Ember.set(this, 'listAttributes', attributes);
//   },

  setClassTree: function(associations, devClasses) {
    Ember.set(this, 'associations', associations);
    Ember.set(this, 'devClasses', devClasses);
  },

  setDefinition: function(viewClassId, definition) {
    Ember.set(this, 'viewClassId', viewClassId);
    let viewClass = this.devClasses[viewClassId];
    let _this = this;
    for (let i in  definition) {
      let attr = definition[i];
      if (attr.isMaster === "False") {
        let attrClass = viewClass;
        let propertyName = attr.propertyName;
        let steps = propertyName.split('.');
        let attrName;
        if (steps.length === 1 && propertyName in attrClass.attributes) {
          attrName = propertyName;
        } else {
          let association;
          let startClassName = viewClass.name;
          for (let j=0; j < steps.length -1; j++) {
            let step = steps[j];
            let k;
            for (k = 0; k < this.associations.length; k++) {
              association = this.associations[k];
              if (association.endClass.name === startClassName && association.startRole === step) {
                startClassName = step;
                break;
              }
            }
            if (k >= this.associations.length) {
              continue;
            }
            Ember.assert('PropertyName: ' + propertyName +
              ' Association for startClass "' +  startClassName + '" and role "' + step + '" not found',
              k < this.associations.length);
          }
          attrName = steps[steps.length-1];
          let classId = association.startClass.id;
          Ember.assert('PropertyName: ' + propertyName +
            ' startClass "' +  association.startClass.name +
            '(' + classId +') of association "' + association.startRole +
            '" not found in attribute "' + attrName + '"',
            classId in this.devClasses);
          attrClass = this.devClasses[classId];
        }
        if (! (attrName in attrClass.attributes)) {
          continue;
        }
        Ember.assert('PropertyName: ' + propertyName +
          ' attribute name "' +  attrName + '" not found in class "' + attrClass.name,
          attrName in attrClass.attributes);
        let classAttr = attrClass.attributes[attrName];
        attr['type'] = classAttr['type'];
        attr['defaultValue'] = classAttr['defaultValue'];
      } else {
        attr['type'] = 'guid';
        attr['defaultValue'] = null;
      }
    }
//     alert(JSON.stringify(definition));
    let listAttributes = [];
    for (let i =0; i < definition.length; i++) {
      let defAttribute = definition[i];
      if (defAttribute.visible === 'False') {
        continue;
      }
      let attribute = {
        name: defAttribute.propertyName,
        type: defAttribute.type,
        defaultValue: defAttribute.defaultValue
      };
      listAttributes.push(attribute);
    }
    alert("N=" + listAttributes.length + "\n" + JSON.stringify(listAttributes));
    Ember.set(this, 'listAttributes', listAttributes);
  }

});
