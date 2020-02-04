/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { MultiplicityView } from './links-view/fd-multiplicity-view';
import { isNone } from '@ember/utils';

/**
  An object that describes an association link on the UML diagram.

  @class FdUmlAssociation
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
    return new Association(properties);
  },
});

/**
  Defines the JointJS link, which represents an association in the UML diagram.

  @for FdUmlAssociation
  @class Association
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let Association = Link.define('flexberry.uml.Association', {
  attrs: {
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  }
});

joint.shapes.flexberry.uml.AssociationView = MultiplicityView.extend({

  getButtons() {
    let buttons = MultiplicityView.prototype.getButtons.apply(this, arguments);
    let objectModel = this.model.get('objectModel');

    if (!isNone(objectModel.get('repositoryObject'))) {
      buttons.pushObject({
        name: 'open-edit-form-button',
        text: '&#xf013',
        handler: this.openEditForm.bind(this),
        attrs: {
          'element': { atConnectionRatio: .3 },
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
  },
});
