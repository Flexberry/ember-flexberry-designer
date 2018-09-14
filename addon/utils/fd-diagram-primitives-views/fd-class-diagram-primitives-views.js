import Ember from 'ember';
import joint from 'npm:jointjs';

joint.shapes.flexberry.uml.ClassView = joint.dia.ElementView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<input type="text" class="class-name-input" value="" />',
    '<input type="text" class="class-stereotype-input" value="" />',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  inputSelectors: ['.class-name-input', '.class-stereotype-input'],

  initialize: function() {
    joint.dia.ElementView.prototype.initialize.apply(this, arguments);

    this.$box = Ember.$(this.template);

    // Prevent paper from handling pointerdown.
    this.$box.find('input').on('mousedown click', function(evt) {
      evt.stopPropagation();
    });

    this.$box.find('input').on('input', function() {
      this.updateInputWidth();
    }.bind(this));

    this.$box.find('.class-name-input').on('change', function(evt) {
      this.model.set('name', Ember.$(evt.target).val());
    }.bind(this));

    this.$box.find('.class-stereotype-input').on('change', function(evt) {
      let stereotype = this.normalizeStereotype(Ember.$(evt.target).val());
      this.$box.find('.class-stereotype-input').val(stereotype);
      this.model.set('stereotype', stereotype.slice(1, -1));
    }.bind(this));

    this.$box.find('.class-name-input').val(this.model.get('name'));
    this.$box.find('.class-stereotype-input').val(this.normalizeStereotype(this.model.get('stereotype')));

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);

    this.updateBox();
  },
  render: function() {
    joint.dia.ElementView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.updateBox();
    return this;
  },

  updateBox: function() {
    this.updateInputWidth();

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

  updateInputWidth: function() {
    let $buffer = this.$box.find('.input-buffer');
    let maxWidth = 0;
    this.inputSelectors.forEach((selector) => {
      let $input = this.$box.find(selector);
      $buffer.css('font-weight', $input.css('font-weight'));
      $buffer.text($input.val());
      $input.width($buffer.width());
      if ($input.width() > maxWidth) {
        maxWidth = $input.width();
      }
    }, this);

    let oldSize = this.model.get('size');
    this.model.set('size', { height: oldSize.height, width: maxWidth + 14 });
  },

  normalizeStereotype(stereotype) {
    if (stereotype.length > 0) {
      if (stereotype[0] !== String.fromCharCode(171)) {
        stereotype = String.fromCharCode(171) + stereotype;
      }

      if (stereotype[stereotype.length - 1] !== String.fromCharCode(187)) {
        stereotype = stereotype + String.fromCharCode(187);
      }
    }

    return stereotype;
  }
});
