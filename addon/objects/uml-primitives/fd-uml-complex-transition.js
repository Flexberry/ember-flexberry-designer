/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';
import { A, isArray } from '@ember/array';
import $ from 'jquery';
import { BaseObject } from './fd-uml-baseobject';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a Complex Transitionon an activity diagram

  @class FdUmlComplexTransition
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    Text to show.

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
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    let type = this.get('type');
    if (type === 'STORMCASE.UML.ad.ComplexTransitionV, UMLAD' ||
     type === 'STORMCASE.UML.std.ComplexTransitionV, UMLSTD') {
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
export let ComplexTransitionH = BaseObject.define('flexberry.uml.ComplexTransitionH', {
  attrs: {
    '.flexberry-uml-header-poliline': {'refPoints': '0,0 40,0', 'stroke': 'black', 'stroke-width': 2 },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<polyline class = "flexberry-uml-header-poliline"/>',
    '</g>',
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
export let ComplexTransitionV = ComplexTransitionH.define('flexberry.uml.ComplexTransitionV', {
  attrs: {
    '.flexberry-uml-header-poliline': {'refPoints': '40,0 40,40', 'stroke': 'black', 'stroke-width': 2 },
  }
});

joint.shapes.flexberry.uml.ComplexTransitionHView = joint.shapes.flexberry.uml.PrimitiveElementView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input final-state-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function () {
    joint.dia.ElementView.prototype.initialize.apply(this, arguments);

    this.$box = $(this.template);
    this.model.inputElements = this.$box;
    let _this = this;

    // Prevent paper from handling pointerdown.
    this.$box.find('input, textarea').on('mousedown click', function(evt) {
      evt.stopPropagation();
      _this.highlight();
    });

    this.$box.find('.class-name-input').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.updateRectangles();
    }.bind(this));

    this.$box.find('.class-name-input').on('change', function (evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('name', textareaText);
    }.bind(this));

    this.updateInputValue();

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);
  },

  updateInputValue() {
    let objectModel = this.model.get('objectModel');
    let classNameInput = this.$box.find('.class-name-input');

    classNameInput.prop('rows', objectModel.get('name').split(/[\n\r|\r|\n]/).length || 1);
    classNameInput.val(objectModel.get('name'));
    this.updateRectangles();
  },

  render: function () {
    joint.dia.ElementView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.paper.on('blank:pointerdown link:pointerdown element:pointerdown', function () {
      this.$box.find('input:focus, textarea:focus').blur();
    }, this);
    this.updateBox();
    this.updateRectangles();
    return this;
  },

  updateBox: function () {
    // Set the position and dimension of the box so that it covers the JointJS element.
    let bbox = this.model.getBBox();
    this.$box.css({
      width: bbox.width,
      height: bbox.height,
      left: bbox.x,
      top: bbox.y
    });
  },

  //In updateRectangles update only text sizes, because start/final state not have rectanles
  updateRectangles() {
    let $buffer = this.$box.find('.input-buffer');
    let $input = this.$box.find('.class-name-input');
    $buffer.css('font-weight', $input.css('font-weight'));
    $buffer.text($input.val());
    $input.width($buffer.width() + 1);

    //shift state text
    $input.css({top: -8, left: (this.$box.width() + 20), position:'absolute'});
   },

  removeBox: function () {
    this.$box.remove();
  },

  getButtons() {
    return A([{
      name: 'remove-button',
      text: '&#xf00d',
      handler: this.removeElement.bind(this),
      attrs: {
        'element': {'ref-dx': 10,'ref-y': -15, 'ref': '.joint-highlight-stroke' },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
        'text': { fill: '#ffffff','font-size': 10, 'text-anchor': 'middle', x: 0, y: 3, 'font-family': 'Icons' },
      }
    }]);
  }
});

joint.shapes.flexberry.uml.ComplexTransitionVView = joint.shapes.flexberry.uml.ComplexTransitionHView .extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input complex-transition-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
   ].join(''),

   updateRectangles() {
    let $buffer = this.$box.find('.input-buffer');
    let $input = this.$box.find('.class-name-input');
    $buffer.css('font-weight', $input.css('font-weight'));
    $buffer.text($input.val());
    $input.width($buffer.width() + 1);

    $input.css({top: (this.$box.height() * 1.2), left: -(($buffer.width()) / 2),  position:'absolute'});
   },
});
