/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlBaseLink from './fd-uml-link';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { Connection } from './fd-uml-connection';
import { Dependency } from './fd-uml-dependency';
import { NormalizedDescriptionView } from './links-view/fd-normalized-description-view';

/**
  An object that defines Transition link on the UML diagram.

  @class FdUmlTransition
  @extends FdUmlBaseLink
*/
export default FdUmlBaseLink.extend({

  /**
    Type of primitive.

    @property type
    @type String
  */
  type: computed.alias('primitive.$type'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    if (this.get('type') === 'STORMCASE.UML.ad.Transition, UMLAD') {
      return new Transition(properties);
    } else {
      return new Connection(properties);
    }
  }
});

/**
  Defines the JointJS link, which represents a Connection in the UML diagram.
  @for FdUmlTransition
  @class FdUmlTransition
  @extends Connection
  @namespace flexberry.uml
  @constructor
*/
export let Transition = Connection.define('flexberry.uml.Transition', {
  attrs: {
    rect: { 'visibility': 'visible' },
  }
}, {
  initialize: function () {
    Dependency.prototype.initialize.apply(this, arguments);
  }
});

joint.shapes.flexberry.uml.TransitionView = NormalizedDescriptionView.extend({
  setColors() {
    NormalizedDescriptionView.prototype.setColors.apply(this, arguments);

    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-target/stroke', textColor);
    }
  }
});
