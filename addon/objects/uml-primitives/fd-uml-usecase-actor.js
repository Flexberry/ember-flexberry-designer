/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import $ from 'jquery';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';
import joint from 'npm:jointjs';

/**
  An object that describes a UsecaseActor on the UML diagram.

  @class FdUmlUsecaseActor
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

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

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new UsecaseActor(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'UsecaseActor' object in the UML diagram.

  @for FdUmlUsecaseActor
  @class UsecaseActor
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let UsecaseActor = BaseObject.define('flexberry.uml.UsecaseActor', {
  // Minimum width.
  minWidth: 25,

  // Minimum height.
  minHeight: 50,

  attrs: {
    /*image: {
      'xlink:href': 'assets/images/actor.svg',
      width: 30,
      'ref': '.flexberry-uml-header-text',
      'refY': -55,
      'refX': 3,
      height: 50
    },*/

    text: {
      'visibility': 'visible'
    },

    '.flexberry-uml-header-text': {
      'ref': '',
      'textAnchor': 'middle',
      'yAlignment': 'middle',
      'fontWeight': 'bold',
      'fill': 'black',
      'fontSize': 12,
      'fontFamily': 'Arial'
    }
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<g class="flexberry-uml-header-rect">',
    '<circle cx="15" cy="15" r="15"/>',
    '<path  d="M 15 30 15 45 30 45 0 45 15 45 15 60 0 80 15 60 30 80" />',
    '</g>',
    '</g>',
    '</g>'
  ].join(''),

  initialize: function () {
    BaseObject.prototype.initialize.apply(this, arguments);
  },
  
  getRectangles() {
    return [
      { type: 'header', element: this }
    ];
  },

});

joint.shapes.flexberry.uml.UsecaseActorView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea under-class-name-input class="class-name-input params-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  updateRectangles: function (resizedWidth, resizedHeight) {
    const minWidth = this.model.attributes.minWidth;
    const minHeight = this.model.attributes.minHeight;
    const oldSize = this.model.size();

    let newHeight = Math.max( resizedHeight || oldSize.height, minHeight)
    let newWidth = Math.max( resizedWidth || oldSize.width, minWidth)

    let $box = this.$box;
    let inputs =  $box.find('.class-name-input');
    let $buffer = $box.find('.input-buffer');

    inputs.each(function() {
      let $input = $(this);
      $buffer.css('font-weight', $input.css('font-weight'));
      $buffer.text($input.val());
      $input.width($buffer.width() + 1);
      $input[0].style.marginLeft = -$input.width()/2 + 'px';
    });

    this.model.resize(newWidth, newHeight);
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }

    let paramsBox = this.$box.find('.params-input');
    paramsBox.css({
      left: newWidth/2,
      top: newHeight + 10,
      position: 'absolute'
    });
  },
});
