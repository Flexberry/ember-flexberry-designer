/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import $ from 'jquery';
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

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
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
    '.not-view-rect': { 'x': -3, 'y': -4, 'fill': 'black' }
  },

  // Minimum height.
  minHeight: 20,
}, {
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
  ].join(''),

  getRectangles() {
    return [
      { type: 'header', element: this },
    ];
  },
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
    let viewMaskId = $(mask).children('.view-rect').attr('id');
    let maskId = 'mask_mo_' + viewMaskId;
    mask.setAttribute('id', maskId);
    this.model.attr('.back-rect/mask', 'url(#' + maskId + ')');
    this.updateRectangles();
    this.update();

    return this;
  },

  updateRectangles: function () {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.updateRectangles.apply(this, arguments);

    const size = this.model.size();

    this.model.attr('.back-rect/transform', 'translate(4, 4)');
    this.model.attr('.back-rect/height', size.height);
    this.model.attr('.back-rect/width', size.width);

    this.model.attr('.view-rect/height', size.height + 2);
    this.model.attr('.view-rect/width', size.width + 2);

    this.model.attr('.not-view-rect/height', size.height);
    this.model.attr('.not-view-rect/width', size.width);

    this.update();
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }
  },
});
