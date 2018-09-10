/**
  @module ember-flexberry-designer
*/

import FdUmlLink, { BaseLinkWithUnderline } from './fd-uml-baselink';

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
    return new AssociationLink(properties);
  },
});

/**
  Defines the JointJS link, which represents an association link in the UML diagram.

  @for FdUmlAssociationLink
  @class AssociationLink
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let AssociationLink = BaseLinkWithUnderline.define('flexberry.uml.Association', {});
