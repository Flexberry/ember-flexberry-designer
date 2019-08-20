/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';

import FdUmlElement from './fd-uml-element';
import joint from 'npm:jointjs';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a UseCase on the UML diagram.

  @class FdUmlUseCase
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property name
    @type String
  */
  name: computed.alias('primitive.Name.Text'),

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new UseCase(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'UseCase' object in the UML diagram.

  @for FdUmlUseCase
  @class UseCase
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let UseCase = BaseObject.define('flexberry.uml.UseCase', {
  attrs: {
    rect: { 'width': 400 },
    '.flexberry-uml-header-rect': { 'rx': '120', 'ry': '120', 'stroke': 'black', 'strokeWidth': '1', 'fill': '#ffffff' },

    '.flexberry-uml-header-text': {
      'ref': '.flexberry-uml-header-rect',
      'textAnchor': 'middle',
      'yAlignment': 'middle',
      'fontWeight': 'bold',
      'refY': 0.5,
      'refX': 0.5,
      'fill': 'black',
      'fontSize': 12,
      'fontFamily': 'Arial'
    }
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

  initialize: function () {
    BaseObject.prototype.initialize.apply(this, arguments);
    this.on('change:name', function() {
      this.updateRectangles();
    }, this);
  },

  getRectangles() {
    return [
      { type: 'header', element: this }
    ];
  },

});

joint.shapes.flexberry.uml.UseCaseView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  getUsecaseName: function() {
    return this.model.attributes.objectModel.get('name');
  },

  updateRectangles: function (resizedWidth, resizedHeight) {
    let rects = this.model.getRectangles();
    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    const minWidth = this.model.attributes.minWidth;
    const minHeight = this.model.attributes.minHeight;
    const oldSize = this.model.size();
    rects.forEach(function(rect, index, array) {
      if (this.markup.includes('flexberry-uml-' + rect.type + '-rect') && rect.element.inputElements) {
        let rectHeight = 0;
        let inputs = rect.element.inputElements.find('.' + rect.type + '-input');
        let inputsDiv = inputs[0].parentElement;
        if (! inputsDiv.parentElement || ! inputsDiv.parentElement.className.includes('joint-paper')) {
          let jointPaper = $('.joint-paper')[0];
          jointPaper.appendChild(inputsDiv);
        }
        let $buffer = rect.element.inputElements.find('.input-buffer');
        inputs.each(function() {
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
        if (array.length === index + 1) {
          this.set('inputHeight', newHeight);
          rect.element.attr('.flexberry-uml-' + rect.type + '-rect/height', Math.max((resizedHeight || oldSize.height) - offsetY, minHeight - offsetY, rectHeight));
        } else {
          rect.element.attr('.flexberry-uml-' + rect.type + '-rect/height', rectHeight);
        }

        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/transform', 'translate(0,' + offsetY + ')');

        offsetY += rectHeight;
      }
    }, this.model);

    newWidth += (this.model.get('widthPadding') || 0) * 2;
    this.model.set('inputWidth', newWidth);
    rects.forEach(function(rect) {
      rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', Math.max(newWidth, resizedWidth || oldSize.width, minWidth));
    });

    this.model.resize(Math.max(newWidth, resizedWidth || oldSize.width, minWidth), Math.max(newHeight, resizedHeight || oldSize.height, minHeight));
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }
  }
});
