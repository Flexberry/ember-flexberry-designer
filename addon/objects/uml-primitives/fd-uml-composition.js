/**
  @module ember-flexberry-designer
*/

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { MultiplicityView } from './links-view/fd-multiplicity-view';
import joint from 'npm:jointjs';

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
    let properties = this.getProperties('id', 'repositoryObject', 'source', 'target', 'vertices', 'startPoint', 'endPoint');
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
      default:
        // eslint-disable-next-line no-console
        console.log('ERROR - choose correct label name');
    }
  }
});

joint.shapes.flexberry.uml.CompositionView = MultiplicityView;
