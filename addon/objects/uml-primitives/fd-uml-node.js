/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { A, isArray } from '@ember/array';
import { isNone } from '@ember/utils';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

import joint from 'npm:jointjs';
import $ from 'jquery';

/**
  An object that describes a Node on the UML diagram.

  @class FdUmlNode
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the Node, actually its content.

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
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new UmlNode(properties);
  },
});

/**
  Defines the JointJS element, which represents the Node in the UML diagram.

  @for FdUmlNode
  @class UmlNode
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let UmlNode = BaseObject.define('flexberry.uml.UmlNode', {
  attrs: {
    '.back-path': { 'd': 'M 0 0 L 5 -5 70 -5 70 12 65 17 M 65 0 L 70 -5', 'fill': 'white', 'stroke': 'black', 'stroke-width': 1 }
  },

  // Minimum height.
  minHeight: 30,

  // Minimum width
  minWidth: 80,
}, {

  markup: [{
    tagName: 'g',
    className: 'rotatable',
    children: [{
        tagName: 'path',
        className: 'back-path'
    }, {
        tagName: 'rect',
        className: 'flexberry-uml-header-rect'
    }, {
      tagName: 'text',
      className: 'flexberry-uml-header-text'
    }]
  }],

  getRectangles() {
    return [
      { type: 'header', element: this }
    ];
  },
});


joint.shapes.flexberry.uml.UmlNodeView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea type="text" class="active-object-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  updateRectangles(resizedWidth, resizedHeight) {
    let _this = this;
    let rects = this.model.getRectangles();
    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    const minWidth = this.model.attributes.minWidth;
    const minHeight = this.model.attributes.minHeight;
    const oldSize = this.model.size();
    rects.forEach(function(rect, index, array) {
      this.markup[0].children.forEach((child) => {
        if ((child.className == 'flexberry-uml-' + rect.type + '-rect') && (rect.element.inputElements)) {
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
      });
    }, this.model);

    newWidth += (this.model.get('widthPadding') || 0) * 2;
    let setWidth = Math.max(newWidth, resizedWidth || oldSize.width, minWidth);
    let setHight = Math.max(newHeight, resizedHeight || oldSize.height, minHeight);

    this.model.set('inputWidth', newWidth);
    rects.forEach(function(rect) {
      rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', setWidth);
    });

    this.model.resize(setWidth, setHight);

    rects.forEach(function(rect) {
      let points = _this.recalculatePathPoints(setWidth, setHight);
      //set path
      rect.element.attr('.back-path/d', 'M '+ points[0] + ' L ' + points[1] + ' ' + points[2] + ' ' + points[3] + ' ' + points[4] + 'M '+ points[5] + ' L ' + points[6]  );
    }, this.model);

    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }
  },

  recalculatePathPoints(setWidth, setHight) {
      //calculating path points
      let points = A();
      points[0] = '0 0';
      points[1] = '5 -5';
      points[2] = (setWidth + 5).toString() + ' -5';
      points[3] = (setWidth + 5).toString() + ' ' + (setHight - 5 ).toString();
      points[4] = setWidth.toString() + ' ' + setHight.toString();
      points[5] = setWidth.toString() + ' 0';
      points[6] = (setWidth + 5).toString() + ' -5';
      return points;
  },

  setColors() {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.setColors.apply(this, arguments);

    const brushColor = this.getBrushColor();
    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.back-path/stroke', textColor);
    }

    if (!isNone(brushColor)) {
      this.model.attr('.back-path/fill', brushColor);
    }
  }
});
