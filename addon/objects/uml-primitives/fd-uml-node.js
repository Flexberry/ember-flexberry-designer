/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';
import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a Node on the UML diagram.

  @class FdUmlNode
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the BaseNode, actually its content.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position', 'name');
    return new BaseNode(properties);
  },
});

/**
  Defines the JointJS element, which represents the Node in the UML diagram.

  @for FdUmlNode
  @class BaseNode
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let BaseNode = BaseObject.define('flexberry.uml.BaseNode', {
  attrs: {
    'text': { 'font-weight': 'bold' },
    '.back-path': { 'd': 'M 0 5 L 5 0 100 0 100 45 95 50 M 95 5 L 100 0', 'fill': 'white', 'stroke': 'black', 'stroke-width': 1 }
  },
  heightPadding: 20
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<path class="back-path"/><rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    joint.shapes.flexberry.uml.BaseObject.prototype.updateRectangles.apply(this, arguments);

    let attrs = this.get('attrs');
    let offset = 5;
    attrs['.back-path'].transform = `translate(0, ${-offset})`;

    let rectWidth = this.size().width;
    let rectHeight = this.size().height;
    let backPathWidth = rectWidth + offset;
    let backPathHeight = rectHeight + offset;
    let backPathLine1 = `L ${offset} 0 ${backPathWidth} 0`;
    let backPathLine2 = `L ${backPathWidth} ${rectHeight} ${rectWidth} ${backPathHeight}`;
    let backPathMove = `M ${rectWidth} ${offset} L ${backPathWidth} 0`;

    attrs['.back-path'].d = `M 0 ${offset} ${backPathLine1} ${backPathLine2} ${backPathMove}`;

    let newWidth = this.size().width + offset;
    let newHeight = this.size().height + offset;
    this.resize(newWidth, newHeight);
  },
});
