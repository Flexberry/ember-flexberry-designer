/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a Multiobject on the UML diagram.

  @class FdUmlMultiObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    return new MultiObject(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'MoreClasses' object in the UML diagram.

  @for FdUmlMoreClasses
  @class MultiObject
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let MultiObject = BaseObject.define('flexberry.uml.MultiObject', {
  attrs: {
    '.back-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff', 'fill-opacity': 0, 'mask': 'url(#custom-mask)' },
    '.view-rect': { 'x': -1, 'y': -1, 'fill': 'white' },
    '.not-view-rect': { 'x': -3, 'y': -6, 'fill': 'black' }
  }
}, {
  updateRectangles: function () {
    BaseObject.prototype.updateRectangles.apply(this, arguments);

    let attrs = this.get('attrs');
    let backRectTransY = 6;
    attrs['.back-rect'].transform = 'translate(3, ' + backRectTransY + ')';
    attrs['.back-rect'].height = this.size().height;
    attrs['.back-rect'].width = this.size().width;

    attrs['.view-rect'].height = this.size().height + 2;
    attrs['.view-rect'].width = this.size().width + 2;

    attrs['.not-view-rect'].height = this.size().height;
    attrs['.not-view-rect'].width = this.size().width;

    let newWidth = this.size().width;
    let newHeight = this.size().height + backRectTransY;
    this.resize(newWidth, newHeight);
  },

  markup: [
    '<g class="rotatable">',
    '<defs>',
    '<mask id="custom-mask">',
    '<rect class="view-rect"/>',
    '<rect class="not-view-rect"/>',
    '</mask>',
    '</defs>',
    '<rect class="back-rect"/><rect class="flexberry-uml-header-rect"/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberry.uml.MultiObjectView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="instance-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  render: function() {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.render.apply(this, arguments);

    let mask = document.getElementById('custom-mask');
    let viewMaskId = Ember.$(mask).children('.view-rect').attr('id');
    let maskId = 'mask_mo_' + viewMaskId;
    mask.setAttribute('id', maskId);
    let attrs = this.model.get('attrs');
    attrs['.back-rect'].mask = 'url(#' + maskId + ')';
    this.model.updateRectangles();

    return this;
  },
});
