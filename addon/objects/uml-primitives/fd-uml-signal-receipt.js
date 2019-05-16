/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';

import { BaseObject } from './fd-uml-baseobject';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes a Signal Reciept element on the UML diagram.

  @class FdUmlSignalReceipt
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    Signal Receipt name (actually its text).

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
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    let type = this.get('type');
    if (type === 'STORMCASE.UML.ad.SignalReceiptLeft, UMLAD') {
      return new SignalReceiptLeft(properties);
    } else {
      return new SignalReceiptRight(properties);
    }
  },
});

/**
  Defines the JointJS object, which represents a `SignalReceiptRight` figure.

  @for FdUmlSignalReceipt
  @class SignalReceiptRight
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let SignalReceiptRight = BaseObject.define('flexberry.uml.SignalReceiptRight', {
  attrs: {
    text: {
      'ref': 'path',
      'font-weight': 'bold',
      'visibility': 'visible'
    },
    path: {
      'd': 'M 0 0 L 100 0 80 20 100 40 0 40 Z',
    }
  }
}, {
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<path class="flexberry-uml-header-rect"/>',
      '</g>',
      '<text class="flexberry-uml-header-text"/>',
      '</g>'
    ].join(''),

    updateRectangles: function () {
      this.updateRectanglesOld();
    }
  });

/**
  Defines the JointJS object, which represents a `SignalReceiptLeft` figure.

  @for FdUmlSignalReceipt
  @class SignalReceiptLeft
  @extends flexberry.uml.SignalReceiptRight
  @namespace flexberry.uml
  @constructor
*/
export let SignalReceiptLeft = SignalReceiptRight.define('flexberry.uml.SignalReceiptLeft', {
  attrs: {
    path: {
      'd': 'M 0 0 L 100 0 100 40 0 40 20 20 Z'
    }
  }
});
