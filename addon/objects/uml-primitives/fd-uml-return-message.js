/**
  @module ember-flexberry-designer
*/
import Ember from 'ember';

import FdUmlLink from './fd-uml-link';
import { FlatMessage } from './fd-uml-flat-message';

/**
  An object that describes a Return Message on the UML diagram.

  @class FdUmlReturnMsg
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    End role text.

    @property startRoleTxt
    @type String
  */

  endRoleTxt: Ember.computed.alias('primitive.LeftText.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: Ember.computed.alias('primitive.RightText.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS(graph) {
    let properties = this.getProperties('id', 'source', 'target', 'labels');
    properties.graph = graph;
    return new ReturnMessage(properties);
  },
});

/**
  Defines the JointJS link, which represents a Return Message in the UML diagram.

  @for FdUmlReturnMsg
  @class AsyncMessage
  @extends flexberry.uml.FlatMessage
  @namespace flexberry.uml
  @constructor
*/
export let ReturnMessage = FlatMessage.define('flexberry.uml.sequencediagramReturnMessage', {
  attrs: {
    '.marker-target': { d: 'M 0 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    '.marker-source': null,
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' }
  }
});
