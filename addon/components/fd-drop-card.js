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

  textVisible: false,

  allTextButtonShow: computed('i18n.locale', function() {
    let cardHeight = this.$().outerHeight();
    let textHeight = this.$('.content div').outerHeight();

    return textHeight > cardHeight;
  }),

  actions: {
    showAllText() {
      this.$().toggleClass('show');
      this.toggleProperty('textVisible');
    }
  }
});
