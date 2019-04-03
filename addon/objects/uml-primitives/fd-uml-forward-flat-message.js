/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';

import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a ForwardFlatMessage on the UML diagram.

  @class FdUmlForwardFlatMessage
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
    return new ForwardFlatMessage(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'ForwardFlatMessage' object in the UML diagram.

  @for FdUmlForwardFlatMessage
  @class ForwardFlatMessage
  @extends CollMessageBase
  @namespace flexberry.uml
  @constructor
*/
export let ForwardFlatMessage = CollMessageBase.define('flexberry.uml.ForwardFlatMessage', {
  attrs: {
    '.arrow': {
      'd': 'M 5 0 L 0 -5 L 5 0 L 0 5',
      'refX': 55,
    },

    '.uml-base-text': {
      'text': ''
    }
  }
});
