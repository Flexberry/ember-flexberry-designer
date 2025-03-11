/**
  @module ember-flexberry-designer
*/

import { A } from '@ember/array';

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
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    const properties = this.getProperties('id', 'position');
    properties.objectModel = this;

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
  size: { width: 40, height: 40 },
  attrs: {
    '.flexberry-uml-header-cross': { 'stroke-width':2, d: 'M0,0 40,40 M0,40 40,0z' }
  }
}, {
  markup: [
    '<g class="scalable">',
    '<g class="flexberry-uml-header-rect">',
    '<path class="flexberry-uml-header-cross"/>',
    '<rect x="0" y="0" width="40" height="40" fill="transparent" stroke="transparent"/>',
    '</g>',
    '</g>'
  ].join(''),

  // Minimum height.
  minHeight: 40,

  // Minimum width
  minWidth: 40,
  
  getRectangles() {
    return [];
  },
});

joint.util.setByPath(joint.shapes, 'flexberry.uml.sequencediagramTerminator', Terminator, '.');

joint.shapes.flexberry.uml.TerminatorView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input terminator-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  getSizeChangers() {
    return A();
  },
});