/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes an CollMessageBase on the UML diagram.

  @class FdUmlCollMessageBase
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    return new CollMessageBase(properties);
  },
});

/**
  Defines the JointJS object, which represents a CollMessageBase.

  @for FdUmlCollMessageBase
  @class CollMessageBase
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let CollMessageBase = joint.shapes.basic.Generic.define('flexberry.uml.CollMessageBase', {
  attrs: {
    '.line': {
      'stroke': 'black',
      'strokeWidth': '1',
      'fill': '#ffffff',
      'd':'M0,0 L 60,0'
    },

    '.arrow': {
      'ref':'.line',
      'stroke': 'black',
      'stroke-width':'1',
    },

    '.uml-base-text': {
      'ref': '.line',
      'textAnchor': 'middle',
      'yAlignment': 'middle',
      'fontWeight': 'bold',
      'refY': 20,
      'refX': 30,
      'fill': 'black',
      'fontSize': 12,
      'fontFamily': 'Arial',
    }
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '</g>',
    '<path class="line"/>',
    '<text class="uml-base-text"/>',
    '<path class="arrow"/>',
    '</g>'
  ].join('')
});
