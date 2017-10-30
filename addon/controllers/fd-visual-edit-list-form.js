import Ember from 'ember';

import FdDataTypes from '../utils/fd-datatypes';

export default Ember.Controller.extend({

  queryParams: ['formId', 'classId'],

  dataTypes: undefined,

  listform: null,

  listforms: [],

  listAttributes: [],

  associations: undefined,

  aggregations: undefined,

  devClasses: undefined,

  viewClassId: null,

  definition: null,

  attrNames: {},

  notUsedAttrs: [],

  attrsTree: {},

  editControl: {},

  controlTypes: Ember.computed(
    function() {
      this.dataTypes = FdDataTypes.create();
      let ret =  this.dataTypes.fDTypes();
      return ret;
    }
  ),

//   _parseDefinition: function(definition) {
//     let ret = [];
//     let parser = new DOMParser();
//     let xmlDoc = parser.parseFromString(definition, 'text/xml');
//     if (xmlDoc) {
//       let view = xmlDoc.getElementsByTagName('View');
//       if (view.length > 0) {
//         let viewPropertiesList = view[0].getElementsByTagName('ViewPropertiesList');
//         if (viewPropertiesList.length > 0) {
//           let itemList = viewPropertiesList[0].getElementsByTagName('Item');
//           for (let item of itemList) {
//             let propertyName = item.getAttribute('PropertyName');
//             let caption = item.getAttribute('Caption');
//             let visible =  item.getAttribute('Visible');
//             let isMaster =  item.getAttribute('IsMaster');
//             let lookupType =  item.getAttribute('LookupType');
//             let masterPropertyName =  item.getAttribute('MasterPropertyName');
//             let masterCustomizationString =  item.getAttribute('MasterCustomizationString');
//             ret.push({
//               propertyName:propertyName,
//               caption:caption,
//               visible: visible,
//               isMaster: isMaster,
//               lookupType: lookupType,
//               masterPropertyName: masterPropertyName,
//               masterCustomizationString: masterCustomizationString
//             });
//           }
//         }
//       }
//     }
//
//     return ret;
//   },

//   setAttributes: function(attributes) {
//     Ember.set(this, 'listAttributes', attributes);
//   },

  setClassTree: function(associations, aggregations, devClasses) {
    Ember.set(this, 'associations', associations);
    Ember.set(this, 'aggregations', aggregations);
    Ember.set(this, 'devClasses', devClasses);
  },



  _notUsedAttrs: function (path, classId) {
    let ret = [];
    let devClass = this.devClasses[classId];
    for (let attrName in devClass.attributes) {
      let fullName = path.concat(attrName).join('.');
      if (!(fullName in this.attrNames)  || this.attrNames[fullName].visible === 'False') {
        ret.push(fullName);
      }
    }
    for (let i in this.associations) {
      let association = this.associations[i];
      if (association.endClass.id === classId) {
        let role = association.startRole;
        let newPath = path.concat(role);
        let fullName = newPath.join('.');
        if (!(fullName in this.attrNames)  || this.attrNames[fullName].visible === 'False') {
          ret.push(fullName);
        }
        ret = ret.concat(this._notUsedAttrs(newPath, association.startClass.id));
      }
    }
    return ret;
  },

  _attrsTree: function (path, classId) {
    let ret = [];
    let devClass = this.devClasses[classId];
    for (let attrName in devClass.attributes) {
      let attribute = Object.assign({}, devClass.attributes[attrName]);
      let fullName = path.concat(attrName).join('.');
      attribute.fullName = fullName;
      attribute.visible = (fullName in this.attrNames) && this.attrNames[fullName].visible === 'True';
      attribute.hidden = (fullName in this.attrNames) && this.attrNames[fullName].visible === 'False';
      ret.push(attribute);
    }
    for (let i in this.associations) {
      let association = this.associations[i];
      if (association.endClass.id === classId) {
        let role = association.startRole;
        let newPath = path.concat(role);
        let fullName = newPath.join('.');
        let node = { role: role , fullName: fullName};
        node.visible = (fullName in this.attrNames) && this.attrNames[fullName].visible === 'True';
        node.hidden = (fullName in this.attrNames) && this.attrNames[fullName].visible === 'False';
        node.children = this._attrsTree(newPath, association.startClass.id);
        ret.push(node);
      }
    }
    return ret;
  },

  findAttrsNames: function(ok, nodes) {
    let ret = [];
    if (nodes === undefined) {
      nodes = this.attrsTree;
    }
    for (let i in nodes) {
      let node = nodes[i];
      if (ok(node)) {
        ret.push(node.fullName);
        if ('role' in node) {
          ret = ret.concat(ok, node.children);
        }
      }
    }
    return ret;
  },

  setListAttributes: function(viewClassId, definition) {
    Ember.set(this, 'viewClassId', viewClassId);
    Ember.set(this, 'definition', definition);
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

    this.attrNames = {};
    for (let i = 0; i < this.definition.length; i++) {
      let attr = this.definition[i];
      this.attrNames[attr.propertyName] = attr;
    }
    this.notUsedAttrs = this._notUsedAttrs([], viewClassId);
    this.attrsTree = this._attrsTree([], viewClassId);
    alert('Invisible: ' + this.findAttrsNames(function(node){ return !node.visible}));
    alert('Hidden: ' + this.findAttrsNames(function(node){ return node.hidden}));
    //     alert("N=" + listAttributes.length + "\n" + JSON.stringify(listAttributes));
    Ember.set(this, 'listAttributes', listAttributes);
  },


});
