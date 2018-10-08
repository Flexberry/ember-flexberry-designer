/**
  @module ember-flexberry-designer
*/
import Ember from 'ember';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';

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
    let properties = this.getProperties('id', 'source', 'target', 'labels');
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
    '.marker-source': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'black' }
  },
  labels: [{
    position: { distance: 0.05, offset: -12 }, attrs: { text: { text: '' } } //endMultiplicity
  }, {
    position: { distance: 0.95, offset: -12 }, attrs: { text: { text: '' } } //startMultiplicity
  }, {
    textAnchor: 'middle', attrs: { text: { text: '' } } //description
  }, {
    position: { distance: 0.05, offset: 12 }, attrs: { text: { text: '' } } //endRoleTxt
  }, {
    position: { distance: 0.95, offset: 12 }, attrs: { text: { text: '' } } //startRoleTxt
  }]
}, {
  setLabelText: function (label, text) {
    console.log(`label: ${label}; text: ${text}`);
    switch (label) {
      case 'startMultiplicity':
        this.label(0, { attrs: { text: { text: text } } });
        break;
      case 'startRole':
        this.label(1, { attrs: { text: { text: text } } });
        break;
      case 'description':
        this.label(2, { attrs: { text: { text: text } } });
        break;
      case 'endRole':
        this.label(3, { attrs: { text: { text: text } } });
        break;
      case 'endMultiplicity':
        this.label(4, { attrs: { text: { text: text } } });
        break;
      default:
        console.log('ERROR - choose correct label name');
        break;
    }

    return;
  }
});
