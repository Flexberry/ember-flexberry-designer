/**
  @module ember-flexberry-designer
*/

import joint from 'npm:jointjs';
import { BaseObject } from './fd-uml-baseobject';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a Decision on an activity UML diagram.

  @class FdUmlDecision
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new Decision(properties);
  },
});

/**
  Defines the JointJS object, which represents a `Decision` object in the UML diagram.

  @for FdUmlDecision
  @class Decision
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let Decision = BaseObject.define('flexberry.uml.Decision', {
  attrs: {
    '.flexberry-uml-header-rombus-path': {
      'stroke': 'black',
      'stroke-width': 1,
      'd': 'M 0 30 L 60 0 120 30 60 60 Z'
    }
  }
}, {
  markup: [
      '<g class="rotatable">',
      '<path class="flexberry-uml-header-rombus-path"/>',
      '</g>'
  ].join('')
});

joint.shapes.flexberry.uml.DecisionView = joint.shapes.flexberry.uml.PrimitiveElementView.extend({});
