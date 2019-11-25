/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlBaseLink from './fd-uml-link';
import { Dependency } from './fd-uml-dependency';
import { NormalizedDescriptionView } from './links-view/fd-normalized-description-view';

/**
  An object that defines ObjectFlow on the UML diagram.

  @class FdUmlLink
  @extends FdUmlBaseLink
*/
export default FdUmlBaseLink.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    return new ObjectFlow(properties);
  }
});

/**
  Defines the JointJS link, which represents an ObjectFlow in the UML diagram.

  @for FdUmlObjectFlow
  @class ObjectFlow
  @extends Dependency
  @namespace flexberry.uml
  @constructor
*/
export let ObjectFlow = Dependency.define('flexberry.uml.ObjectFlow', {
  attrs: {
    rect: { 'visibility': 'visible' },
  }
}, {
  initialize: function () {
    Dependency.prototype.initialize.apply(this, arguments);
  },
});

joint.shapes.flexberry.uml.ObjectFlowView = NormalizedDescriptionView.extend();
