/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import joint from 'npm:jointjs';


import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a ForwardFlatMessage on the UML diagram.

  @class FdUmlForwardFlatMessage
  @extends FdUmlElement
*/
export default FdUmlElement.extend({
  
  /**
    The name of the class.

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
    text: { visibility: 'hidden' }
  }
}, {
  // Minimum height.
  minHeight: 30,

  // Minimum width
  minWidth: 80,
});

joint.shapes.flexberry.uml.ForwardFlatMessageView = joint.shapes.flexberry.uml.CollMessageBaseView;
