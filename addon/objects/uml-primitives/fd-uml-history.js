/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';
import { isArray } from '@ember/array';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes an history on the UML diagram.

  @class FdUmlHistory
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    Name on the start state element.

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

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'position');
    properties.objectModel = this;
    if (this.primitive.$type === 'STORMCASE.UML.std.DeepHistory, UMLSTD') {
      return new DeepHistory(properties);
    } else {
      return new History(properties);
    }
  },
});

/**
  Defines the JointJS object, which represents a History.

  @for FdUmlHistory
  @class History
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let History = joint.shapes.basic.Circle.define('flexberry.uml.History', {
  attrs: { text: { 'text': 'H', 'font-family':'Times New Roman', 'font-size': '12' } },
  size: { width: 20, height: 20 }
});

/**
  Defines the JointJS object, which represents a DeepHistory.

  @for FdUmlHistory
  @class DeepHistory
  @extends History
  @namespace flexberry.uml
  @constructor
*/
export let DeepHistory = History.define('flexberry.uml.DeepHistory', {
  attrs: { text: { 'text': 'H*' } }
});
