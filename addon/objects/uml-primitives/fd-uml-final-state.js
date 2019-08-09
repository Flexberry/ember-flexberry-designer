/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { StartState } from './fd-uml-start-state';
import joint from 'npm:jointjs';
import { isArray } from '@ember/array';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a final state on an activity diagram

  @class FdUmlFinalState
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    Name on the final state element.

    @property name
    @type String
  */
  name: computed('primitive.Name.Text', {
    get() {
      return this.get('primitive.Name.Text');
    },
    set(key, value) {
      let nameTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Name.Text', nameTxt);
      return value;
    },
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'position');
    properties.objectModel = this;
    return new FinalState(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'FinalState' object in the UML diagram.

  @for FdUmlFinalState
  @class FinalState
  @extends joint.shapes.uml.StartState
  @namespace flexberry.uml
  @constructor
*/
export let FinalState = StartState.define('flexberry.uml.FinalState', {
  size: { width: 25, height: 25 },
  attrs: {
    '.flexberry-uml-header-circle': { 'fill': 'black', 'r': 18,'ref-y': 10, 'ref-x': 10 },
    '.flexberry-uml-header-circle-outer': { 'fill': 'white', 'stroke': 'black', 'stroke-width': 2, 'r': 28, 'ref-y': 10, 'ref-x': 10 },
  }
}, {
  markup: [
    '<g class="scalable">',
    '<circle class="flexberry-uml-header-circle-outer"/>',
    '<circle class="flexberry-uml-header-circle"/>',
    '</g>'
  ].join(''),
});

joint.shapes.flexberry.uml.FinalStateView = joint.shapes.flexberry.uml.StartStateView .extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input final-state-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  updateRectangles() {
    let $buffer = this.$box.find('.input-buffer');
    let $input = this.$box.find('.class-name-input');
    $buffer.css('font-weight', $input.css('font-weight'));
    $buffer.text($input.val());
    $input.width($buffer.width() + 1);

    //shift state text
    $input.css({top: (this.$box.height() / 3), left: (this.$box.width() + 20), position:'absolute'});
   },
});
