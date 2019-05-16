/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { MultiplicityView } from './links-view/fd-multiplicity-view';

/**
  An object that describes an aggregation link on the UML diagram.

  @class FdUmlLinkInheritance
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
    return new LinkInheritance(properties);
  }
});

/**
  Defines the JointJS link, which represents a association in the UML diagram.

  @for FdUmlAssociationLink
  @class AggregationLink
  @extends flexberry.uml.LinkWithUnderline
  @namespace flexberry.uml
  @constructor
*/
export let LinkInheritance = Link.define('flexberry.uml.LinkInheritance', {
  attrs: {
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  }
});

joint.shapes.flexberry.uml.LinkInheritanceView = MultiplicityView;
