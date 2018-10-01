/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import { BaseObject } from './fd-uml-baseobject';
import FdUmlElement from './fd-uml-element';

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
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');

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
    text: {
      'text-decoration': 'underline',
      'font-size': '12',
      'visibility': 'hidden'
    },
    path: {
      'd': 'M 0 20 L 50 0 100 20 50 40 Z'
    }
  },

  // Inputs padding by X.
  widthPadding: 15,

  // Inputs bottom padding by Y.
  heightBottomPadding: 25,
},
{
  markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<path class="flexberry-uml-header-rect"/>',
      '</g>',
      '</g>'
  ].join(''),

  initialize: function() {
    this.on('change:name', function() {
      this.updateRectangles();
      this.trigger('uml-update');
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getRectangles() {
    return [
      { type: 'header', text: this.getObjName(), element: this },
    ];
  },

  updateRectangles: function() {
    let rects = this.getRectangles();

    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    rects.forEach(function(rect) {
      if (this.markup.includes('flexberry-uml-' + rect.type + '-rect') && rect.element.inputElements) {
        let $buffer = rect.element.inputElements.find('.input-buffer');
        let rectHeight = 0;
        let inputs = rect.element.inputElements.find('.' + rect.type + '-input');
        inputs.each(function() {
          let $input = Ember.$(this);
          $buffer.css('font-weight', $input.css('font-weight'));
          $buffer.text($input.val());
          $input.width($buffer.width() + 1);
          if ($input.width() > newWidth) {
            newWidth = $input.width();
          }
        });

        rectHeight += rect.element.get('heightBottomPadding') || 0;
        newHeight += rectHeight;
        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/height', rectHeight);
        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/transform', 'translate(0,' + offsetY + ')');

        offsetY += rectHeight;
      }
    }, this);

    newWidth += (this.get('widthPadding') || 0) * 2;
    rects.forEach(function(rect) {
      rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', newWidth);
    });

    if (newHeight === 0) {
      newHeight = 30;
    }

    this.resize(newWidth, newHeight);
  }
});

joint.shapes.flexberry.uml.NAryAssociationView = joint.dia.ElementView.extend({
  template: [
    '<div class="uml-class-inputs">',
      '<div class="input-buffer"></div>',
    '<input type="text" class="class-name-input instance-input header-input" value="" />',
    '</div>'
  ].join(''),

  initialize: function() {
    joint.dia.ElementView.prototype.initialize.apply(this, arguments);

    this.$box = Ember.$(this.template);
    this.model.inputElements = this.$box;

    // Prevent paper from handling pointerdown.
    this.$box.find('input').on('mousedown click', function(evt) {
      evt.stopPropagation();
    });

    this.$box.find('.instance-input').on('input', function() {
      this.model.updateRectangles();
    }.bind(this));

    this.$box.find('.instance-input').on('change', function(evt) {
      this.model.set('name', Ember.$(evt.target).val());
    }.bind(this));

    let instanceInput = this.$box.find('.instance-input');
    instanceInput.val(this.model.get('name'));

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);
  },

  render: function() {
    joint.dia.ElementView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.paper.on('blank:pointerdown link:pointerdown element:pointerdown', function() {
      this.$box.find('input').blur();
    }, this);
    this.updateBox();
    this.model.updateRectangles();
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
});
