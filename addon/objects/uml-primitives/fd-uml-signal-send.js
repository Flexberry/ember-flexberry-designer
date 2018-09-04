/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { SignalReceiptRight } from './fd-uml-signal-receipt';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes a class on the UML diagram.

  @class FdUmlPropertyObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the ActiveObject.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    Type of primitive.

    @property type
    @type String
  */
  type: Ember.computed.alias('primitive.$type'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position', 'attributes', 'type');
    if (properties.type === 'STORMCASE.UML.ad.SignalSendLeft, UMLAD') {
      return new SignalSendLeft(properties);
    } else {
      return new SignalSendRight(properties);
    }
  },
});

/**
  Defines the JointJS link, which represents a `SignalSendRight` figure.

  @for FdUmlSignalSend
  @class SignalSendRight
  @extends flexberry.uml.SignalReceiptRight
  @namespace flexberry.uml
  @constructor
*/
export let SignalSendRight = SignalReceiptRight.define('flexberry.uml.SignalSendingRight', {
  attrs: {
    path: {
      'd': 'M 0 0 L 80 0 100 20 80 40 0 40 Z'
    }
  }
});

/**
  Defines the JointJS link, which represents a `SignalSendLeft` figure.

  @for FdUmlSignalSend
  @class SignalSendLeft
  @extends flexberry.uml.SignalSendRight
  @namespace flexberry.uml
  @constructor
*/
export let SignalSendLeft = SignalReceiptRight.define('flexberry.uml.SignalSendingLeft', {
  attrs: {
    path: {
      'd': 'M 20 0 L 100 0 100 40 20 40 0 20 Z'
    }
  }
});
