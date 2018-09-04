/**
  @module ember-flexberry-designer
*/

import FdUmlBaseLink from './fd-uml-baselink';
import { Dependency } from './fd-uml-dependency';

/**
  An object that defines any link on the UML diagram.

  @class FdUmlLink
  @extends FdUmlBaseLink
*/
export default FdUmlBaseLink.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'source', 'target', 'vertices', 'labels');
    return new Transition(properties);
  }
});

/**
  Defines the JointJS link, which represents a Dependency in the UML diagram.

  @for FdUmlLink
  @class Link
  @extends dia.Link
  @namespace flexberry.uml
  @constructor
*/
export let Transition = Dependency.define('flexberry.uml.Transition', {
  attrs: { '.connection': { 'stroke-dasharray': 0 } }
});
