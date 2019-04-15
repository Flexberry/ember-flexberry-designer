/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';

import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a BackwardAsyncMessage on the UML diagram.

  @class FdUmlBackwardAsyncMessage
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
    return new BackwardAsyncMessage(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'BackwardAsyncMessage' object in the UML diagram.

  @for FdUmlBackwardAsyncMessage
  @class BackwardAsyncMessage
  @extends CollMessageBase
  @namespace flexberry.uml
  @constructor
*/
export let BackwardAsyncMessage = CollMessageBase.define('flexberry.uml.BackwardAsyncMessage', {
  attrs: {
    '.arrow': {
      'd':'M 0 0 L 5 -5'
    },

    '.uml-base-text': {
      'text': ''
    }
  }
});
