/**
  @module ember-flexberry-designer
*/

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';

/**
  An object that describes a link of the inheritance type on the UML diagram.

  @class FdUmlUseCaseGeneralization
  @extends FdUmlLink
*/
export default FdUmlLink.extend({
  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'repositoryObject', 'source', 'target', 'vertices');
    properties.objectModel = this;
    return new UseCaseGeneralization(properties);
  },
});

/**
  Defines the JointJS link, which represents a generalization in the UML diagram.

  @for FdUmlUseCaseGeneralization
  @class UseCaseGeneralization
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let UseCaseGeneralization = Link.define('flexberry.uml.UseCaseGeneralization', {
  attrs: { '.marker-source': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' } },
});
