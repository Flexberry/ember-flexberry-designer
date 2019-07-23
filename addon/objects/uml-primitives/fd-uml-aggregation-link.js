/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
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
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' },
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
    }
  }
});

joint.shapes.flexberry.uml.AggregationLinkView = QualifiedView.extend({
  template: [
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input underline-text" value="" />',
    '<input type="text" class="start-role-input" value="" />',
    '<input type="text" class="end-role-input" value="" />',
    '<input type="text" class="qualified-input" value="" />',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});
