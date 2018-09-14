/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes an start state on an activity diagram

  @class FdUmlActiveState
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    Start state name text.

    @property attrs
    @type String
  */
  attrs: Ember.computed('primitive.Name.Text', function() {
    return { text: { text: this.get('primitive.Name.Text') } };
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'attrs', 'position');

    return new StartState(properties);

  },
});

/**
  Defines the JointJS object, which represents a 'StartState' object in the UML diagram.

  @for FdUmlStartState
  @class StartState
  @extends shapes.uml.
  @namespace flexberry.uml
  @constructor
*/
export let StartState = joint.shapes.uml.StartState.define('flexberry.uml.StartState', {
  size: { width: 12, height: 12 },
  attrs: {
    circle: { 'fill': 'black', 'stroke': 'black', 'stroke-width': 2, 'rx': 1 },
    text: {
      'ref-x': -5,
      'text-anchor': 'end',
      'y-alignment': 'middle',
      'font-weight':'bold',
      'font-size':'12'
    }
  }
});
