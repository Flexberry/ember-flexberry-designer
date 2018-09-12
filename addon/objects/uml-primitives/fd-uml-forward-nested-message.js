/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a CollNestedMsgForward on the UML diagram.

  @class FdUmlCollNestedMsgForward
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

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
    return new CollNestedMsgForward(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'CollNestedMsgForward' object in the UML diagram.

  @for FdUmlCollNestedMsgForward
  @class CollNestedMsgForward
  @extends CollMessageBase
  @namespace flexberry.uml
  @constructor
*/
export let CollNestedMsgForward = CollMessageBase.define('flexberry.uml.CollNestedMsgForward', {
  attrs: {
    '.arrow': {
      'd': 'M -15 0 L 0 5 L -15 10 z',
      'fill': 'black',
      'refX': 60,
      'refY': -5
    },

    '.uml-base-text': {
      'text': ''
    }
  }
});
