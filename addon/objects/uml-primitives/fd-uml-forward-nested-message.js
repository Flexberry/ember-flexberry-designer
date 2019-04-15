/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';

import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a ForwardNestedMessage on the UML diagram.

  @class FdUmlForwardNestedMessage
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The attrs of the class.

    @property attrs
    @type String
  */
  attrs: computed('primitive.Name.Text', function() {
    return { '.uml-base-text': { 'text': this.get('primitive.Name.Text') } };
  }),

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'attrs', 'size', 'position');
    return new ForwardNestedMessage(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'ForwardNestedMessage' object in the UML diagram.

  @for FdUmlForwardNestedMessage
  @class ForwardNestedMessage
  @extends CollMessageBase
  @namespace flexberry.uml
  @constructor
*/
export let ForwardNestedMessage = CollMessageBase.define('flexberry.uml.ForwardNestedMessage', {
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
