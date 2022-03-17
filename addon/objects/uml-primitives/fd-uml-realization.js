/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';
import { isNone } from '@ember/utils';

import FdUmlLink, { Link } from './fd-uml-link';
import { DescriptionView } from './links-view/fd-description-view';

/**
  An object that describes a link of the Realization type on the UML diagram.

  @class FdUmlRealization
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
    return new Realization(properties);
  },
});

/**
  Defines the JointJS link, which represents a Realization in the UML diagram.

  @for FdUmlRealization
  @class Realization
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let Realization = Link.define('flexberry.uml.Realization', {
  attrs: {
    '.marker-source': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' }
  },
  text: { visibility: 'hidden' },
  rect: { visibility: 'hidden' }
});

joint.shapes.flexberry.uml.RealizationView = DescriptionView.extend({
  setColors() {
    DescriptionView.prototype.setColors.apply(this, arguments);

    const textColor = this.getTextColor();
    const brushColor = this.getBrushColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-source/stroke', textColor);
    }

    if (!isNone(brushColor)) {
      this.model.attr('.marker-source/fill', brushColor);
    }
  }
});
