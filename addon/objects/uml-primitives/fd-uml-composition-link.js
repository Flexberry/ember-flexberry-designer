/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import joint from 'npm:jointjs';
import { isNone } from '@ember/utils';

import FdUmlLink, { LinkWithUnderline } from './fd-uml-link';
import { RoleView } from './links-view/fd-role-view';

/**
  An object that describes a link of the composition type on the UML diagram.

  @class FdUmlCompositionLink
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
  attrs: {
    '.marker-source': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  },
}, {
  initialize: function() {
    LinkWithUnderline.prototype.initialize.apply(this, arguments);
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

joint.shapes.flexberry.uml.CompositionLinkView = RoleView.extend({
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

    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-source/stroke', textColor);
      this.model.attr('.text-color/style/stop-color', textColor);
      this.model.attr('.marker-source/fill', textColor );
    }
  }
});
