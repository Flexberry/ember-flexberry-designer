/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { EmptyView } from './links-view/fd-empty-view';

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
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    return new UnDirectedAssociation(properties);
  },
});

/**
  Defines the JointJS link, which represents a Directed Association in the UML diagram.

  @for FdUmlDirectedAssociation
  @class UnDirectedAssociation
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let UnDirectedAssociation = Link.define('flexberry.uml.UseCaseGeneralization', {
});

joint.shapes.flexberry.uml.UnDirectedAssociationView = EmptyView;
