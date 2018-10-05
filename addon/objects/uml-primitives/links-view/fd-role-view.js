import Ember from 'ember';
import { DescriptionView } from './fd-description-view';

export let RoleView = DescriptionView.extend({
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
    '</div>'
  ].join(''),

  updateInputsArray: [
    '.description-input',
    '.start-role-input',
    '.end-role-input'
  ],

  initialize: function() {
    DescriptionView.prototype.initialize.apply(this, arguments);

    // Prevent paper from handling pointerdown.
    this.$box.find('.start-role-input').on('input', function() {
      this.updateBox();
    }.bind(this));

    this.$box.find('.end-role-input').on('input', function() {
      this.updateBox();
    }.bind(this));

    this.$box.find('.start-role-input').on('change', function(evt) {
      let inputText = this.normalizeRoleText(Ember.$(evt.target).val());
      Ember.$(evt.target).val(inputText);
      this.model.setLabelText('startRole', inputText);
    }.bind(this));

    this.$box.find('.end-role-input').on('change', function(evt) {
      let inputText = this.normalizeRoleText(Ember.$(evt.target).val());
      Ember.$(evt.target).val(inputText);
      this.model.setLabelText('endRole', inputText);
    }.bind(this));

    // Initialize inputs values.
    let startRoleInput = this.$box.find('.start-role-input');
    let endRoleInput = this.$box.find('.end-role-input');
    startRoleInput.val(this.model.getLabelText('startRole'));
    endRoleInput.val(this.model.getLabelText('endRole'));
  },

  updateBox: function() {
    DescriptionView.prototype.updateBox.apply(this, arguments);

    // Update inputs positions.
    let startRolePosition = this.getLabelCoordinates(this.model.get('labels')[3].position);
    let startRoleDelta = this.model.label(3).inverseTextDirection ? this.$box.find('.start-role-input').width() : 0;
    Ember.$(this.$box[2]).css({
      left: startRolePosition.x - 7 - startRoleDelta,
      top: startRolePosition.y - 10,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
    let endRolePosition = this.getLabelCoordinates(this.model.get('labels')[4].position);
    let endRoleDelta = this.model.label(4).inverseTextDirection ? this.$box.find('.end-role-input').width() : 0;
    Ember.$(this.$box[3]).css({
      left: endRolePosition.x - 7 - endRoleDelta,
      top: endRolePosition.y - 10,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
  }
});
