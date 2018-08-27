/**
  @module ember-flexberry-designer
*/

  import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a class on the UML diagram.

  @class FdUmlMoreClasses
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'position');

    return new MoreClasses(properties);

  },
});

/**
  Defines the JointJS element, which represents the UML class in collapsed state.

  @for FdUmlClass
  @class MoreClasses
  @extends flexberry.uml.MoreClasses
  @namespace flexberry.uml
  @constructor
*/
export let MoreClasses = joint.shapes.basic.Generic.define('flexberry.uml.MoreClasses', {
  size: { width: 50, height: 10 },
  attrs: {
    circle: { fill: 'black', r:'10' },
  },
}, {
  markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<circle/><circle transform="translate(40,0)"/><circle transform="translate(80,0)"/>',
      '</g>',
      '</g>'
  ].join(''),
});

