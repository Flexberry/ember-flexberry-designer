/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { SequenceDiagramObject } from './fd-uml-sequence-object';

/**
  An object that describes a Sequence Active Object element on the UML diagram.

  @class FdUmlSequenceActiveObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the SequenceActiveObejct.

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
    rect: { 'stroke-width':2 } }
});
