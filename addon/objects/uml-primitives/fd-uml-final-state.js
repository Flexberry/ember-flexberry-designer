/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
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

    @property attrs
    @type String
  */
  attrs: computed('primitive.Name.Text', function () {
    return { text: { text: this.get('primitive.Name.Text') } };
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'attrs', 'position');

    return new FinalState(properties);

  },
});

/**
  Defines the JointJS object, which represents a 'FinalState' object in the UML diagram.

  @for FdUmlFinalState
  @class FinalState
  @extends joint.shapes.uml.EndState
  @namespace flexberry.uml
  @constructor
*/
export let FinalState = joint.shapes.uml.EndState.define('flexberry.uml.FinalState', {
  attrs: {
    'circle.inner': { fill: 'black' },
    text: {
      'ref':'circle.inner',
      'ref-x': 20,
      'ref-y': 0.5,
      'text-anchor': 'strat',
      'y-alignment': 'middle',
      'fill': 'black',
      'font-weight':'bold',
      'font-size':'12',
      'font-family':'Arial, helvetica, sans-serif'
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g><text/></g>'
});
