/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlBaseLink from './fd-uml-baselink';
import { Link } from './fd-uml-link';
/**
  An object that describes a link of the association type on the UML diagram.

  @class FdUmlAssociation
  @extends FdUmlLink
*/
export default FdUmlBaseLink.extend({
  /**
    The start multiplicity of a link.

    @property startMultiplicity
    @type String
  */
  startMultiplicity: Ember.computed.alias('primitive.StartMultTxt.Text'),

  /**
    The end multiplicity of a link.

    @property endMultiplicity
    @type String
  */
  endMultiplicity: Ember.computed.alias('primitive.EndMultTxt.Text'),

  description: Ember.computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    return new Association(properties);
  },
});

/**
  Defines the JointJS link, which represents a association in the UML diagram.

  @for FdUmlAssociation
  @class Association
  @extends flexberr.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let Association = Link.define('flexberry.uml.Association', {});
