/**
  @module ember-flexberry-designer
*/

import FdUmlBaseLink from './fd-uml-baselink';
import { Link } from './fd-uml-link';

/**
  An object that describes a link of the `Qualified aggregation` type on the UML diagram.

  @class FdUmlQualifiedAggregation
  @extends FdUmlBaseLink
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
    return new QualifiedAggregation(properties);
  },
});

/**
  Defines the JointJS link, which represents a Qualified aggregation in the UML diagram.

  @for FdUmlQualifiedAggregation
  @class QualifiedAggregation
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let QualifiedAggregation = Link.define('flexberry.uml.QualifiedAggregation', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'white' } },
});
