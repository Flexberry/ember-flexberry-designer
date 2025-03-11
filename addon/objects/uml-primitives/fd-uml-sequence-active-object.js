/**
  @module ember-flexberry-designer
*/

import joint from 'npm:jointjs';
import FdUmlElement, { SequenceDiagramObject, SequencediagramObjectView } from './fd-uml-sequence-object';

/**
  An object that describes a Sequence Active Object element on the UML diagram.

  @class FdUmlSequenceActiveObject
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
    
    return new SequenceDiagramActiveObject(properties);
  },
});

/**
  Defines the JointJS object, which represents an Active Object in the UML diagram.

  @for FdUmlSequenceDiagramActiveObject
  @class SequenceDiagramActiveObject
  @extends SequenceDiagramObject
  @namespace flexberry.uml
  @constructor
*/
export let SequenceDiagramActiveObject = SequenceDiagramObject.define('flexberry.uml.sequencediagramActiveObject', {
  attrs: {
    '.flexberry-uml-header-rect': {
      'stroke-width': 2
    }
  },
});

joint.shapes.flexberry.uml.sequencediagramActiveObjectView = SequencediagramObjectView.extend({
  updateRectangles: function () {
    SequencediagramObjectView.prototype.updateRectangles.apply(this, arguments);

    let inputs =  this.$box.find('.class-name-input');
    inputs.css({
      'text-decoration': 'underline'
    });
  }
});
