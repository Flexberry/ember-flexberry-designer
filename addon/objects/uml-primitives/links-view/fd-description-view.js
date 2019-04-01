import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { isNone } from '@ember/utils';
import $ from 'jquery';

import joint from 'npm:jointjs';

export let DescriptionView = joint.dia.LinkView.extend({
  template: [
    '<div class="input-buffer"></div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input" value="" />',
    '</div>',
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
    joint.dia.LinkView.prototype.initialize.apply(this, arguments);

    this.$box = $(this.template);
    this.model.inputElements = this.$box;

    // Prevent paper from handling pointerdown.
    this.$box.find('input').on('mousedown click', function(evt) {
      evt.stopPropagation();
    });

    this.$box.find('.description-input').on('input', function() {
      this.updateBox();
    }.bind(this));

    this.$box.find('.description-input').on('change', function(evt) {
      this.model.setLabelText('description', $(evt.target).val());
    }.bind(this));

    // Initialize inputs values.
    let descriptionInput = this.$box.find('.description-input');
    descriptionInput.val(this.model.getLabelText('description'));

    this.model.on('change', this.updateBox, this);
    this.model.on('remove', this.removeBox, this);

    this.model.on('change:source', function() {
      let sourceElement = this.model.getSourceElement();
      if (sourceElement !== this.sourceElement) {
        if (!isNone(this.sourceElement)) {
          this.sourceElement.off('change:position change:size', this.updateBox, this);
        }

        if (!isNone(sourceElement)) {
          sourceElement.on('change:position change:size', this.updateBox, this);
        }

        this.sourceElement = sourceElement;
      }
    }, this);

    this.model.on('change:target', function() {
      let targetElement = this.model.getTargetElement();
      if (targetElement !== this.targetElement) {
        if (!isNone(this.targetElement)) {
          this.targetElement.off('change:position change:size', this.updateBox, this);
        }

        if (!isNone(targetElement)) {
          targetElement.on('change:position change:size', this.updateBox, this);
        }

        this.targetElement = targetElement;
      }
    }, this);

    this.sourceElement = this.model.getSourceElement();
    if (!isNone(this.sourceElement)) {
      this.sourceElement.on('change:position change:size', this.updateBox, this);
    }

    this.targetElement = this.model.getTargetElement();
    if (!isNone(this.targetElement)) {
      this.targetElement.on('change:position change:size', this.updateBox, this);
    }
  },

  render: function() {
    joint.dia.LinkView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.paper.on('blank:pointerdown link:pointerdown element:pointerdown', function() {
      this.$box.find('input').blur();
    }, this);
    this.updateBox();
    return this;
  },

  updateBox: function() {
    this.updateInputsWidth(this.updateInputsArray);

    // Update labels offset.
    let vertices = this.model.get('vertices') || [];
    let startPointA = this.getLabelCoordinates({ distance: 0, offset: 0 });
    let endPointB = this.getLabelCoordinates({ distance: 1, offset: 0 });
    let startPointB = vertices[0] || endPointB;
    let endPointA = vertices[vertices.length - 1] || startPointA;
    this.model.updateLabelsPositions(startPointA, startPointB, false);
    this.model.updateLabelsPositions(endPointA, endPointB, true);

    // Update inputs positions.
    let descriptionPosition = this.getLabelCoordinates(this.model.get('labels')[2].position);
    let descriptionWidth = this.$box.find('.description-input').width();
    $(this.$box[1]).css({
      left: descriptionPosition.x - 7 - descriptionWidth / 2,
      top: descriptionPosition.y - 10,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
  },

  removeBox: function() {
    this.$box.remove();
  },

  updateInputsWidth(inputSelectors) {
    let selectors = isArray(inputSelectors) ? inputSelectors : [inputSelectors];
    let $buffer = $(this.$box[0]);
    selectors.forEach((selector) => {
      let $input = this.$box.find(selector);
      $buffer.css('font-weight', $input.css('font-weight'));
      $buffer.text($input.val());
      $input.width($buffer.width() + 1);
    }, this);
  },

  normalizeRoleText(text) {
    let condition = text[0] === '+' || text[0] === '-' || text[0] === '#';

    return condition ? text : '+' + text;
  }
});
