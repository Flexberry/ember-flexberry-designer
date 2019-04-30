/**
  @module ember-flexberry-designer
*/

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';

/**
  An object that describes a link of the Realization type on the UML diagram.

  @class FdUmlRealization
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices');
    properties.objectModel = this;
    return new Realization(properties);
  },
});

/**
  Defines the JointJS link, which represents a Realization in the UML diagram.

  @for FdUmlRealization
  @class Realization
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let Realization = Link.define('flexberry.uml.Realization', {
  attrs: {
    '.marker-target': { d: 'M 0 0 z' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
  },
});
