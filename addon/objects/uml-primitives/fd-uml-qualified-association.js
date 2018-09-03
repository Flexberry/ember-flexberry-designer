/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlBaseLink from './fd-uml-baselink';
import { Link } from './fd-uml-link';
/**
  An object that describes a link of the Qualified association type on the UML diagram.

  @class FdUmlQualifiedAssociation
  @extends FdUmlLink
*/
export default FdUmlBaseLink.extend({

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
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    return new QualifiedAssociation(properties);
  },
});

/**
  Defines the JointJS link, which represents a association in the UML diagram.

  @for FdUmlAssociation
  @class Association
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let QualifiedAssociation = Link.define('flexberry.uml.QualifiedAssociation', {
  attrs: {
    '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 z', fill: 'white' },
    text: { 'text-decoration': 'underline', }
  }
});
