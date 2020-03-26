import { computed } from '@ember/object';
import $ from 'jquery';

import { RoleView } from './fd-role-view';

export let QualifiedView = RoleView.extend({
  template: [
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input underline-text" value="" />',
    '<input type="text" class="start-role-input" value="" />',
    '<input type="text" class="end-role-input" value="" />',
    '<input type="text" class="qualified-input" value="" />',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  updateInputsArray: computed(() => [
    '.description-input',
    '.start-role-input',
    '.end-role-input',
    '.qualified-input'
  ]).readOnly(),

  initialize: function() {
    RoleView.prototype.initialize.apply(this, arguments);

    // Prevent paper from handling pointerdown.
    this.$box.find('.qualified-input').on('input', function() {
      this.updateInputWidth('.qualified-input');
    }.bind(this));

    this.$box.find('.qualified-input').on('change', function(evt) {
      const qualifiedText = $(evt.target).val();
      this.triggerHistoryStep('qualified', qualifiedText);
      this.model.setLabelText('qualified', qualifiedText);
    }.bind(this));

    // Initialize inputs values.
    let qualifiedInput = this.$box.find('.qualified-input');
    qualifiedInput.val(this.model.getLabelText('qualified'));
  },

  updateBox: function() {
    RoleView.prototype.updateBox.apply(this, arguments);

    this.updateInputPosition(5, '.qualified-input');
  },

  updateInputValue() {
    RoleView.prototype.updateInputValue.apply(this, arguments);
    this.updateInputWidth('.qualified-input');
  },

  setInputValues() {
    RoleView.prototype.setInputValues.apply(this, arguments);

    let objectModel = this.model.get('objectModel');
    let qualifiedInput = this.$box.find('.qualified-input');

    qualifiedInput.prop('rows', objectModel.get('qualified').split(/[\n\r|\r|\n]/).length || 1);
    qualifiedInput.val(objectModel.get('qualified'));
  }
});
