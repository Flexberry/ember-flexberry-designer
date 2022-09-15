/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import $ from 'jquery';
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
  // Inputs padding by X.
  widthPadding: 15,

  // Inputs bottom padding by Y.
  heightBottomPadding: 27,

 // Minimum height.
 minHeight: 40,

 // Minimum width
 minWidth: 40,
},
{
  initialize: function () {
    this.markup = [
      '<g class="rotatable">',
      '<g class="scalable">',
      `<path class="flexberry-uml-header-rect" d="M 0 ${this.get('minHeight') / 2} L ${this.get('minWidth') / 2} 0 ${this.get('minWidth')} ${this.get('minHeight') / 2} ${this.get('minWidth') / 2} ${this.get('minHeight')} Z"/>`,
      '</g>',
      '</g>'
    ].join('');
    
    joint.shapes.flexberry.uml.BaseObject.prototype.initialize.apply(this, arguments);
  },

  getRectangles() {
    return [
      { type: 'header', element: this },
    ];
  }
});

joint.shapes.flexberry.uml.NAryAssociationView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
      '<div class="input-buffer nary-buffer"></div>',
      '<textarea type="text" class="class-name-input nary-assoc-name header-input" value="" rows="1" wrap="off"></textarea>',
    '</div>'
  ].join(''),

  initialize: function() {
    joint.shapes.flexberry.uml.PrimitiveElementView.prototype.initialize.apply(this, arguments);

    let _this = this;

    // Prevent paper from handling pointerdown.
    this.$box.find('input, textarea').on('mousedown click', function(evt) {
      evt.stopPropagation();
      _this.highlight();
    });

    this.$box.find('.nary-assoc-name').on('input', function(evt) {
      this.setOldSize();
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
      this.triggerHistoryStep('name', textareaText);
      objectModel.set('name', textareaText);
    }.bind(this));

    this.setInputValues();

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);

    const initSize = this.model.size();
    this.updateRectangles(initSize.width, initSize.height);
  },

  setInputValues: function() {
    const objectModel = this.model.get('objectModel');
    let instanceInput = this.$box.find('.nary-assoc-name');
    instanceInput.prop('rows', objectModel.get('name').split(/[\n\r|\r|\n]/).length || 1);
    instanceInput.val(objectModel.get('name'));
  },
});
