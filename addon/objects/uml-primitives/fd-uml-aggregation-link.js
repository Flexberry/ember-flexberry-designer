/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import joint from 'npm:jointjs';
import { isNone } from '@ember/utils';

import FdUmlLink, { LinkWithUnderline } from './fd-uml-link';
import { RoleView } from './links-view/fd-role-view';
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
  attrs: { '.marker-source': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' },
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
  },

  initialize: function() {
    LinkWithUnderline.prototype.initialize.apply(this, arguments);
  },
});

joint.shapes.flexberry.uml.AggregationLinkView = RoleView.extend({
  template: [
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input underline-text" value="" />',
    '<input type="text" class="start-role-input" value="" />',
    '<input type="text" class="end-role-input" value="" />',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  setColors() {
    RoleView.prototype.setColors.apply(this, arguments);

    const brushColor = this.getBrushColor();
    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-source/stroke', textColor);
      this.model.attr('.text-color/style/stop-color', textColor);
    }

    if (!isNone(brushColor)) {
      this.model.attr('.marker-source/fill', brushColor);
    }
  }
});
