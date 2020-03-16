/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { isArray, A } from '@ember/array';
import joint from 'npm:jointjs';
import $ from 'jquery';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes an start state on an activity diagram

  @class FdUmlStartState
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    Name on the start state element.

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
    return new StartState(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'StartState' object in the UML diagram.

  @for FdUmlStartState
  @class StartState
  @extends shapes.uml.
  @namespace flexberry.uml
  @constructor
*/
export let StartState = BaseObject.define('flexberry.uml.StartState', {
  size: { width: 20, height: 20 },
  attrs: {
    '.flexberry-uml-header-circle': { 'fill': 'black', 'r': 15, 'ref-y': 10, 'ref-x': 10 },
  },
}, {
  // markup: [
  //   '<g class="scalable">',
  //   '<circle class="flexberry-uml-header-circle-outer"/>',
  //   '<circle class="flexberry-uml-header-circle"/>',
  //   '</g>'
  // ].join(''),

  markup: [{
    tagName: 'g',
    className: 'scalable',
    children: [{
        tagName: 'circle',
        className: 'flexberry-uml-header-circle-outer'
    }, {
      tagName: 'circle',
      className: 'flexberry-uml-header-circle'
    }]
  }],

  // Minimum height.
  minHeight: 20,

  // Minimum width
  minWidth: 20,
  
  getRectangles() {
    return [];
  },
});

joint.shapes.flexberry.uml.StartStateView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input start-state-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  getSizeChangers() {
    return A();
  },

  //In updateRectangles update only text sizes, because start/final state not have rectanles
  updateRectangles() {
    let $buffer = this.$box.find('.input-buffer');
    let $input = this.$box.find('.class-name-input');
    $buffer.css('font-weight', $input.css('font-weight'));
    $buffer.text($input.val());
    $input.width($buffer.width() + 1);

    //shift state text
    $input.css({top: (this.$box.height() / 3), right: (this.$box.width() + 20), position:'absolute'});
   },

   setColors() {
    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.flexberry-uml-header-circle/fill', textColor);
    }

    const inputElements = this.model.inputElements;
    if (isArray(inputElements) && (!isNone(textColor))) {
      inputElements.each(function(index, input) {
        if (!isNone(textColor)) {
          $(input).find('input, textarea').css('color', textColor);
        }
      });
    }
  },
});

