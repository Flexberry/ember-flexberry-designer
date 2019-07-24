/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';
import { computed } from '@ember/object';

import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a ForwardAsyncMessage on the UML diagram.

  @class FdUmlForwardAsyncMessage
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
      return this.get('primitive.Name.Text');;
    },
    set(key, value) {
      let attributesTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Name.Text', attributesTxt);
      return value;
    },
  }),

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
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
    text: { visibility: 'hidden' }
  }
});

joint.shapes.flexberry.uml.ForwardAsyncMessageView = joint.shapes.flexberry.uml.UsecaseActorView;
