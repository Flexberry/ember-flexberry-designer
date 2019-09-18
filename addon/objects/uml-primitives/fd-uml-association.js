/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { EmptyView } from './links-view/fd-empty-view';

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
    text: { 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' },
    rect: { visibility: 'hidden' }
  },
  labels: [{
    position: { distance: 50 }, attrs: { text: { text: '' } }
  }]
});

joint.shapes.flexberry.uml.AssociationView = EmptyView;
