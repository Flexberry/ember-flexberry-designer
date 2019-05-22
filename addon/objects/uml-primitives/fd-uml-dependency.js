/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { DescriptionView } from './links-view/fd-description-view';
import { setLinkColors } from '../../utils/fd-uml-colors';

/**
  An object that describes a link of the dependency type on the UML diagram.

  @class FdUmlDependency
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
    return new Dependency(properties);
  },
});

/**
  Defines the JointJS link, which represents a Dependency in the UML diagram.

  @for FdUmlDependency
  @class Dependency
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let Dependency = Link.define('flexberry.uml.Dependency', {
  attrs: {
    text: { 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif', visibility: 'hidden' },
    '.marker-target': { d: 'M 0 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
    rect: { visibility: 'hidden' }
  },

}, {
  initialize(properties) {
    setLinkColors(properties.primitive, this);
  }
}

);

joint.shapes.flexberry.uml.DependencyView = DescriptionView;
