/**
  @module ember-flexberry-designer
*/

import { BaseObject } from './fd-uml-baseobject';
import FdUmlObject from './fd-uml-baseobject';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { isBlank } from '@ember/utils';
import $ from 'jquery';
import joint from 'npm:jointjs';

/**
  An object that describes an active state on an activity diagram

  @class FdUmlActiveState
  @extends FdUmlObject
*/
export default FdUmlObject.extend({

  /**
    Name on the active state element.

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
    Text on the active state element.

    @property state
    @type String
  */
  state: computed('primitive.Text.Text', {
    get() {
      return this.get('primitive.Text.Text');
    },
    set(key, value) {
      let stateTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Text.Text', stateTxt);
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
    return new ActiveState(properties);
  }
});

/**
  Defines the JointJS object, which represents a 'Active state' object in the UML diagram.

  @for FdUmlActiveState
  @class ActiveState
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let ActiveState = BaseObject.define('flexberry.uml.ActiveState', {});

joint.shapes.flexberry.uml.ActiveStateView = joint.shapes.flexberry.uml.BaseObjectView.extend({
   template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="state-input header-input" value="" rows="1" wrap="off"></textarea>',
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

    this.$box.find('.class-name-input').on('input', function (evt) {
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

    this.$box.find('.state-input').on('input', function (evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.updateRectangles();
    }.bind(this));

    this.$box.find('.state-input').on('focus', function(evt) {
      let state = this.normalizeState($(evt.target).val());
      this.$box.find('.state-input').val(state.slice(1, -1));
      this.updateRectangles();
    }.bind(this));
  
    this.$box.find('.state-input').on('blur', function(evt) {
      this.showNormalizedStateOnInput($(evt.target));
    }.bind(this));    
    
    this.updateInputValue();
    this.showNormalizedStateOnInput(this.$box.find('.state-input'));

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);
  },

  updateInputValue() {
    let objectModel = this.model.get('objectModel');
    let classNameInput = this.$box.find('.class-name-input');
    let stateInput = this.$box.find('.state-input');

    classNameInput.prop('rows', objectModel.get('name').split(/[\n\r|\r|\n]/).length || 1);
    classNameInput.val(objectModel.get('name'));
    stateInput.prop('rows', objectModel.get('state').split(/[\n\r|\r|\n]/).length || 1);
    stateInput.val(objectModel.get('state'));
  },

  normalizeState(state) {
    let beforeChar = String.fromCharCode(171);
    let afterChar = String.fromCharCode(187);
    let normalizedState = state.replace(new RegExp(`${beforeChar}|${afterChar}`, 'g'), '');
    if (!isBlank(normalizedState)) {
      if (normalizedState[0] !== beforeChar) {
        normalizedState = beforeChar + normalizedState;
      }

      if (normalizedState[normalizedState - 1] !== afterChar) {
        normalizedState = normalizedState + afterChar;
      }
    }

    return normalizedState;
  },

  showNormalizedStateOnInput(element) {
    let stateText = element.val();
    let state = this.normalizeState(stateText);
    let rows = stateText.split(/[\n\r|\r|\n]/);
    element.val(state);
    element.prop('rows', rows.length);
    this.updateRectangles();
  }
});
