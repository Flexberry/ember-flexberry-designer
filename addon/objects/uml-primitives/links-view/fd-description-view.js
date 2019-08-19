import { computed } from '@ember/object';
import joint from 'npm:jointjs';
import $ from 'jquery';

import { EmptyView } from './fd-empty-view';


export let DescriptionView = EmptyView.extend({
  template: [
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input" value="" />',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  updateInputsArray: computed(() => [
    '.description-input'
  ]).readOnly(),

  /**
    Link's source element.

    @property sourceElement
    @type Object
  */
  sourceElement: undefined,

  /**
    Link's target element.

    @property targetElement
    @type Object
  */
  targetElement: undefined,

  initialize: function() {
    EmptyView.prototype.initialize.apply(this, arguments);

    // Prevent paper from handling pointerdown.
    this.$box.find('input').on('mousedown click', function(evt) {
      evt.stopPropagation();
    });

    this.$box.find('.description-input').on('input', function() {
      this.updateInputWidth('.description-input');
      this.updateInputPosition(0, '.description-input', 0.5);
    }.bind(this));

    this.$box.find('.description-input').on('change', function(evt) {
      this.model.setLabelText('description', $(evt.target).val());
      this.paper.trigger('checkexistelements', this.model.get('objectModel'), this);
    }.bind(this));

    // Initialize inputs values.
    let descriptionInput = this.$box.find('.description-input');
    descriptionInput.val(this.model.getLabelText('description'));

    this.model.on('remove', this.removeBox, this);
  },

  render: function() {
    joint.dia.LinkView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.paper.on('blank:pointerdown link:pointerdown element:pointerdown', function() {
      this.$box.find('input:focus, textarea:focus').blur();
    }, this);
    this.updateBox();
    return this;
  },

  updateBox: function() {
    EmptyView.prototype.updateBox.apply(this, arguments);

    // Update labels offset.
    let vertices = this.model.get('vertices') || [];
    let startPointA = this.getLabelCoordinates({ distance: 0, offset: 0 });
    let endPointB = this.getLabelCoordinates({ distance: 1, offset: 0 });
    let startPointB = vertices[0] || endPointB;
    let endPointA = vertices[vertices.length - 1] || startPointA;
    this.model.updateLabelsPositions(startPointA, startPointB, false);
    this.model.updateLabelsPositions(endPointA, endPointB, true);

    this.updateInputPosition(0, '.description-input', 0.5);
  },

  updateInputPosition(index, selector, positionCoefficient = 1) {
    let position = this.getLabelCoordinates(this.model.label(index).position);
    let delta = this.model.label(index).inverseTextDirection ? this.$box.find(selector).width() : 0;
    $(this.$box.find(selector)).css({
      left: position.x - delta * positionCoefficient,
      top: position.y - 7,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
  },

  removeBox: function() {
    this.$box.remove();
  }
});
