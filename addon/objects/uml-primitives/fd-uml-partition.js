/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

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
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
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
      'fill-opacity': '0.0'
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
    BaseObject.prototype.initialize.apply(this, arguments);
    this.on('change', function() {
      this.toBack({ deep: true });
    });
  },
});
