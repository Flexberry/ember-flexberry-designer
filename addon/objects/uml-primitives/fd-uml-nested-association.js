/**
  @module ember-flexberry-designer
*/

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
/**
  An object that describes a link of the association type on the UML diagram.

  @class FdUmlNestedAssociation
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    return new NestedClassAssociation(properties);
  },
});

/**
  Defines the JointJS link, which represents a NestedClassAssociation in the UML diagram.

  @for FdUmlNestedClassAssociation
  @class NestedClassAssociation
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let NestedClassAssociation = Link.define('flexberry.uml.NestedClassAssociation', {
  attrs: { '.marker-target': { d: 'M 10, 10 ' +
                'm -8, 0 ' +
                'a 8,8 0 1,0 16,0 ' +
                'a 8,8 0 1,0 -16,0 M 10 2 L 10 2 L 10 18', fill: 'transparent' } }
});
