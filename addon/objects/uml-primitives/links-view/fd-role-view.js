import { computed } from '@ember/object';
import $ from 'jquery';

import { DescriptionView } from './fd-description-view';
import { setLinkViewColors } from '../../../utils/fd-uml-colors';

export let RoleView = DescriptionView.extend({
  template: [
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input" value="" />',
    '<input type="text" class="start-role-input" value="" />',
    '<input type="text" class="end-role-input" value="" />',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  updateInputsArray: computed(() => [
    '.description-input',
    '.start-role-input',
    '.end-role-input'
  ]).readOnly(),

  initialize: function() {
    DescriptionView.prototype.initialize.apply(this, arguments);

    // Prevent paper from handling pointerdown.
    this.$box.find('.start-role-input').on('input', function() {
      this.updateInputWidth('.start-role-input');
    }.bind(this));

    this.$box.find('.end-role-input').on('input', function() {
      this.updateInputWidth('.end-role-input');
    }.bind(this));

    this.$box.find('.start-role-input').on('change', function(evt) {
      let inputText = this.normalizeRoleText($(evt.target).val());
      $(evt.target).val(inputText);
      this.model.setLabelText('startRole', inputText);
      this.updateInputWidth('.start-role-input');
      this.updateInputPosition(1, '.start-role-input');
      this.paper.trigger('checkexistelements', this.model.get('objectModel'), this);
    }.bind(this));

    this.$box.find('.end-role-input').on('change', function(evt) {
      let inputText = this.normalizeRoleText($(evt.target).val());
      $(evt.target).val(inputText);
      this.model.setLabelText('endRole', inputText);
      this.updateInputWidth('.end-role-input');
      this.updateInputPosition(2, '.end-role-input');
      this.paper.trigger('checkexistelements', this.model.get('objectModel'), this);
    }.bind(this));

    // Initialize inputs values.
    let startRoleInput = this.$box.find('.start-role-input');
    let endRoleInput = this.$box.find('.end-role-input');
    startRoleInput.val(this.model.getLabelText('startRole'));
    endRoleInput.val(this.model.getLabelText('endRole'));
  },

  updateBox: function() {
    DescriptionView.prototype.updateBox.apply(this, arguments);

    this.updateInputPosition(1, '.start-role-input');
    this.updateInputPosition(2, '.end-role-input');
    setLinkViewColors(this);
  },

  normalizeRoleText(text) {
    let condition = text[0] === '+' || text[0] === '-' || text[0] === '#';

    return condition ? text : '+' + text;
  }
});
