/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlBaseLink from './fd-uml-baselink';
import { Link } from './fd-uml-link';

/**
  An object that describes an association link on the UML diagram.

  @class FdUmlAssociation
  @extends FdUmlBaseLink
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
    End role text.

    @property endRoleTxt
    @type String
  */
  endRoleTxt: Ember.computed.alias('primitive.EndRoleTxt.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: Ember.computed.alias('primitive.StartRoleTxt.Text'),

  /**
    Link description.

    @property description
    @type String
  */
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
  Defines the JointJS link, which represents an association in the UML diagram.

  @for FdUmlAssociation
  @class Association
  @extends flexberr.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let Association = Link.define('flexberry.uml.Association', {});
