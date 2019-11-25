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

  /**
    Flag: indicates whether to show all text.

    @property textVisible
    @type Bool
    @default false
  */
  textVisible: false,

  /**
    Flag: indicates whether to show button.

    @property allTextButtonShow
    @type Bool
  */
  allTextButtonShow: computed('i18n.locale', function() {
    this.$().removeClass('show');
    this.textVisible = false;

    let cardHeight = this.$().outerHeight();
    let textHeight = this.$('.content div').outerHeight();

    return textHeight > cardHeight;
  }),

  actions: {

    /**
      Method toggle card text.

      @method actions.showAllText
    */
    showAllText() {
      this.$().toggleClass('show');
      this.toggleProperty('textVisible');
    }
  }
});
