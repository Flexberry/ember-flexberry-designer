/**
  @module ember-flexberry-designer
*/

import { A } from '@ember/array';
import { isNone } from '@ember/utils';

import { BaseObject } from './fd-uml-baseobject';
import FdUmlElement from './fd-uml-element';

import joint from 'npm:jointjs';

/**
  An object that describes a Decision on an activity UML diagram.

  @class FdUmlDecision
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new Decision(properties);
  },
});

/**
  Defines the JointJS object, which represents a `Decision` object in the UML diagram.

  @for FdUmlDecision
  @class Decision
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let Decision = BaseObject.define('flexberry.uml.Decision', {
  attrs: {
    '.flexberry-uml-header-rombus-path': {
      'stroke': 'black',
      'stroke-width': 1,
      'd': 'M 0 30 L 60 0 120 30 60 60 Z'
    }
  },

  // Minimum height.
  minHeight: 20,

  // Minimum width
  minWidth: 40,
}, {
  markup: [
      '<g class="rotatable">',
      '<path class="flexberry-uml-header-rombus-path"/>',
      '</g>'
  ].join(''),
});

joint.shapes.flexberry.uml.DecisionView = joint.shapes.flexberry.uml.PrimitiveElementView.extend({

  initialize: function () {
    joint.shapes.flexberry.uml.PrimitiveElementView.prototype.initialize.apply(this, arguments);

    const initSize = this.model.size();
    this.updateRectangles(initSize.width, initSize.height);
  },

  updateRectangles(resizedWidth, resizedHeight) {
    let _this = this;
    let rects = this.model.getRectangles();
    let newHeight = 0;
    let newWidth = 0;
    const minWidth = this.model.attributes.minWidth;
    const minHeight = this.model.attributes.minHeight;
    const oldSize = this.model.size();

    newWidth += (this.model.get('widthPadding') || 0) * 2;
    let setWidth = Math.max(newWidth, resizedWidth || oldSize.width, minWidth);
    let setHight = Math.max(newHeight, resizedHeight || oldSize.height, minHeight);

    this.model.resize(setWidth, setHight);
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }

    rects.forEach(function(rect) {
      let points = _this.recalculatePathPoints(setWidth, setHight);
      //set path
      rect.element.attr('.flexberry-uml-header-rombus-path/d', 'M '+ points[0] + ' L ' + points[1] + ' ' + points[2] + ' ' + points[3] + 'Z' );
    }, this.model);
  },

  recalculatePathPoints(setWidth, setHight) {
    //calculating path points
    let points = A();
    points[0] = '0 ' + (setHight/2).toString();
    points[1] = (setWidth/2).toString() + ' 0';
    points[2] = (setWidth).toString() + ' '+ (setHight/2).toString();
    points[3] = (setWidth/2).toString() + ' '+ (setHight).toString();
    return points;
  },

  setColors() {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.setColors.apply(this, arguments);

    const brushColor = this.getBrushColor();
    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.flexberry-uml-header-rombus-path/stroke', textColor);
    }

    if (!isNone(brushColor)) {
      this.model.attr('.flexberry-uml-header-rombus-path/fill', brushColor);
    }
  }
});
