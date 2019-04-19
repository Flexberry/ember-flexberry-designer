/**
  @module ember-flexberry-designer
*/

import FdUmlLink, { LinkWithUnderline } from './fd-uml-link';

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
    let ret = new LinkInheritance(properties);
    ret.toolMarkup = "<g/>";
    ret.arrowheadMarkup  = "<g/>";
    return ret;
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
export let LinkInheritance = LinkWithUnderline.define('flexberry.uml.LinkInheritance', {
  attrs: { },
});
