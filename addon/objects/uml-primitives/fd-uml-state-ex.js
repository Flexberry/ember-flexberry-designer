/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { BaseClass, Class } from './fd-uml-class';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a states on the UML diagram.

  @class FdUmlStateEx
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the states.

    @property name
    @type String
  */
  name: computed.alias('primitive.Name.Text'),

  /**
    List of attributes of the states.

    @property attributes
    @type String
  */
  attributes: computed.alias('primitive.Text.Text'),

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
    let properties = this.getProperties('id', 'name', 'size', 'position', 'attributes');
    if (this.get('type') === 'STORMCASE.UML.std.CompositeState, UMLSTD') {
      return new CompositeState(properties);
    } else {
      return new StateEx(properties);
    }

  },
});

/**
  Defines the JointJS element, which represents the UML StateEx in the diagram.

  @for FdUmlStateEx
  @class StateEx
  @extends flexberry.uml.BaseClass
  @namespace flexberry.uml
  @constructor
*/
export let StateEx = BaseClass.define('flexberry.uml.StateEx', {
  attrs: {
    '.flexberry-uml-header-rect': { d:'M 0 10 Q 0 0 10 0 L 90 0 Q 100 0 100 10 L 100 10 100 40 0 40 Z' },
    '.flexberry-uml-body-rect': { d:'M 0 0 L 100 0 100 30 Q 100 40 90 40 L 10 40 Q 0 40 0 30 Z' },
    '.flexberry-uml-body-text': { 'ref-x': 0.5, 'text-anchor': 'middle', d:'M 0 0 L 100 0 100 30 Q 100 40 90 40 L 10 40 Q 0 40 0 30 Z' },
    'text': { 'font-weight': 'bold' }
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<path class="flexberry-uml-header-rect"/><path class="flexberry-uml-body-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-body-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    Class.prototype.updateRectangles.apply(this, arguments);

    let attrs = this.get('attrs');
    let rectHeight = attrs['.flexberry-uml-header-rect'].height;
    attrs['.flexberry-uml-header-rect'].d = `M 0 10 Q 0 0 10 0 L 90 0 Q 100 0 100 10 L 100 10 100 ${rectHeight} 0 ${rectHeight} Z`;

    rectHeight = attrs['.flexberry-uml-body-rect'].height;
    let leftBottomCurve = ` Q 0 ${rectHeight} 0 ${rectHeight - 10}`;
    let rightBottomCurve = ` Q 100 ${rectHeight} 90 ${rectHeight}`;
    attrs['.flexberry-uml-body-rect'].d = `M 0 0 L 100 0 100 ${rectHeight - 10} ${rightBottomCurve} L 10 ${rectHeight} ${leftBottomCurve} Z`;
  }
});

/**
  Defines the JointJS element, which represents the UML CompositeState in the diagram.

  @for FdUmlStateEx
  @class CompositeState
  @extends StateEx
  @namespace flexberry.uml
  @constructor
*/
export let CompositeState = StateEx.define('flexberry.uml.CompositeState', {
  attrs: { '.flexberry-uml-body-text': { 'font-weight':'bold', 'ref-y': 0, 'y-alignment': 'start' } }
});
