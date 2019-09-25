/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import joint from 'npm:jointjs';
import { isNone } from '@ember/utils';

import FdUmlLink, { LinkWithUnderline } from './fd-uml-link';
import { RoleView } from './links-view/fd-role-view';

/**
  An object that describes an association link on the UML diagram.

  @class FdUmlAssociationLink
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
    return new AssociationLink(properties);
  },
});

/**
  Defines the JointJS link, which represents an association link in the UML diagram.

  @for FdUmlAssociationLink
  @class AssociationLink
  @extends flexberry.uml.LinkWithUnderline
  @namespace flexberry.uml
  @constructor
*/
export let AssociationLink = LinkWithUnderline.define('flexberry.uml.AssociationLink', {
  attrs: {
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  },
}, {
  initialize: function() {
    LinkWithUnderline.prototype.initialize.apply(this, arguments);
  },
});

joint.shapes.flexberry.uml.AssociationLinkView = RoleView.extend({
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
  },

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
