/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';
import { isNone } from '@ember/utils';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { MultiplicityView } from './links-view/fd-multiplicity-view';

/**
  An object that describes a link of the composition type on the UML diagram.

  @class FdUmlComposition
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
    return new Composition(properties);
  },
});

/**
  Defines the JointJS link, which represents a composition in the UML diagram.

  @for FdUmlComposition
  @class Composition
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let Composition = Link.define('flexberry.uml.Composition', {
  attrs: {
    '.marker-source': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
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
  }
});

joint.shapes.flexberry.uml.CompositionView = MultiplicityView.extend({
  setColors() {
    MultiplicityView.prototype.setColors.apply(this, arguments);

    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-source/stroke', textColor);
      this.model.attr('.marker-source/fill', textColor);
    }
  },

  getButtons() {
    let buttons = MultiplicityView.prototype.getButtons.apply(this, arguments);
    let objectModel = this.model.get('objectModel');

    if (!isNone(objectModel.get('repositoryObject'))) {
      buttons.pushObject({
        name: 'open-edit-form-button',
        text: '&#xf013',
        handler: this.openEditForm.bind(this),
        attrs: {
          'element': { atConnectionRatio: .4 },
          'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
          'text': { fill: '#ffffff', x: 0, y: 3, 'font-size': 10, 'text-anchor': 'middle', 'font-family': 'Icons', visibility: 'visible', 'cursor': 'pointer' },
        }
      });
    }

    return buttons;
  },

  openEditForm(e) {
    e.stopPropagation();
    this.paper.trigger('element:openeditform', this);
  }

});
