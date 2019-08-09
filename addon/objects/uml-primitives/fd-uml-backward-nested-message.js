/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';

import FdUmlElement from './fd-uml-element';
import { CollMessageBase } from './fd-uml-base-coll-message';

/**
  An object that describes a BackwardNestedMessage on the UML diagram.

  @class FdUmlBackwardNestedMessage
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property attrs
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
    return new BackwardNestedMessage(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'BackwardNestedMessage' object in the UML diagram.

  @for FdUmlBackwardNestedMessage
  @class BackwardNestedMessage
  @extends CollMessageBase
  @namespace flexberry.uml
  @constructor
*/
export let BackwardNestedMessage = CollMessageBase.define('flexberry.uml.BackwardNestedMessage', {
  attrs: {
    '.arrow': {
      'd': 'M 15 0 L 0 5 L 15 10 z',
      'fill': 'black',
      'refY': -5
    },
    text: { visibility: 'hidden' }
  }
});

joint.shapes.flexberry.uml.BackwardNestedMessageView = joint.shapes.flexberry.uml.UsecaseActorView;
