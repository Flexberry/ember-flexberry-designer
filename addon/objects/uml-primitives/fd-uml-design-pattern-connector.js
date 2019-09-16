/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink, { Link } from './fd-uml-link';
import { DescriptionView } from './links-view/fd-description-view';

/**
  An object that describes an DesignPatternConnector on the UML diagram.

  @class FdUmlDesignPatternConnector
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
    return new DesignPatternConnector(properties);
  },
});

/**
  Defines the JointJS link, which represents a design pattern connector in the UML diagram.

  @for FdUmlDesignPatternConnector
  @class DesignPatternConnector
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let DesignPatternConnector = Link.define('flexberry.uml.DesignPatternConnector', {
  attrs: {
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '3 2' },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  },
});

joint.shapes.flexberry.uml.DesignPatternConnectorView = DescriptionView;
