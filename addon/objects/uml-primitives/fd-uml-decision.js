/**
  @module ember-flexberry-designer
*/

import joint from 'npm:jointjs';

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

    return new Decision(properties);
  },
});

/**
  Defines the JointJS object, which represents a `Decision` object in the UML diagram.

  @for FdUmlDecision
  @class Decision
  @extends basic.Rhombus
  @namespace flexberry.uml
  @constructor
*/
export let Decision = joint.shapes.basic.Rhombus.define('flexberry.uml.Decision', {
  attrs: { text: { 'display': 'none' } }
});
