/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { SequenceActor } from './fd-uml-sequence-actor';

/**
  An object that describes a Sequence Object element on the UML diagram.

  @class FdUmlSequenceObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the SequenceObject.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS(graph) {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    properties.graph = graph;
    return new SequenceDiagramObject(properties);

  },
});

/**
  Defines the JointJS object, which represents a Sequence Object in the UML diagram.

  @for FdUmlSequenceDiagramObject
  @class SequenceDiagramObject
  @extends SequenceActor
  @namespace flexberry.uml
  @constructor
*/
export let SequenceDiagramObject = SequenceActor.define('flexberry.uml.sequencediagramObject', {
  attrs: {
    size: { 'width': 40, 'height': 40 },
    rect: { width: 40, height: 40, fill: '#FFFFFF', stroke: 'black' },
  }
});
