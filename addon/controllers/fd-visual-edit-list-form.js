
import Ember from 'ember';

import FdDataTypes from '../utils/fd-datatypes';

export default Ember.Controller.extend({

  queryParams: ['formId', 'classId'],

  dataTypes: undefined,

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
  Prototypes.

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

  /*editControl: {},*/

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


});
