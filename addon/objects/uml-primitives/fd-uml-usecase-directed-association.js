/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';
import { isNone } from '@ember/utils';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { DescriptionView } from './links-view/fd-description-view';

/**
  An object that describes a link of the Directed Association type on the UML diagram.

  @class FdUmlGeneralization
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
    return new DirectedAssociation(properties);
  },
});

/**
  Defines the JointJS link, which represents a Directed Association in the UML diagram.

  @for FdUmlDirectedAssociation
  @class DirectedAssociation
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let DirectedAssociation = Link.define('flexberry.uml.DirectedAssociation', {

  attrs: {
    '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'black' },
    text: { 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif', visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  }
});

joint.shapes.flexberry.uml.DirectedAssociationView = DescriptionView.extend({
  setColors() {
    DescriptionView.prototype.setColors.apply(this, arguments);

    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-target/stroke', textColor);
      this.model.attr('.marker-target/fill', textColor);
    }
  }
});
