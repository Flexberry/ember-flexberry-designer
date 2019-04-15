/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes an history on the UML diagram.

  @class FdUmlHistory
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    Type of primitive.

    @property type
    @type String
  */
  type: computed.alias('primitive.$type'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'position');
    if (this.get('type') === 'STORMCASE.UML.std.DeepHistory, UMLSTD') {
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
