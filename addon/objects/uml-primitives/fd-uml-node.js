/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { A, isArray } from '@ember/array';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

import joint from 'npm:jointjs';

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
    markup: [
      '<g class="rotatable">',
      '<path class="back-path"/>',
      '<rect class="flexberry-uml-header-rect"/>',
      '<text class="flexberry-uml-header-text"/>',
      '</g>'
    ].join('')
});


joint.shapes.flexberry.uml.UmlNodeView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea type="text" class="active-object-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
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
        let inputs = rect.element.inputElements.find('.' + rect.type + '-input');
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

    this.model.resize(newWidth, newHeight);
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }
    
    rects.forEach((rect) => {
      let points = this.recalculatePathPoints(newWidth, newHeight);
      //set path
      rect.element.attr('.back-path/d', 'M '+ points[0] + ' L ' + points[1] + ' ' + points[2] + ' ' + points[3] + ' ' + points[4] + 'M '+ points[5] + ' L ' + points[6]  );
    });
  },

  recalculatePathPoints(newWidth, newHeight) {
      //calculating path points
      let points = A();
      points[0] = '0 0';
      points[1] = '5 -5';
      points[2] = (newWidth + 5).toString() + ' -5';
      points[3] = (newWidth + 5).toString() + ' ' + (newHeight - 5 ).toString();
      points[4] = newWidth.toString() + ' ' + newHeight.toString();
      points[5] = newWidth.toString() + ' 0';
      points[6] = (newWidth + 5).toString() + ' -5';
      return points;
  }
});
