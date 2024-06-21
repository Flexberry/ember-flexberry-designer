/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { isNone } from '@ember/utils';

import { BaseObject } from './fd-uml-baseobject';
import FdUmlElement from './fd-uml-element';

import joint from 'npm:jointjs';

/**
  An object that describes an Component element on the UML diagram.

  @class FdUmlComponent
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the Component.

    @property name
    @type String
  */
  name: computed('primitive.Name.Text', {
    get() {
      return this.get('primitive.Name.Text');
    },
    set(key, value) {
      let nameTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Name.Text', nameTxt);
      return value;
    },
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new Component(properties);
  },
});

/**
  Defines the JointJS object, which represents an Component in the UML diagram.

  @for FdUmlComponent
  @class Component
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let Component = BaseObject.define('flexberry.uml.Component', {
  attrs: {
    '.firstRect': {'refY': '50%', 'refY2': '-8', 'fill': 'white', 'stroke': 'black', 'stroke-width': 1 },
    '.secondRect': { 'refY': '50%', 'refY2': '2', 'fill': 'white', 'stroke': 'black', 'stroke-width': 1 }
  },

  // Minimum height.
  minHeight: 30,

  // Minimum width
  minWidth: 80,
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '<rect class="firstRect" width="10" height="5" x="-5"/>',
    '<rect class="secondRect" width="10" height="5" x="-5"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

  getRectangles() {
    return [
      { type: 'header', element: this }
    ];
  },
});

joint.shapes.flexberry.uml.ComponentView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea type="text" class="active-object-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  setColors() {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.setColors.apply(this, [0.2]);

    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.firstRect/stroke', textColor);
      this.model.attr('.secondRect/stroke', textColor);
    }
  }
});
