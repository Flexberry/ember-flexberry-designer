/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a Sequence Object element on the UML diagram.

  @class FdUmlInScope
  @extends FdUmlElement
*/
export default FdUmlElement.extend({
  /**
    The name of the InScope.

    @property name
    @type String
  */
  name: computed.alias('primitive.Name.Text'),

  /**
    Parent primitive ID.

    @property source
    @type Object
  */
  parentPrimitive: computed('primitive.ConnectedPrimitive.$ref', {
    get() {
      let ret = { id: this.get('primitive.ConnectedPrimitive.$ref') };
      return ret;
    },
    set(key, value) {
      this.set('primitive.ConnectedPrimitive.$ref', value.id);
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
    
    return new InScope(properties);
  },
});

/**
  Defines the JointJS object, which represents a Sequence Object in the UML diagram.

  @for FdUmlInScope
  @class InScope
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let InScope = BaseObject.define('flexberry.uml.InScope', {
  // Minimum width.
  minWidth: 13,

  // Minimum height.
  minHeight: 36,

  ghostMoveBorder: A(),

  attrs: {
    '.flexberry-uml-header-rect': {
      'stroke': 'black',
      'stroke-width': 1,
      'fill': '#ffffff',
      'fill-opacity': 0,
    },
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<g class="flexberry-uml-header-rect">',
    '<rect width="13" height="36" />',
    '</g>',
    '</g>',
    '</g>'
  ].join(''),

  setParent: function (parentObject) {
    this.set('parentObject', parentObject);
    let objectModel = this.get('objectModel');
    objectModel.set('parentPrimitive', { id: parentObject.id });

    const shiftToCenterX = parentObject.get('position').x + (parentObject.get('size').width - this.get('size').width) / 2;
    this.set('position', { 
      x: shiftToCenterX, 
      y: this.get('position').y
    });

    this.set('size', { width: this.get('size').width, height: this.get('size').height });

    let positionShiftY = this.get('position').y - parentObject.get('position').y;
    this.set('positionShiftY', positionShiftY);

    this.set('ghostMoveBorder', this.calculateGhostMoveBorder(parentObject, shiftToCenterX))

    this.on('change:position', function(element, newPosition) {
      positionShiftY = newPosition.y - parentObject.get('position').y;
      this.set('positionShiftY', positionShiftY);
    });

    parentObject.on('change:position', this.onParentPositionChange, this);
    parentObject.on('change:size', this.onParentSizeChange, this);
  },

  onParentPositionChange(element, newPosition) {
    const shiftToCenterX = newPosition.x + (element.get('size').width - this.get('size').width) / 2;
    this.set('position', { x: shiftToCenterX, y: newPosition.y + this.get('positionShiftY')});
    this.set('ghostMoveBorder', this.calculateGhostMoveBorder(element, shiftToCenterX));
  },

  onParentSizeChange(element, newSize) {
    const shiftToCenterX = element.get('position').x + (newSize.width - this.get('size').width) / 2;
    let positionY = element.get('position').y + this.get('positionShiftY');

    if (positionY + this.get('size').height > element.get('position').y + newSize.height) {
      positionY = element.get('position').y + newSize.height - this.get('size').height;
    }

    this.set('position', { x: shiftToCenterX, y: positionY});
    this.set('ghostMoveBorder', this.calculateGhostMoveBorder(element, shiftToCenterX));
  },

  calculateGhostMoveBorder: function (parentObject, shiftToCenterX) {
    const ghostMoveBorder = [
      shiftToCenterX, 
      shiftToCenterX, 
      parentObject.get('position').y, 
      parentObject.get('position').y + parentObject.get('size').height - this.get('size').height
    ];

    return ghostMoveBorder;
  }
});

joint.shapes.flexberry.uml.InScopeView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: ['<div></div>'].join(''),

  initialize: function () {
    const objectModel = this.model.get('objectModel');
    const parentPrimitiveId = objectModel.parentPrimitive.id;
    const parentPrimitive = this.options.model.graph.getCell(parentPrimitiveId);

    if (!isNone(parentPrimitive)) {
      this.model.setParent(parentPrimitive);
    }

    this.model.on('change', this.updateBox, this);
    joint.shapes.flexberry.uml.BaseObjectView.prototype.initialize.apply(this, arguments);
    
    this.options.model.graph.on('remove', this.checkParentExist, this);
  },

  getSizeChangers() {
    if (this.paper) {
      let readonly = this.paper.options.interactive;
      if (!readonly && typeof readonly !== 'object') {
        return A();
      }
    }
    
    return A([{
      name: 'down-size-button',
      text: '&#xf0d7',
      attrs: {
        'element': { 'ref-x': 0.5, 'ref-dy': 0, 'ref': '.joint-highlight-stroke' },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
        'text': { fill: '#ffffff','font-size': 10, 'text-anchor': 'middle', x: 0, y: 3.5, 'font-family': 'Icons' },
      }
    }]);
  },

  updateRectangles: function (_, resizedHeight) {
    const minWidth = this.model.attributes.minWidth;
    const minHeight = this.model.attributes.minHeight;
    const oldBBox = this.model.getBBox();
    
    const newHeight = Math.max( resizedHeight || oldBBox.height, minHeight);

    this.model.resize(minWidth, newHeight);
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }
  },

  checkParentExist(element) {
    const objectModel = this.model.get('objectModel');
    const parentPrimitiveId = objectModel.get('parentPrimitive.id');
    const deletedElementId = element.get('id');

    if (parentPrimitiveId === deletedElementId) {
      this.model.remove();
    }
  },
});
