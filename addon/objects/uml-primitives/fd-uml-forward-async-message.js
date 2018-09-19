/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a ForwardAsyncMessage on the UML diagram.

  @class FdUmlForwardAsyncMessage
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
    return new ForwardAsyncMessage(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'ForwardAsyncMessage' object in the UML diagram.

  @for FdUmlForwardAsyncMessage
  @class ForwardAsyncMessage
  @extends CollMessageBase
  @namespace flexberry.uml
  @constructor
*/
export let ForwardAsyncMessage = CollMessageBase.define('flexberry.uml.ForwardAsyncMessage', {
  attrs: {
    '.arrow': {
      'd': 'M 5 0 L 0 -5',
      'refX': 55
    },

    '.uml-base-text': {
      'text': ''
    }
  }
});
