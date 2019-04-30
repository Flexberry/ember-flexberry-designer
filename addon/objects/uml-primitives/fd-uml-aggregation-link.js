/**
  @module ember-flexberry-designer
*/

import FdUmlLink, { LinkWithUnderline } from './fd-uml-link';

/**
  An object that describes an aggregation link on the UML diagram.

  @class FdUmlAggregationLink
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices');
    properties.objectModel = this;
    return new AggregationLink(properties);
  },
});

/**
  Defines the JointJS link, which represents a association in the UML diagram.

  @for FdUmlAssociationLink
  @class AggregationLink
  @extends flexberry.uml.LinkWithUnderline
  @namespace flexberry.uml
  @constructor
*/
export let AggregationLink = LinkWithUnderline.define('flexberry.uml.AggregationLink', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' } },
});
