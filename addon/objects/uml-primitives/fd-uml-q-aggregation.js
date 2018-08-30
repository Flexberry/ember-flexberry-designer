/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlLink from './fd-uml-baselink';
import { Link } from './fd-uml-link';

/**
  An object that describes a link of the association type on the UML diagram.

  @class FdUmlAssociation
  @extends FdUmlLink
*/
export default FdUmlLink.extend({
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

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    return new QualifiedAggregation(properties);
  },
});

/**
  Defines the JointJS link, which represents a association in the UML diagram.

  @for FdUmlAssociation
  @class Association
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let QualifiedAggregation = Link.define('flexberry.uml.QualifiedAggregation', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'white' } },
});
