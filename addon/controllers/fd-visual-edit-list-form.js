
import Ember from 'ember';

import FdDataTypes from '../utils/fd-datatypes';

export default Ember.Controller.extend({

  queryParams: ['formId', 'classId'],

  dataTypes: undefined,

  listformName: '',

  listAttributes: [],

  //   associations: undefined,
  //
  //   aggregations: undefined,
  //
  //   devClasses: undefined,
  //
  //   viewClassId: null,

  //   definition: null,

    /**
    Prototipes.

    @property prototypeBy
    @type Object contained:
      classId - class identificator
      devClasses - list classes with attributes
      assosiations - assosiations list
      aggregations - aggregations list
      usedAttrs  - list keys used attributes names
    @default undefined
   */
  prototypeBy: {},

  attrNames: {},

//   notUsedAttrs: [],

//   attrsTree: {},

  editControl: {},

  controlTypes: Ember.computed(
    function() {
      this.dataTypes = FdDataTypes.create();
      let ret =  this.dataTypes.fDTypes();
      return ret;
    }
  ),

  //   avaliableControls: undefined,

  //   usedAttrs: [],

  init: function() {
    this.prototypeBy = { classId:undefined, devClasses:{}, associations: [], aggregations: [], usedAttrs: [] };
  },

  //   _notUsedAttrs: function (path, classId) {
  //     let ret = [];
  //     let devClass = this.devClasses[classId];
  //     for (let attrName in devClass.attributes) {
  //       let fullName = path.concat(attrName).join('.');
  //       if (!(fullName in this.attrNames)  || this.attrNames[fullName].visible === 'False') {
  //         ret.push(fullName);
  //       }
  //     }
  //     for (let i in this.associations) {
  //       let association = this.associations[i];
  //       if (association.endClass.id === classId) {
  //         let role = association.startRole;
  //         let newPath = path.concat(role);
  //         let fullName = newPath.join('.');
  //         if (!(fullName in this.attrNames)  || this.attrNames[fullName].visible === 'False') {
  //           ret.push(fullName);
  //         }
  //         ret = ret.concat(this._notUsedAttrs(newPath, association.startClass.id));
  //       }
  //     }
  //     return ret;
  //   },
  //
  //   _attrsTree: function (path, classId) {
  //     let ret = [];
  //     let devClass = this.devClasses[classId];
  //     for (let attrName in devClass.attributes) {
  //       let attribute = Object.assign({}, devClass.attributes[attrName]);
  //       let fullName = path.concat(attrName).join('.');
  //       attribute.fullName = fullName;
  //       attribute.visible = (fullName in this.attrNames) && this.attrNames[fullName].visible === 'True';
  //       attribute.hidden = (fullName in this.attrNames) && this.attrNames[fullName].visible === 'False';
  //       ret.push(attribute);
  //     }
  //     for (let i in this.associations) {
  //       let association = this.associations[i];
  //       if (association.endClass.id === classId) {
  //         let role = association.startRole;
  //         let newPath = path.concat(role);
  //         let fullName = newPath.join('.');
  //         let node = { role: role , fullName: fullName};
  //         node.visible = (fullName in this.attrNames) && this.attrNames[fullName].visible === 'True';
  //         node.hidden = (fullName in this.attrNames) && this.attrNames[fullName].visible === 'False';
  //         node.children = this._attrsTree(newPath, association.startClass.id);
  //         ret.push(node);
  //       }
  //     }
  //     return ret;
  //   },


  //   setClassTree: function(associations, aggregations, devClasses) {
  //
  //   },

  //   findAttrsNames: function(ok, nodes) {
  //     let ret = [];
  //     if (nodes === undefined) {
  //       nodes = this.attrsTree;
  //     }
  //     for (let i in nodes) {
  //       let node = nodes[i];
  //       if (ok(node)) {
  //         ret.push(node.fullName);
  //         if ('role' in node) {
  //           ret = ret.concat(ok, node.children);
  //         }
  //       }
  //     }
  //     return ret;
  //   },

  setListAttributes: function(classId, definition, devClasses, associations) {
    Ember.set(this.prototypeBy, 'devClasses', devClasses);
    Ember.set(this.prototypeBy, 'associations', associations);
    Ember.set(this.prototypeBy, 'classId', classId);

    //     Ember.set(this, 'definition', definition);
    let viewClass = devClasses[classId];
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
            for (k = 0; k < associations.length; k++) {
              association = associations[k];
              if (association.endClass.name === startClassName && association.startRole === step) {
                startClassName = step;
                break;
              }
            }

            if (k >= associations.length) {
              continue;
            }

            Ember.assert('PropertyName: ' + propertyName +
              ' Association for startClass "' +  startClassName + '" and role "' + step + '" not found',
              k < associations.length);
          }

          attrName = steps[steps.length-1];
          let classId = association.startClass.id;
          Ember.assert('PropertyName: ' + propertyName +
            ' startClass "' +  association.startClass.name +
            '(' + classId +') of association "' + association.startRole +
            '" not found in attribute "' + attrName + '"',
            classId in devClasses);
          attrClass = devClasses[classId];
        }

        if (!(attrName in attrClass.attributes)) {
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
    this.attrNames = {};
    let usedAttrs = {};
    for (let i =0; i < definition.length; i++) {
      let attr = definition[i];
      this.attrNames[attr.propertyName] = attr;
      if (attr.visible === 'False') {
        continue;
      }

      usedAttrs[attr.propertyName] = true;
      let attribute = {
        name: attr.propertyName,
        type: attr.type,
        defaultValue: attr.defaultValue
      };

      listAttributes.push(attribute);
    }

    Ember.set(this, 'listAttributes', listAttributes);
    Ember.set(this.prototypeBy, 'usedAttrs', usedAttrs);
  },
});
