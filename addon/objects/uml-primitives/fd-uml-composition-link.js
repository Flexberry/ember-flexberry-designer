/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink, { LinkWithUnderline } from './fd-uml-link';
import { EmptyView } from './links-view/fd-empty-view';

/**
  An object that describes a link of the composition type on the UML diagram.

  @class FdUmlCompositionLink
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
    return new CompositionLink(properties);
  },
});

/**
  Defines the JointJS link, which represents a composition link in the UML diagram.

  @for FdUmlCompositionLink
  @class CompositionLink
  @extends flexberry.uml.LinkWithUnderline
  @namespace flexberry.uml
  @constructor
*/
export let CompositionLink = LinkWithUnderline.define('flexberry.uml.CompositionLink', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' } },
});

joint.shapes.flexberry.uml.CompositionLinkView = EmptyView;
