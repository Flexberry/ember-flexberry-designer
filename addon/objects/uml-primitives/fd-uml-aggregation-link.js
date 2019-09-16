/**
  @module ember-flexberry-designer
*/
import { isNone } from '@ember/utils';
import joint from 'npm:jointjs';

import FdUmlLink, { LinkWithUnderline } from './fd-uml-link';
import { QualifiedView } from './links-view/fd-qualified-view';

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
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
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
  attrs: {
    '.marker-source': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  },
});

joint.shapes.flexberry.uml.AggregationLinkView = QualifiedView.extend({
  setColors() {
    QualifiedView.prototype.setColors.apply(this, arguments);

    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-source/stroke', textColor);
    }
  }
});
