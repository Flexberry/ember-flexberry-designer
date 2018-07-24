/**
  @module ember-flexberry-designer
*/

import joint from 'npm:jointjs';

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
    return new joint.shapes.flexberryUml.Composition(properties);
  },
});
