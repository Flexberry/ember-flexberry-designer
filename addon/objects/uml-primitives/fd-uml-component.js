/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { BaseObject } from './fd-uml-baseobject';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes an Component element on the UML diagram.

  @class FdUmlComponent
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the Component.

    @property name
    @type String
  */
  name: computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    return new Component(properties);
  },
});

/**
  Defines the JointJS object, which represents an Component in the UML diagram.

  @for FdUmlComponent
  @class Component
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let Component = BaseObject.define('flexberry.uml.Component', {
  attrs: {
    'text': { 'font-weight': 'bold', 'visibility': 'visible' },
    '.firstRect': { 'y-alignment': 'middle', 'ref-y': 0.5, 'fill': 'white', 'stroke': 'black', 'stroke-width': 1 },
    '.secondRect': { 'y-alignment': 'middle', 'ref-y': 0.5, 'fill': 'white', 'stroke': 'black', 'stroke-width': 1 }
  },
  heightPadding: 20
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '<rect class="firstRect" width="10" height="5"/>',
    '<rect class="secondRect" width="10" height="5"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    this.updateRectanglesOld();

    let attrs = this.get('attrs');
    attrs['.firstRect'].transform = 'translate(-5, -8)';
    attrs['.secondRect'].transform = 'translate(-5, 8)';
  }
});
