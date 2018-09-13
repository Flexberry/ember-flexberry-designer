/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a BackwardNestedMessage on the UML diagram.

  @class FdUmlBackwardNestedMessage
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The attrs of the class.

    @property attrs
    @type String
  */
  attrs: Ember.computed('primitive.Name.Text', function() {
    return { '.uml-base-text': { 'text': this.get('primitive.Name.Text') } };
  }),

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'attrs', 'size', 'position');
    return new BackwardNestedMessage(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'BackwardNestedMessage' object in the UML diagram.

  @for FdUmlBackwardNestedMessage
  @class BackwardNestedMessage
  @extends CollMessageBase
  @namespace flexberry.uml
  @constructor
*/
export let BackwardNestedMessage = CollMessageBase.define('flexberry.uml.BackwardNestedMessage', {
  attrs: {
    '.arrow': {
      'd': 'M 15 0 L 0 5 L 15 10 z',
      'fill': 'black',
      'refY': -5
    },

    '.uml-base-text': {
      'text': ''
    }
  }
});
