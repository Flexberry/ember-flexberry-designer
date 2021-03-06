/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { A, isArray } from '@ember/array';

import { SignalReceiptRight } from './fd-uml-signal-receipt';
import FdUmlElement from './fd-uml-element';

import joint from 'npm:jointjs';

/**
  An object that describes a SignalSend elements on the UML diagram.

  @class FdUmlSignalSend
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the signal send.

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
    if (type === 'STORMCASE.UML.ad.SignalSendLeft, UMLAD') {
      return new SignalSendLeft(properties);
    } else {
      return new SignalSendRight(properties);
    }
  },
});

/**
  Defines the JointJS object, which represents a `SignalSendRight` figure.

  @for FdUmlSignalSend
  @class SignalSendRight
  @extends flexberry.uml.SignalReceiptRight
  @namespace flexberry.uml
  @constructor
*/
export let SignalSendRight = SignalReceiptRight.define('flexberry.uml.SignalSendRight', {
  attrs: {
    '.flexberry-uml-header-rect-path': {
      'stroke': 'black',
      'stroke-width': 1,
      'd': 'M 0 0 L 80 0 100 20 80 40 0 40 Z'
    }
  }
});

/**
  Defines the JointJS object, which represents a `SignalSendLeft` figure.

  @for FdUmlSignalSend
  @class SignalSendLeft
  @extends flexberry.uml.SignalSendRight
  @namespace flexberry.uml
  @constructor
*/
export let SignalSendLeft = SignalReceiptRight.define('flexberry.uml.SignalSendLeft', {
  attrs: {
    '.flexberry-uml-header-rect-path': {
      'stroke': 'black',
      'stroke-width': 1,
      'd': 'M 20 0 L 100 0 100 40 20 40 0 20 Z'
    }
  }
});

joint.shapes.flexberry.uml.SignalSendRightView = joint.shapes.flexberry.uml.SignalReceiptRightView .extend({
  recalculatePathPoints(newWidth, newHeight) {
    //calculating path points
    let points = A();
    points[0] = '0 0';
    points[1] = newWidth.toString() + ' 0';
    points[2] = (newWidth + 20).toString() + ' ' + (newHeight / 2).toString();
    points[3] = newWidth.toString() + ' ' + newHeight.toString();
    points[4] = '0 ' + newHeight.toString();

    return points;
  }
});

joint.shapes.flexberry.uml.SignalSendLeftView = joint.shapes.flexberry.uml.SignalSendRightView .extend({
  recalculatePathPoints(newWidth, newHeight) {
    //calculating path points
    let points = A();
    points[0] = '-20 ' + (newHeight / 2).toString();
    points[1] = '0 0';
    points[2] = newWidth.toString() + ' 0';
    points[3] = newWidth.toString() + ' ' + newHeight.toString();
    points[4] = '0 ' + newHeight.toString();

    return points;
  }
});
