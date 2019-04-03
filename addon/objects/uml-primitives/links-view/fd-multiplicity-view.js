import { computed } from '@ember/object'
import $ from 'jquery';

import { RoleView } from './fd-role-view';

export let MultiplicityView = RoleView.extend({
  template: [
    '<div class="input-buffer"></div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="start-role-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="end-role-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="start-multiplicity-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="end-multiplicity-input" value="" />',
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
      this.updateBox();
    }.bind(this));

    this.$box.find('.end-multiplicity-input').on('input', function() {
      this.updateBox();
    }.bind(this));

    this.$box.find('.start-multiplicity-input').on('change', function(evt) {
      this.model.setLabelText('startMultiplicity', $(evt.target).val());
    }.bind(this));

    this.$box.find('.end-multiplicity-input').on('change', function(evt) {
      this.model.setLabelText('endMultiplicity', $(evt.target).val());
    }.bind(this));

    // Initialize inputs values.
    let startMultiplicityInput = this.$box.find('.start-multiplicity-input');
    let endMultiplicityInput = this.$box.find('.end-multiplicity-input');
    startMultiplicityInput.val(this.model.getLabelText('startMultiplicity'));
    endMultiplicityInput.val(this.model.getLabelText('endMultiplicity'));
  },

  updateBox: function() {
    RoleView.prototype.updateBox.apply(this, arguments);

    // Update inputs positions.
    let startMultiplicityPosition = this.getLabelCoordinates(this.model.label(0).position);
    let startMultiplicityDelta = this.model.label(0).inverseTextDirection ? this.$box.find('.start-multiplicity-input').width() : 0;
    $(this.$box[4]).css({
      left: startMultiplicityPosition.x - 7 - startMultiplicityDelta,
      top: startMultiplicityPosition.y - 10,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
    let endMultiplicityPosition = this.getLabelCoordinates(this.model.label(1).position);
    let endMultiplicityDelta = this.model.label(1).inverseTextDirection ? this.$box.find('.end-multiplicity-input').width() : 0;
    $(this.$box[5]).css({
      left: endMultiplicityPosition.x - 7 - endMultiplicityDelta,
      top: endMultiplicityPosition.y - 10,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
  }
});
