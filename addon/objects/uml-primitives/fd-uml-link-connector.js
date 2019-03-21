/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes an object on the UML diagram.

  @class FdUmlObject
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
    return new LinkConnector(properties);
  },
});

/**
  Defines the JointJS object, which represents a LinkConnector.

  @for FdUmlLinkConnector
  @class LinkConnector
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let LinkConnector = joint.shapes.basic.Generic.define('flexberry.uml.LinkConnector', {
  attrs: {
    '.flexberry-uml-link-connector-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#000000', 'fill-opacity': 1 },

  },
  name: [],
  heightPadding: 10,

  // Inputs padding by X.
  widthPadding: 7,

  // Inputs bottom padding by Y.
  heightBottomPadding: 4,
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-link-connector-rect"/>',
    '</g>',
    '</g>'
  ].join(''),

  initialize: function () {

    this.on('change:name change:attributes', function () {
      this.trigger('uml-update');
    }, this);

    let attrs = this.get('attrs');
    attrs['.flexberry-uml-link-connector-rect'].height = this.attributes.size.height;
    attrs['.flexberry-uml-link-connector-rect'].width =  this.attributes.size.width;
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getObjName: function () {
    return this.get('name');
  },

});

