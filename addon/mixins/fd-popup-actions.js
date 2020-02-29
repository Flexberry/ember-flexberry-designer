/**
  @module ember-flexberry-designer
*/

import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export default Mixin.create({

  /**
    Namespace component.

    @property popupNamespace
    @type String
  */
  popupNamespace: undefined,

  /**
    Value in popup.

    @property groupValue
    @type Object
  */
  popupValue: undefined,

  /**
    Open popup on page.

    @method openPopup
    @param {jQuery} target parent for popup.
    @param {Object} value value for popup.
  */
  openPopup(target, value) {
    let popup = this._getPopup();
    if (popup.length === 0) {
      throw new Error('Popup does not exist on the page');
    }

    target.popup({
      popup: popup,
      on: 'manual'
    });
    popup.removeClass('hidden');
    popup.addClass('visible');

    let sheet = $('.fd-sheet.visible ');
    let sidebarWidth = $('.ui.sidebar.main.menu').width();
    popup.css({top: target.position().top, left:target.position().left - popup.width()/2 - sheet.position().left - sidebarWidth - 12 });

    let popupNamespace = this.get('popupNamespace');
    $(document).on(`mousedown.${popupNamespace}`, this.closePopup.bind(this));
    $('.fd-sheet-body').on(`scroll.${popupNamespace}`, this.closePopup.bind(this));

    this.set('popupValue', value);
  },

  /**
    Find popup element by 'popupNamespace'.

    @method _getPopup
    @return {jQuery} popup element.
  */
  _getPopup() {
    let popupNamespace = this.get('popupNamespace');
    let popup = $(`.custom.popup.${popupNamespace}`);

    return popup;
  },

  /**
    Close popup on page.

    @method closePopup
    @param {jQuery.Event} e
  */
  closePopup(e) {
    e.stopPropagation();

    let popupNamespace = this.get('popupNamespace');
    if (($(e.target).closest(`.custom.popup.${popupNamespace}`).length === 0) || ($(e.target).hasClass(`.ui.button.primary`))) {
      let popup = this._getPopup();
      popup.removeClass('visible');
      popup.addClass('hidden');

      this.set('popupValue', undefined);

      $(document).off(`mousedown.${popupNamespace}`);
      $('.fd-sheet-body').off(`scroll.${popupNamespace}`);
    }
  }
});
