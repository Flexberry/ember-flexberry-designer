import { computed } from '@ember/object';
import $ from 'jquery';

import { RoleView } from './fd-role-view';

export let QualifiedView = RoleView.extend({
  template: [
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input" value="" />',
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
      this.model.setLabelText('qualified', $(evt.target).val());
    }.bind(this));

    // Initialize inputs values.
    let qualifiedInput = this.$box.find('.qualified-input');
    qualifiedInput.val(this.model.getLabelText('qualified'));
  },

  updateBox: function() {
    RoleView.prototype.updateBox.apply(this, arguments);

    this.updateInputPosition(5, '.qualified-input');
  }
});
