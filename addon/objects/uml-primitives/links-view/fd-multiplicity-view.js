import { computed } from '@ember/object'
import $ from 'jquery';

import { RoleView } from './fd-role-view';

export let MultiplicityView = RoleView.extend({
  template: [
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input" value="" />',
    '<input type="text" class="start-role-input" value="" />',
    '<input type="text" class="end-role-input" value="" />',
    '<input type="text" class="start-multiplicity-input" value="" />',
    '<input type="text" class="end-multiplicity-input" value="" />',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  updateInputsArray: computed(() => [
    '.description-input',
    '.start-role-input',
    '.end-role-input',
    '.start-multiplicity-input',
    '.end-multiplicity-input'
  ]).readOnly(),

  initialize: function() {
    RoleView.prototype.initialize.apply(this, arguments);

    // Prevent paper from handling pointerdown.
    this.$box.find('.start-multiplicity-input').on('input', function() {
      this.updateInputWidth('.start-multiplicity-input');
    }.bind(this));

    this.$box.find('.end-multiplicity-input').on('input', function() {
      this.updateInputWidth('.end-multiplicity-input');
    }.bind(this));

    this.$box.find('.start-multiplicity-input').on('change', function(evt) {
      let startMultiplicityText = $(evt.target).val();
      this.model.setLabelText('startMultiplicity', startMultiplicityText);
      this.paper.trigger('updaterepobj', this.model.get('objectModel'), 'startMultiplicity', startMultiplicityText);
    }.bind(this));

    this.$box.find('.end-multiplicity-input').on('change', function(evt) {
      let endMultiplicityText = $(evt.target).val();
      this.model.setLabelText('endMultiplicity', endMultiplicityText);
      this.paper.trigger('updaterepobj', this.model.get('objectModel'), 'endMultiplicity', endMultiplicityText);
    }.bind(this));

    // Initialize inputs values.
    let startMultiplicityInput = this.$box.find('.start-multiplicity-input');
    let endMultiplicityInput = this.$box.find('.end-multiplicity-input');
    startMultiplicityInput.val(this.model.getLabelText('startMultiplicity'));
    endMultiplicityInput.val(this.model.getLabelText('endMultiplicity'));
  },

  updateBox: function() {
    RoleView.prototype.updateBox.apply(this, arguments);

    this.updateInputPosition(3, '.start-multiplicity-input');
    this.updateInputPosition(4, '.end-multiplicity-input');
  }
});
