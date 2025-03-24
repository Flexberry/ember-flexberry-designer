/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { RoleView } from './links-view/fd-role-view';

/**
  An object that describes an aggregation link on the UML diagram.

  @class FdUmlAggregation
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    End role text.

    @property startRoleTxt
    @type String
  */

  endRoleTxt: computed.alias('primitive.RightText.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: computed.alias('primitive.LeftText.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    properties.centredAnchor = true;
    return new ProcedureCall(properties);
  },
});

/**
  Defines the JointJS link, which represents a Procedure call in the UML diagram.

  @for FdUmlProcedureCall
  @class ProcedureCall
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let ProcedureCall = Link.define('flexberry.uml.sequencediagramProcedureCall', {
  attrs: {
    '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'black' },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  }
}, {
  getLabelDistance: function (labelName) {
    switch (labelName) {
      case 'endRole':
        return -30;
      case 'description':
        return 0.5;
    }
  },
});

joint.shapes.flexberry.uml.sequencediagramProcedureCallView = RoleView;