/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { isNone } from '@ember/utils';
import { A } from '@ember/array';
import joint from 'npm:jointjs';
import $ from 'jquery';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes an CollMessageBase on the UML diagram.

  @class FdUmlCollMessageBase
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property name
    @type String
  */
  name: computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    properties.objectModel = this;
    return new CollMessageBase(properties);
  },
});

/**
  Defines the JointJS object, which represents a CollMessageBase.

  @for FdUmlCollMessageBase
  @class CollMessageBase
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let CollMessageBase = joint.shapes.basic.Generic.define('flexberry.uml.CollMessageBase', {
  attrs: {
    '.line': {
      'stroke': 'black',
      'strokeWidth': '1',
      'fill': '#ffffff',
      'd':'M0,0 L 60,0'
    },

    '.arrow': {
      'ref':'.line',
      'stroke': 'black',
      'stroke-width':'1',
    },
  },
}, {
  // markup: [
  //   '<g class="rotatable">',
  //     '<path class="line"/>',
  //     '<path class="arrow"/>',
  //   '</g>'
  // ].join(''),

  markup: [{
    tagName: 'g',
    className: 'rotatable',
    children: [{
        tagName: 'path',
        className: 'line'
    }, {
        tagName: 'path',
        className: 'arrow'
    }]
  }],

  // Minimum height.
  minHeight: 10,

  // Minimum width
  minWidth: 60,

  getRectangles() {
    return [];
  },
});

joint.shapes.flexberry.uml.CollMessageBaseView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea under-class-name-input class="class-name-input params-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  setColors() { 
    const brushColor = this.getBrushColor();
    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.arrow/stroke', textColor);
      this.model.attr('.line/stroke', textColor);
      this.model.attr('.arrow/fill', textColor);
    }

    const inputElements = this.model.inputElements;
    if (isArray(inputElements) && (!isNone(textColor) || !isNone(brushColor))) {
      inputElements.each(function(index, input) {
        if (!isNone(textColor)) {
          $(input).find('input, textarea').css('color', textColor);
        }

        if (!isNone(brushColor)) {
          $(input).find('input, textarea').css('background-color', brushColor);
        }
      });
    }
  },

  getSizeChangers() {
    return A();
  },

  updateRectangles: function (resizedWidth, resizedHeight) {
    const minWidth = this.model.attributes.minWidth;
    const minHeight = this.model.attributes.minHeight;
    const oldSize = this.model.size();

    let newHeight = Math.max( resizedHeight || oldSize.height, minHeight)
    let newWidth = Math.max( resizedWidth || oldSize.width, minWidth)

    let $box = this.$box;
    let inputs =  $box.find('.class-name-input');
    let $buffer = $box.find('.input-buffer');

    inputs.each(function() {
      let $input = $(this);
      $buffer.css('font-weight', $input.css('font-weight'));
      $buffer.text($input.val());
      $input.width($buffer.width() + 1);
      $input[0].style.marginLeft = -$input.width()/2 + 'px';
    });

    this.model.resize(newWidth, newHeight);
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }

    let paramsBox = this.$box.find('.params-input');
    paramsBox.css({
      left: newWidth/2,
      top: newHeight,
      position: 'absolute'
    });
  },
});