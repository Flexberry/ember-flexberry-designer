/**
  @module ember-flexberry-designer
*/
import Ember from 'ember';

import FdUmlLink from './fd-uml-baselink';
import { Link } from './fd-uml-link';

/**
  An object that describes a link of the composition type on the UML diagram.

  @class FdUmlComposition
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
    return new Composition(properties);
  },
});

/**
  Defines the JointJS link, which represents a composition in the UML diagram.

  @for FdUmlComposition
  @class Composition
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let Composition = Link.define('flexberry.uml.Composition', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' } },
});
