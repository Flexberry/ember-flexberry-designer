import Component from '@ember/component';
import $ from 'jquery';
import { computed } from '@ember/object';
import layout from '../templates/components/fd-view-helper';

export default Component.extend({
  layout,
  tagName: '',

  /**
    Url video.

    @property url
    @type String
  */
  url: '',

  /**
    Position popup.

    @property position
    @type String
  */
  position: 'center',

  showHelper: computed('i18n.locale', function() {
    let locale = this.get('i18n.locale');

    return locale == 'ru';
  }),

  actions: {
    /**
      Open popup with video helper.

      @method actions.viewHelper
    */
    viewHelper(event) {
      let position = this.get('position');
      let popup = $(event.currentTarget.nextElementSibling);
      popup.popup({
        on: 'click',
        position: `bottom ${position}`,
        target: event.currentTarget,
      }).popup('show');
    }
  }
});
