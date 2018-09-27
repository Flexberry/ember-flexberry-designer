/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';
import FdUmlLink from './fd-uml-link';
import { LinkWithUnderline } from './fd-uml-link';
import { QualifiedView } from './links-view/fd-qualified-view';
/**
  An object that describes a link of the Qualified association type on the UML diagram.

  @class FdUmlQualifiedAssociation
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    End role text.

    @property endRoleTxt
    @type String
  */
  endRoleTxt: Ember.computed.alias('primitive.RightText.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: Ember.computed.alias('primitive.LeftText.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels', 'startPoint', 'endPoint');
    return new QualifiedAssociation(properties);
  },
});

/**
  Defines the JointJS link, which represents a Qualified Association in the UML diagram.

  @for FdUmlQualifiedAssiociation
  @class QualifiedAssociation
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let QualifiedAssociation = LinkWithUnderline.define('flexberry.uml.QualifiedAssociation', {
  attrs: {
    '.marker-source': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 z', fill: 'white' },
    text: { 'text-decoration': 'underline', visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  }
});

joint.shapes.flexberry.uml.QualifiedAssociationView = QualifiedView;
