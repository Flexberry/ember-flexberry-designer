/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a CollFlatMsgBack on the UML diagram.

  @class FdUmlCollFlatMsgBack
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property name
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
    return new CollFlatMsgBack(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'CollFlatMsgBack' object in the UML diagram.

  @for FdUmlCollFlatMsgBack
  @class CollFlatMsgBack
  @extends CollMessageBase
  @namespace flexberry.uml
  @constructor
*/
export let CollFlatMsgBack = CollMessageBase.define('flexberry.uml.CollFlatMsgBack', {
  attrs: {
    '.arrow': {
      'd': 'M -5 0 L 0 -5 L -5 0 L 0 5',
      'refX': 5
    },

    '.uml-base-text': {
      'text': ''
    }
  }
});
