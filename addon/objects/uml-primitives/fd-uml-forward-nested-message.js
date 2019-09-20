/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import joint from 'npm:jointjs';


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

    @property name
    @type String
  */
 name: computed('primitive.Name.Text', {
  get() {
    return this.get('primitive.Name.Text');
  },
  set(key, value) {
    let nameTxt = (isArray(value)) ? value.join('\n') : value;
    this.set('primitive.Name.Text', nameTxt);
    return value;
  },
}),

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
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
    text: { visibility: 'hidden' }
  },

  // Minimum height.
  minHeight: 10,

  // Minimum width
  minWidth: 60,
});

joint.shapes.flexberry.uml.ForwardNestedMessageView = joint.shapes.flexberry.uml.CollMessageBaseView;
