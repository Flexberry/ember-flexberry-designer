/**
  @module ember-flexberry-designer
*/
import FdUmlBaseLink from './fd-uml-link';
import { Connection } from './fd-uml-connection';
import { Dependency } from './fd-uml-dependency';

/**
  An object that defines Transition link on the UML diagram.

  @class FdUmlTransition
  @extends FdUmlBaseLink
*/
export default FdUmlBaseLink.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'source', 'target', 'vertices');
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
    text: { 'visibility': 'visible' },
    rect: { 'visibility': 'visible' },
  }
}, {
  initialize: function () {
    this.updateLabel();
    Dependency.prototype.initialize.apply(this, arguments);
  },
  updateLabel: function () {
    let labelsLen = this.attributes.labels.length;
    if (labelsLen > 0) {
      this.attributes.labels[2].attrs.text.text = '[' + this.attributes.labels[2].attrs.text.text;
      this.attributes.labels[2].attrs.text.text = this.attributes.labels[2].attrs.text.text + ']';
    }
  },
});
