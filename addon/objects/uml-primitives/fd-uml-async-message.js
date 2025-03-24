/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object'
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { RoleView } from './links-view/fd-role-view';

/**
  An object that describes a Async Message on the UML diagram.

  @class FdUmlAsyncMsg
  @extends FdUmlLink
*/
export default FdUmlLink.extend({
  /**
    End role text.

    @property startRoleTxt
    @type String
  */

  endRoleTxt: computed.alias('primitive.LeftText.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: computed.alias('primitive.RightText.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices','labels');
    properties.objectModel = this;
    properties.centredAnchor = true;
    return new AsyncMessage(properties);
  },
});

/**
  Defines the JointJS link, which represents an Async Message in the UML diagram.

  @for FdUmlAsyncMsg
  @class AsyncMessage
  @extends flexberry.uml.FlatMessage
  @namespace flexberry.uml
  @constructor
*/
export let AsyncMessage = Link.define('flexberry.uml.sequencediagramAsyncMessage', {
  attrs: {
    '.marker-target': { d: 'M 0 10 L 13 17 M 13 3', fill: 'black' },
    '.connection': { stroke: 'black', 'stroke-width': 1 },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  },
});

joint.shapes.flexberry.uml.sequencediagramAsyncMessageView = RoleView;
