/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a partition on the UML diagram.

  @class FdUmlPartition
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
    text: {
      'visibility': 'visible'
    },
    '.flexberry-uml-header-text':
    {
      'font-weight': 'bold',
      'ref-y': 0,
      'y-alignment': 'start'
    },
    '.flexberry-uml-header-rect':
    {
      'stroke': 'black',
      'stroke-width': 1,
      'fill': '#ffffff',
      'fill-opacity': 0
    },
  },
  heightPadding: 60
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

  initialize: function () {
    let objectModel = this.get('objectModel');
    this.attributes.attrs['.flexberry-uml-header-rect'].width = objectModel.primitive.DefaultSize.Width;
    this.attributes.attrs['.flexberry-uml-header-rect'].height = objectModel.primitive.DefaultSize.Height
    this.attributes.attrs['.flexberry-uml-header-rect'].x = objectModel.primitive.Location.X;
    this.attributes.attrs['.flexberry-uml-header-rect'].y = objectModel.primitive.Location.Y;
    this.attributes.attrs.text.text = objectModel.primitive.Name.Text;
    BaseObject.prototype.initialize.apply(this, arguments);
    this.on('change', function() {
      this.toBack({ deep: true });
    });
  },

  updateRectangles: function () {
    this.updateRectanglesOld();
  }
});
