/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Association } from './fd-uml-association';
import { DescriptionView } from './links-view/fd-description-view';

/**
  An object that describes an NAryAssociationConnector link on the UML diagram.

  @class FdUmlNAryAssociationConnector
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
    return new NAryAssociationConnector(properties);
  },
});

/**
  Defines the JointJS link, which represents an NAryAssociationConnector in the UML diagram.

  @for FdUmlNAryAssociationConnector
  @class NAryAssociationConnector
  @extends flexberry.uml.Association
  @namespace flexberry.uml
  @constructor
*/
export let NAryAssociationConnector = Association.define('flexberry.uml.NAryAssociationConnector', {
}, {
  getLabelDistance: function (labelName) {
    switch (labelName) {
      case 'description':
        return 0.1;
      default:
        // eslint-disable-next-line no-console
        console.log('ERROR - choose correct label name');
    }
  }
});

joint.shapes.flexberry.uml.NAryAssociationConnectorView = DescriptionView.extend({});
