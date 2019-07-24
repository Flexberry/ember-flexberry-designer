/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';
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
    text: { visibility: 'hidden' },
  }
});

joint.shapes.flexberry.uml.BackwardAsyncMessageView = joint.shapes.flexberry.uml.UsecaseActorView;
