/**
  @module ember-flexberry-designer
*/

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import joint from 'npm:jointjs';

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
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels', 'startPoint', 'endPoint');
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
      default:
        console.log('ERROR - choose correct label name');
    }
  },
});

joint.shapes.flexberry.uml.AggregationView = joint.shapes.flexberry.uml.AssociationView.extend({});
