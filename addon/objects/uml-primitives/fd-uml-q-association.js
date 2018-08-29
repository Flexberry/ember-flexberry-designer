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
    The array of labels for this link.

    @property labels
    @type Array
  */
  labels: Ember.computed('startMultiplicity', 'endMultiplicity', function() {
    return [
      { attrs: { text: { text: this.get('startMultiplicity') } } },
      { attrs: { text: { text: this.get('endMultiplicity') } } },
    ];
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels', 'text');
    return new Association(properties);
  },
});

/**
  Defines the JointJS link, which represents a association in the UML diagram.

  @for FdUmlAssociation
  @class Association
  @extends flexberr.uml.BaseLink
  @namespace flexberry.uml
  @constructor
*/
export let Association = Link.define('flexberry.uml.Qualified', {
  attrs: {
    '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 z', fill: 'white' },
    text: { 'text-decoration': 'underline', }
  }
});
