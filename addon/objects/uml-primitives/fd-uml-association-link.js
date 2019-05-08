/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink, { LinkWithUnderline } from './fd-uml-link';
import { EmptyView } from './links-view/fd-empty-view';

/**
  An object that describes an association link on the UML diagram.

  @class FdUmlAssociationLink
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
    return new AssociationLink(properties);
  },
});

/**
  Defines the JointJS link, which represents an association link in the UML diagram.

  @for FdUmlAssociationLink
  @class AssociationLink
  @extends flexberry.uml.LinkWithUnderline
  @namespace flexberry.uml
  @constructor
*/
export let AssociationLink = LinkWithUnderline.define('flexberry.uml.AssociationLink', {});

joint.shapes.flexberry.uml.AssociationLinkView = EmptyView;
