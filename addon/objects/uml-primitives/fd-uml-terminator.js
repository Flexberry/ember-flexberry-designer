/**
  @module ember-flexberry-designer
*/

import joint from 'npm:jointjs';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes a Terminator on the UML sequence diagram.

  @class FdUmlTerminator
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    return new Terminator(properties);
  },
});

/**
  Defines the JointJS element, which represents the Terminator in the UML diagram.

  @for FdUmlTerminator
  @class Terminator
  @extends basic.Path
  @namespace flexberry.uml
  @constructor
*/
export let Terminator = joint.shapes.basic.Path.define('flexberry.uml.sequencediagramTerminator', {
  attrs: {
    size: { 'width': 40, 'height': 40 },
    path: { 'stroke-width':2, d: 'M0,0 40,40 M0,40 40,0z' }
  }
});
