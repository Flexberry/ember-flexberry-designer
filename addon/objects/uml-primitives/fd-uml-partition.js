/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';
import joint from 'npm:jointjs';

/**
  An object that describes a partition on the UML diagram.

  @class FdUmlPartition
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the partition.

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
    return new Partition(properties);
  },
});

/**
  Defines the JointJS element, which represents the UML Partition.

  @for FdUmlPartition
  @class Partition
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let Partition = BaseObject.define('flexberry.uml.Partition', {
  attrs: {
    '.flexberry-uml-header-rect':
    {
      'stroke': 'black',
      'stroke-width': 1,
      'fill': '#ffffff',
      'fill-opacity': 0
    },
  },

  // Minimum height.
  minHeight: 17,

  heightPadding: 60
}, {
  markup: [
    '<g class="rotatable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>',
  ].join(''),

  initialize: function () {
    BaseObject.prototype.initialize.apply(this, arguments);
    this.on('change', function() {
      this.toBack({ deep: true });
    });
  },

  getRectangles() {
    return [
      { type: 'header', element: this }
    ];
  },
});

joint.shapes.flexberry.uml.PartitionView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});

joint.shapes.flexberry.uml.PartitionView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join('')
});

