/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a Complex Transitionon an activity diagram

  @class FdUmlComplexTransition
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    Text to show.

    @property attrs
    @type String
  */
  attrs: Ember.computed('primitive.Name.Text', function() {
    return { text: { text: this.get('primitive.Name.Text') } };
  }),

  /**
    Type of primitive.

    @property type
    @type String
  */
  type: Ember.computed.alias('primitive.$type'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'attrs', 'position', 'type');
    if (this.get('type') === 'STORMCASE.UML.ad.ComplexTransitionV, UMLAD' ||
     this.get('type') === 'STORMCASE.UML.std.ComplexTransitionV, UMLSTD') {
      return new ComplexTransitionV(properties);
    } else {
      return new ComplexTransitionH(properties);
    }

  },
});

/**
  Defines the JointJS object, which represents a horisontal 'ComplexTransition' object in the UML diagram.

  @for FdUmlStartState
  @class ComplexTransitionH
  @extends joint.dia.Element
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
  },
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

/**
  Defines the JointJS object, which represents a vertical 'ComplexTransition' object in the UML diagram.

  @for FdUmlStartState
  @class ComplexTransitionV
  @extends ComplexTransitionH
  @namespace flexberry.uml
  @constructor
*/
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
