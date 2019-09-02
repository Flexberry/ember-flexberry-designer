import Component from '@ember/component';
import layout from '../templates/components/fd-drop-card';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property tagName
  */
  tagName: 'a',

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNames
  */
  classNames: ['ui', 'card', 'fluid'],

  allTextButtonShow: computed(function() {
    let cardHeight = this.$().outerHeight();
    let textHeight = this.$('.content div').outerHeight();

    return textHeight > cardHeight;
  }),

  actions: {
    showAllText() {
      this.$().toggleClass('show');
    }
  }
});
