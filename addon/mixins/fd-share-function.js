import Mixin from '@ember/object/mixin';
import { later } from '@ember/runloop';
import $ from 'jquery';

export default Mixin.create({

  /**
    Flag indicates icon button.

    @property copied
    @type Bool
    @default false
  */
  copied: false,

  /**
    Copy value in clopboard.

    @method copyInClipboardValue
  */
  copyInClipboardValue(value) {
    // Create new element
    var el = document.createElement('textarea');

    // Set value (string to be copied), set non-editable to avoid focus and move outside of view
    el.value =  `${value}`;
    el.style = { display: 'none' };
    document.body.appendChild(el);

    // Select text inside element, copy text to clipboard and remove temporary element.
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  },

  /**
    Show sharw popup..

    @method showSharePopup
  */
  showSharePopup(event) {
    let sharePopup = $(event.currentTarget);
    sharePopup.popup({
      on: 'manual',
      inline: true,
      position: 'bottom center',
    }).popup('show');
    this.set('copied', true);
    later(this, (function() {
      sharePopup.popup('hide');
      this.set('copied', false);
    }), 2000);
  }
});
