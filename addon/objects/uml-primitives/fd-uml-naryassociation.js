/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import $ from 'jquery';
import joint from 'npm:jointjs';

import { BaseObject } from './fd-uml-baseobject';
import FdUmlElement from './fd-uml-element';
import { setInputRectColors } from '../../utils/fd-uml-colors';

/**
  An object that describes a n-ar association on the UML diagram.

  @class FdUmlNAryAssociation
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

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new NAryAssociation(properties);

  },
});

/**
Defines the JointJS object, which represents a 'NAryAssociation' object in the UML diagram.

@for FdUmlNAryAssociation
@class NAryAssociation
@extends BaseObject
@namespace flexberry.uml
@constructor
*/
export let NAryAssociation = BaseObject.define('flexberry.uml.NAryAssociation', {
  attrs: {
  },

  // Inputs padding by X.
  widthPadding: 15,

  // Inputs bottom padding by Y.
  heightBottomPadding: 50,
},
{
  markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<path class="flexberry-uml-header-rect" d="M 0 20 L 50 0 100 20 50 40 Z"/>',
      '</g>',
      '</g>'
  ].join(''),

  getRectangles() {
    return [
      { type: 'header', text: this.getObjName(), element: this },
    ];
  }
});

joint.shapes.flexberry.uml.NAryAssociationView = joint.shapes.flexberry.uml.PrimitiveElementView.extend({
  template: [
    '<div class="uml-class-inputs">',
      '<div class="input-buffer nary-buffer"></div>',
      '<textarea type="text" class="class-name-input nary-assoc-name header-input" value="" rows="1" wrap="off"></textarea>',
    '</div>'
  ].join(''),

  initialize: function() {
    joint.dia.ElementView.prototype.initialize.apply(this, arguments);

    this.$box = $(this.template);
    this.model.inputElements = this.$box;
    let _this = this;

    // Prevent paper from handling pointerdown.
    this.$box.find('input, textarea').on('mousedown click', function(evt) {
      evt.stopPropagation();
      _this.highlight();
    });

    this.$box.find('.nary-assoc-name').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.updateRectangles();
    }.bind(this));

    this.$box.find('.nary-assoc-name').on('change', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('name', textareaText);
    }.bind(this));

    let objectModel = this.model.get('objectModel');
    let instanceInput = this.$box.find('.nary-assoc-name');
    instanceInput.prop('rows', objectModel.get('name').split(/[\n\r|\r|\n]/).length || 1);
    instanceInput.val(objectModel.get('name'));

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);
  },

  render: function() {
    joint.dia.ElementView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.paper.on('blank:pointerdown link:pointerdown element:pointerdown', function() {
      this.$box.find('input:focus, textarea:focus').blur();
    }, this);
    this.updateBox();
    this.updateRectangles();
    return this;
  },

  updateBox: function() {
    // Set the position and dimension of the box so that it covers the JointJS element.
    let bbox = this.model.getBBox();
    this.$box.css({
      width: bbox.width,
      height: bbox.height,
      left: bbox.x,
      top: bbox.y,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
  },

  removeBox: function() {
    this.$box.remove();
  },

  updateRectangles: function() {
    let rects = this.model.getRectangles();
    setInputRectColors(this, rects);
    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    rects.forEach(function(rect) {
      if (this.markup.includes('flexberry-uml-' + rect.type + '-rect') && rect.element.inputElements) {
        let $buffer = rect.element.inputElements.find('.input-buffer');
        let rectHeight = 0;
        let inputs = rect.element.inputElements.find('.' + rect.type + '-input');
        inputs.each(function() {
          let $input = $(this);
          $buffer.css('font-weight', $input.css('font-weight'));
          $buffer.text($input.val());
          $input.width($buffer.width() + 1);
          if ($input.width() > newWidth) {
            newWidth = $input.width();
          }

          rectHeight += $input.height();
        });

        rectHeight += rect.element.get('heightBottomPadding') || 0;
        newHeight += rectHeight;
        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/height', rectHeight);
        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/transform', 'translate(0,' + offsetY + ')');

        offsetY += rectHeight;
      }
    }, this.model);

    newWidth += (this.model.get('widthPadding') || 0) * 2;
    rects.forEach(function(rect) {
      rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', newWidth);
    });

    if (newHeight === 0) {
      newHeight = 50;
    }

    this.model.resize(newWidth, newHeight);
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }
  }
});
