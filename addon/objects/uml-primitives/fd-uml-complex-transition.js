/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a final state on an activity diagram

  @class FdUmlFinalState
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    End state name text.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  type: Ember.computed.alias('primitive.$type'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'name', 'position', 'type');
    if (properties.type === 'STORMCASE.UML.ad.ComplexTransitionV, UMLAD') {
      return new ComplexTransitionV(properties);
    } else {
      return new ComplexTransitionH(properties);
    }

  },
});

/**
  Defines the JointJS object, which represents a 'FinalState' object in the UML diagram.

  @for FdUmlStartState
  @class StartState
  @extends shapes.uml.
  @namespace flexberry.uml
  @constructor
*/
export let ComplexTransitionH = joint.dia.Element.define('flexberry.uml.ComplexTransitionHorizon', {
  attrs: {
    polyline: { refPoints: '0,0 10,0', stroke: 'black', 'stroke-width': 2 },
    text: {
      'ref': 'polyline',
      'ref-y': 0,
      'ref-x': 0.99,
      'text-anchor': 'start',
      'y-alignment': 'middle',
      'font-weight': 'bold'
    }
  }
}, {
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<polyline/>',
      '</g>',
      '<text/>',
      '</g>'
    ].join('')
  });

export let ComplexTransitionV = ComplexTransitionH.define('flexberry.uml.ComplexTransitionVertical', {
  attrs: {
    polyline: { refPoints: '0,0 0,10' },
    text: {
      'ref-y': 0.99,
      'ref-x': 0,
      'text-anchor': 'middle',
      'y-alignment': 'start'
    }
  }
});
