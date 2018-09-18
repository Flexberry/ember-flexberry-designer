/**
  @module ember-flexberry-designer
*/

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';

/**
  An object that describes an association link on the UML diagram.

  @class FdUmlAssociation
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'repositoryObject', 'source', 'target', 'vertices', 'labels');
    return new Association(properties);
  },
});

/**
  Defines the JointJS link, which represents an association in the UML diagram.

  @for FdUmlAssociation
  @class Association
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let Association = Link.define('flexberry.uml.Association', {});
