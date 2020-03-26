import { isBlank } from '@ember/utils';
import $ from 'jquery';

import { DescriptionView } from './fd-description-view';

export let NormalizedDescriptionView = DescriptionView.extend({
  initialize: function() {
    DescriptionView.prototype.initialize.apply(this, arguments);

    this.$box.find('.description-input').on('focus', function(evt) {
      let description = this.normalizeDescription($(evt.target).val());
      $(evt.target).val(description.slice(1, -1));
      this.updateInputWidth('.description-input');
    }.bind(this));

    this.$box.find('.description-input').on('blur', function(evt) {
      this.showNormalizedDescriptionOnInput($(evt.target));
    }.bind(this));

    // Initialize inputs values.
    let descriptionInput = this.$box.find('.description-input');
    descriptionInput.val(this.model.getLabelText('description'));
    this.showNormalizedDescriptionOnInput(this.$box.find('.description-input'));

    this.model.on('remove', this.removeBox, this);
  },

  updateBox() {
    DescriptionView.prototype.updateBox.apply(this, arguments);
    this.showNormalizedDescriptionOnInput(this.$box.find('.description-input'));
  },

  normalizeDescription(description) {
    let beforeChar = String.fromCharCode(91);
    let afterChar = String.fromCharCode(93);
    let normalizedDescription = description.replace(new RegExp(`${'\\'+beforeChar}|${'\\'+afterChar}`, 'g'), '');
    if (!isBlank(normalizedDescription)) {
      if (normalizedDescription[0] !== beforeChar) {
        normalizedDescription = beforeChar + normalizedDescription;
      }

      if (normalizedDescription[normalizedDescription - 1] !== afterChar) {
        normalizedDescription = normalizedDescription + afterChar;
      }
    }

    return normalizedDescription;
  },

  showNormalizedDescriptionOnInput(element) {
    let descriptionText = element.val();
    let description = this.normalizeDescription(descriptionText);
    element.val(description);
    this.updateInputWidth('.description-input');
  }
});
