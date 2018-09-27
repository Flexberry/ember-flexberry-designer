/**
  @module ember-flexberry-designer
*/

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';

/**
  An object that describes a link of the Directed Association type on the UML diagram.

  @class FdUmlGeneralization
  @extends FdUmlLink
*/
export default FdUmlLink.extend({
  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'repositoryObject', 'source', 'target', 'vertices', 'labels');
    return new DirectedAssociation(properties);
  },
});

/**
  Defines the JointJS link, which represents a Directed Association in the UML diagram.

  @for FdUmlDirectedAssociation
  @class DirectedAssociation
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let DirectedAssociation = Link.define('flexberry.uml.UseCaseGeneralization', {
  attrs: { '.marker-source': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'black' } },
});
