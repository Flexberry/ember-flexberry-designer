/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';
import { isNone } from '@ember/utils';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { MultiplicityView } from './links-view/fd-multiplicity-view';

/**
  An object that describes an aggregation link on the UML diagram.

  @class FdUmlAggregation
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
    return new Aggregation(properties);
  },
});

/**
  Defines the JointJS link, which represents a association in the UML diagram.

  @for FdUmlAssociation
  @class Aggregation
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let Aggregation = Link.define('flexberry.uml.Aggregation', {
  attrs: {
    '.marker-source': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  }
}, {
  getLabelDistance: function (labelName, isVertical) {
    switch (labelName) {
      case 'startMultiplicity':
      case 'startRole':
        return 30;
      case 'endMultiplicity':
      case 'endRole':
        return isVertical ? -10 : -5;
      case 'description':
        return 0.5;
    }
  },
});

joint.shapes.flexberry.uml.AggregationView = MultiplicityView.extend({
  setColors() {
    MultiplicityView.prototype.setColors.apply(this, arguments);

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
