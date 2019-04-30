/**
  @module ember-flexberry-designer
*/

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { DescriptionView } from './links-view/fd-description-view';
import joint from 'npm:jointjs';

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
    let properties = this.getProperties('id', 'repositoryObject', 'source', 'target', 'vertices', 'startPoint', 'endPoint');
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
  text: { visibility: 'hidden' },
  rect: { visibility: 'hidden' }
 }
});

joint.shapes.flexberry.uml.GeneralizationView = DescriptionView;
