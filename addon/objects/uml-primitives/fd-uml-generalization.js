/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';
import { isNone } from '@ember/utils';

import FdUmlLink, { Link } from './fd-uml-link';
import { EmptyView } from './links-view/fd-empty-view';

/**
  An object that describes a link of the inheritance type on the UML diagram.

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
    return new Generalization(properties);
  },
});

/**
  Defines the JointJS link, which represents a generalization in the UML diagram.

  @for FdUmlGeneralization
  @class Generalization
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let Generalization = Link.define('flexberry.uml.Generalization', {
  attrs: { '.marker-source': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' },
  text: { 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' },
  rect: { visibility: 'hidden' }
 },
 labels: [{
   position: { distance: 50 }, attrs: { text: { text: '' } }
 }]
});

joint.shapes.flexberry.uml.GeneralizationView = DescriptionView.extend({
  setColors() {
    DescriptionView.prototype.setColors.apply(this, arguments);

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
