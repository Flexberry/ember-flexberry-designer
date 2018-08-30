/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import '../../utils/fd-common-primitives';

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

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    return new NestedClassAssociation(properties);
  },
});

/**
  Defines the JointJS link, which represents a association in the UML diagram.

  @for FdUmlAssociation
  @class Association
  @extends flexberr.uml.NestedClassAssociation
  @namespace flexberry.uml
  @constructor
*/
export let NestedClassAssociation = Link.define('flexberry.uml.NestedClassAssociation', {
  attrs: { '.marker-target': { d: 'M 10, 10 ' +
                'm -8, 0 ' +
                'a 8,8 0 1,0 16,0 ' +
                'a 8,8 0 1,0 -16,0 M 10 2 L 10 2 L 10 18', fill: 'transparent' } }
});
