/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a UsecaseActor on the UML diagram.

  @class FdUmlUsecaseActor
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
    return new UsecaseActor(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'UsecaseActor' object in the UML diagram.

  @for FdUmlUsecaseActor
  @class UsecaseActor
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let UsecaseActor = BaseObject.define('flexberry.uml.UsecaseActor', {
  attrs: {
    image: {
      'xlink:href': 'assets/images/actor.svg',
      width: 30,
      'ref': '.flexberry-uml-header-text',
      'refY': -55,
      'refX': 3,
      height: 50
    },

    '.flexberry-uml-header-text': {
      'ref': '',
      'textAnchor': 'middle',
      'yAlignment': 'middle',
      'fontWeight': 'bold',
      'fill': 'black',
      'fontSize': 12,
      'fontFamily': 'Arial'
    }
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '</g>',
    '<image/>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join('')
});
