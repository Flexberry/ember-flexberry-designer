/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { A, isArray } from '@ember/array';

import { BaseObject } from './fd-uml-baseobject';
import FdUmlElement from './fd-uml-element';

import joint from 'npm:jointjs';
import $ from 'jquery';

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
    '.flexberry-uml-header-rect-path': {
      'stroke': 'black',
      'stroke-width': 1,
      'd': 'M 0 0 L 100 0 80 20 100 40 0 40 Z',
    }
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<path class="flexberry-uml-header-rect flexberry-uml-header-rect-path"/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberry.uml.SignalReceiptRightView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
   '<div class="uml-class-inputs">',
   '<textarea class="class-name-input signal-input" value="" rows="1" wrap="off"></textarea>',
   '<div class="input-buffer"></div>',
   '</div>'
  ].join(''),

  updateRectangles() {
    let rects = this.model.getRectangles();

    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    rects.forEach(function (rect) {
      if (this.markup.includes('flexberry-uml-' + rect.type + '-rect') && rect.element.inputElements) {
        let $buffer = rect.element.inputElements.find('.input-buffer');
        let rectHeight = 0;
        let inputs = rect.element.inputElements.find('.signal-input');
        inputs.each(function () {
          let $input = $(this);
          $buffer.css('font-weight', $input.css('font-weight'));
          $buffer.text($input.val());
          $input.width($buffer.width() + 1);
          if ($input.width() > newWidth) {
            newWidth = $input.width();
          }

          rectHeight += $input.height();
        });

        rectHeight += rect.element.get('heightBottomPadding') || 0;
        newHeight += rectHeight;
        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/height', rectHeight);

        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/transform', 'translate(0,' + offsetY + ')');

        offsetY += rectHeight;
      }
    }, this.model);

    newWidth += (this.model.get('widthPadding') || 0) * 2;

    rects.forEach(function (rect) {
      rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', newWidth);
    });

    //Resize signal shape path
    rects.forEach((rect) => {
      let points = this.recalculatePathPoints(newWidth, newHeight);
      //set path
      rect.element.attr('.flexberry-uml-header-rect-path/d', 'M '+ points[0] + ' L ' + points[1] + ' ' + points[2] + ' ' + points[3] + ' ' + points[4] + ' Z');
    });

    this.model.resize(newWidth, newHeight);

    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    } 
  },

  recalculatePathPoints(newWidth, newHeight) {
      //increase rectangle width, because it have corner inside
      let newWidthInc = newWidth + 20;
      //calculating path points
      let points = A();
      points[0] = '0 0';
      points[1] = newWidthInc.toString() + ' 0';
      points[2] = (newWidthInc - 20).toString() + ' ' + (newHeight / 2).toString();
      points[3] = newWidthInc.toString() + ' ' + newHeight.toString();
      points[4] = '0 ' + newHeight.toString();

      return points;
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
    '.flexberry-uml-header-rect-path': {
      'stroke': 'black',
      'stroke-width': 1,
      'd': 'M 0 0 L 100 0 100 40 0 40 20 20 Z'
    }
  }
});

joint.shapes.flexberry.uml.SignalReceiptLeftView = joint.shapes.flexberry.uml.SignalReceiptRightView .extend({
   recalculatePathPoints(newWidth, newHeight) {
      //increase rectangle width, because it have corner inside
      //calculating path points
      let points = A();
      points[0] = '-20 0';
      points[1] = newWidth.toString() + ' 0';
      points[2] = newWidth.toString() + ' ' + newHeight.toString();
      points[3] = '-20 ' + newHeight.toString();
      points[4] = '0 ' + (newHeight / 2).toString();

      return points;
  }
});

