/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a DesignPattern on the UML diagram.

  @class FdUmlDesignPattern
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    return new DesignPattern(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'DesignPattern' object in the UML diagram.

  @for FdUmlDesignPattern
  @class DesignPattern
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let DesignPattern = BaseObject.define('flexberry.uml.DesignPattern', {
  attrs: {
    text: {
      'visibility': 'visible'
    },

    '.flexberry-uml-header-rect': { 'rx': '120', 'ry': '120', 'stroke': 'black', 'strokeDasharray': '10,2', 'strokeWidth': '1', 'fill': '#ffffff' }
  }
}, {
  updateRectangles: function () {
    this.updateRectanglesOld();
  }
});
