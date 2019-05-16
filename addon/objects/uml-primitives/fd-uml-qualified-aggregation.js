/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';

import joint from 'npm:jointjs';
import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { QualifiedView } from './links-view/fd-qualified-view';

/**
  An object that describes a link of the `Qualified aggregation` type on the UML diagram.

  @class FdUmlQualifiedAggregation
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    End role text.

    @property endRoleTxt
    @type String
  */
  endRoleTxt: computed.alias('primitive.RightText.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: computed.alias('primitive.LeftText.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels', 'startPoint', 'endPoint');
    return new QualifiedAggregation(properties);
  },
});

/**
  Defines the JointJS link, which represents a Qualified aggregation in the UML diagram.

  @for FdUmlQualifiedAggregation
  @class QualifiedAggregation
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let QualifiedAggregation = Link.define('flexberry.uml.QualifiedAggregation', {
  attrs: {
    '.marker-source': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'white' },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  }
}, {
  getLabelDistance: function (labelName, isVertical) {
    switch (labelName) {
      case 'qualified':
        return isVertical ? 10 : 5;
      case 'startRole':
        return 55;
      case 'endRole':
        return isVertical ? -10 : -5;
      case 'description':
        return 0.5;
      default:
        // eslint-disable-next-line no-console
        console.log('ERROR - choose correct label name');
    }
  }
});

joint.shapes.flexberry.uml.QualifiedAggregationView = QualifiedView.extend({
  template: [
    '<div class="input-buffer"></div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input underline-text" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="start-role-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="end-role-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="qualified-input" value="" />',
    '</div>'
  ].join(''),
});
