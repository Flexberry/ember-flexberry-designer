/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';
import FdUmlElement, { UsecaseActor, UsecaseActorView } from './fd-uml-usecase-actor';

/**
  An object that describes a Sequence Actor element on the UML diagram.

  @class FdUmlSequenceActor
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
    
    return new SequenceActor(properties);
  },
});

/**
  Defines the JointJS object, which represents a Sequence Actor in the UML diagram.

  @for FdUmlSequenceActor
  @class SequenceDiagramActor
  @extends basic.Generic.
  @namespace flexberry.uml
  @constructor
*/
export let SequenceActor = UsecaseActor.define('flexberry.uml.SequenceActor');

joint.shapes.flexberry.uml.SequenceActorView = UsecaseActorView;