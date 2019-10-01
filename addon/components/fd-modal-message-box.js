import Component from '@ember/component';
import { isNone } from '@ember/utils';
import layout from '../templates/components/fd-modal-message-box';

export default Component.extend({
  layout,

  /**
    Title text value.

    @property titleText
    @type String
  */
  titleText: undefined,

  /**
    Message text value.

    @property messageText
    @type String
  */
  messageText: undefined,

  /**
    Model component name.

    @property componentName
    @type String
  */
  componentName: undefined,

  /**
    Flag: indicates whether to show modal.

    @property show
    @type Object
    @default false
  */
  show: false,

  /**
    Flag: indicates whether to show modal button.

    @property isError
    @type Object
    @default false
  */
  isError: false,

  /**
    Sheet component name.

    @property sheetName
    @type String
  */
  sheetName: undefined,

  actions: {

    /**
      Approve button action.

      @method actions.onApprove
    */
    onApprove() {
      let approve = this.get('approve');
      if (!this.get('isError') && !isNone(approve)) {
        let sheetName = this.get('sheetName');
        if (typeof approve === 'function') {
          approve(true);
        } else if (typeof approve === 'object' && !isNone(approve[sheetName])) {
          approve[sheetName](true);
        }
      }

      this.set('show', false);
    },

    onDeny() {
      let deny = this.get('deny');
      if (!this.get('isError') && !isNone(deny)) {
        let sheetName = this.get('sheetName');
        if (typeof deny === 'function') {
          deny(true);
        } else if (typeof deny === 'object' && !isNone(deny[sheetName])) {
          deny[sheetName](true);
        }
      }

      this.set('show', false);
    },

    onHide() {
      let hide = this.get('hide');
      if (!this.get('isError') && !isNone(hide)) {
        let sheetName = this.get('sheetName');
        if (typeof hide === 'function') {
          hide(true);
        } else if (typeof hide === 'object' && !isNone(hide[sheetName])) {
          hide[sheetName](true);
        }
      }

      this.set('show', false);
    }
  }
});
