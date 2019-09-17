/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import joint from 'npm:jointjs';

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
    let properties = this.getProperties('id', 'attrs', 'size', 'position');
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
  }
});

joint.shapes.flexberry.uml.BackwardAsyncMessageView = joint.shapes.flexberry.uml.CollMessageBaseView;
