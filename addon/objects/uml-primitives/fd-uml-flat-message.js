/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { RoleView } from './links-view/fd-role-view';

/**
  An object that describes a Flat Message on the UML diagram.

  @class FdUmlFlatMsg
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
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    properties.centredAnchor = true;
    return new FlatMessage(properties);
  },
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

/**
  Defines the JointJS link, which represents a Flat Message in the UML diagram.

  @for FdUmlFlatMsg
  @class FlatMessage
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let FlatMessage = Link.define('flexberry.uml.sequencediagramFlatMessage', {
  attrs: {
    '.marker-target': { d: 'M 0 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    '.connection': { stroke: 'black', 'stroke-width': 1 },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  },
});

joint.shapes.flexberry.uml.sequencediagramFlatMessageView = RoleView;
