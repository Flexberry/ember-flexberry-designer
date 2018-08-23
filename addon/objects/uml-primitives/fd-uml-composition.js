/**
  @module ember-flexberry-designer
*/

import joint from 'npm:jointjs';

import '../../utils/fd-common-primitives';

import FdUmlLink from './fd-uml-link';

/**
  An object that describes a link of the composition type on the UML diagram.

  @class FdUmlComposition
  @extends FdUmlLink
*/
export default FdUmlLink.extend({
  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices');
    return new Composition(properties);
  },
});

/**
  Defines the JointJS link, which represents a composition in the UML diagram.

  @for FdUmlComposition
  @class Composition
  @extends flexberryUml.BaseLink
  @namespace flexberry.uml
  @constructor
*/
export let Composition = joint.shapes.flexberryUml.BaseLink.define('flexberry.uml.Composition', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' } },
});
