/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import '../../utils/fd-common-primitives';

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
    return new Realization(properties);
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
export let Realization = Link.define('flexberry.uml.Realization', {
  attrs: {
    '.marker-target': { d: 'M 0 0 z' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
  },
});
