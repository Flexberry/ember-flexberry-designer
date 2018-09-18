/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a Multiobject on the UML diagram.

  @class FdUmlMultiObject
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
    return new MultiObject(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'MoreClasses' object in the UML diagram.

  @for FdUmlMoreClasses
  @class MultiObject
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let MultiObject = BaseObject.define('flexberry.uml.MultiObject', {
  attrs: {
    text: {
      'text-decoration': 'underline',
      'font-size': '12'
    },
    '.back-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' }
  }
}, {
  updateRectangles: function () {
    BaseObject.prototype.updateRectangles.apply(this, arguments);

    let attrs = this.get('attrs');
    let backRectTransY = 6;
    attrs['.back-rect'].transform = 'translate(3, ' + backRectTransY + ')';
    attrs['.back-rect'].height = this.size().height;
    attrs['.back-rect'].width = this.size().width;

    let newWidth = this.size().width;
    let newHeight = this.size().height + backRectTransY;
    this.resize(newWidth, newHeight);
  },

  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="back-rect"/><rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join('')
});