/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a CollAsyncMsgBack on the UML diagram.

  @class FdUmlCollAsyncMsgBack
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
    return new CollAsyncMsgBack(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'CollAsyncMsgBack' object in the UML diagram.

  @for FdUmlCollAsyncMsgBack
  @class CollAsyncMsgBack
  @extends CollMessageBase
  @namespace flexberry.uml
  @constructor
*/
export let CollAsyncMsgBack = CollMessageBase.define('flexberry.uml.CollAsyncMsgBack', {
  attrs: {
    '.arrow': {
      'd':'M 0 0 L 5 -5'
    },

    '.uml-base-text': {
      'text': ''
    }
  }
});
