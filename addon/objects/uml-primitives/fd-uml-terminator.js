/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { A, isArray } from '@ember/array';
import { isNone } from '@ember/utils';

import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a Terminator on the UML sequence diagram.

  @class FdUmlTerminator
  @extends FdUmlElement
*/
export default FdUmlElement.extend({
  /**
    Text to show.

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
    const properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    properties.maxWidth = 20;

    return new Terminator(properties);
  },
});

/**
  Defines the JointJS element, which represents the Terminator in the UML diagram.

  @for FdUmlTerminator
  @class Terminator
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let Terminator = BaseObject.define('flexberry.uml.sequencediagramTerminator', {
  attrs: {
    '.flexberry-uml-header-cross': { 'stroke-width':2, d: 'M0,0 20,20 M0,20 20,0z' }
  }
}, {
  markup: [
    '<g class="flexberry-uml-header-rect">',
    '<path class="flexberry-uml-header-cross"/>',
    '<rect x="0" y="0" width="20" height="20" fill="transparent" stroke="transparent"/>',
    '</g>'
  ].join(''),

  // Minimum height.
  minHeight: 20,

  // Minimum width.
  minWidth: 20,
  
  getRectangles() {
    return [];
  },

  setParent: function (parentObject) {
    this.set('parentObject', parentObject);
    let objectModel = this.get('objectModel');

    objectModel.set('parentPrimitive', { id: parentObject.id });
    this.calculatePosition(null, null);

    this.on('change:position', function() {
      this.calculatePosition(null, null);
    });

    parentObject.on('change:position', this.onParentPositionChange, this);
    parentObject.on('change:size', this.onParentSizeChange, this);
  },

  onParentPositionChange(element, newPosition) {
    this.calculatePosition(newPosition, null);
  },

  onParentSizeChange(element, newSize) {
    this.calculatePosition(null, newSize);
  },

  calculatePosition: function (position, size) {
    const parentObject = this.get('parentObject');
    const width = this.get('maxWidth');

    position = position || parentObject.get('position');
    size = size || parentObject.get('size');

    this.set('position', { 
      x: position.x + size.width / 2 - width / 2, 
      y: position.y + size.height,
    });
  },

  unsubscribeParentChanges: function () {
    this.get('parentObject').off('change:position', this.onParentPositionChange, this);
    this.get('parentObject').off('change:size', this.onParentSizeChange, this);
  }
});

joint.shapes.flexberry.uml.sequencediagramTerminatorView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input terminator-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function () {
    const objectModel = this.model.get('objectModel');
    const parentPrimitiveId = objectModel.parentPrimitive.id;
    const parentPrimitive = this.options.model.graph.getCell(parentPrimitiveId);

    if (!isNone(parentPrimitive)) {
      this.model.setParent(parentPrimitive);
    }

    joint.shapes.flexberry.uml.BaseObjectView.prototype.initialize.apply(this, arguments);
    
    this.options.model.graph.on('remove', this.checkParentExist, this);
  },

  getSizeChangers() {
    return A();
  },

  updateRectangles: function () {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.updateRectangles.apply(this, arguments);
  },

  checkParentExist(element) {
    const objectModel = this.model.get('objectModel');
    const parentPrimitiveId = objectModel.get('parentPrimitive.id');
    const deletedElementId = element.get('id');

    if (parentPrimitiveId === deletedElementId) {
      this.model.remove();
    }
  },

  removeBox: function () {
    this.options.model.graph.off('remove', this.checkParentExist, this);
    this.model.unsubscribeParentChanges();

    this.$box.remove();
  },
});
