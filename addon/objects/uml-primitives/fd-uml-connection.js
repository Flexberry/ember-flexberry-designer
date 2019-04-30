/**
  @module ember-flexberry-designer
*/
import FdUmlBaseLink from './fd-uml-link';
import { Dependency } from './fd-uml-dependency';

/**
  An object that defines Connection link on the UML diagram.

  @class FdUmlConnection
  @extends FdUmlBaseLink
*/
export default FdUmlBaseLink.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'source', 'target', 'vertices');
    properties.objectModel = this;
    return new Connection(properties);
  }
});

/**
  Defines the JointJS link, which represents a Connection in the UML diagram.

  @for FdUmlConnection
  @class FdUmlConnection
  @extends Dependency
  @namespace flexberry.uml
  @constructor
*/
export let Connection = Dependency.define('flexberry.uml.Connection', {
  attrs: { '.connection': { 'stroke-dasharray': 0 } }
});
