import Service from '@ember/service';
import Evented from '@ember/object/evented';

export default Service.extend(Evented, {

  /**
    Trigger in mixin actions for show error message.

    @method showErrorMessage
    @param {String} message Error message
  */
  showErrorMessage(message) {
    this.trigger('showErrorMessageTriggered', message);
  },

  /**
    Trigger in mixin actions for show message.

    @method showCustomMessage
    @param {String} message message
    @param {String} header header

    @param {Boolean} visibleButtons visible buttons
    @param {String} approveButtonCaption approve caption
    @param {String} denyButtonCaption deny caption
    @param {function} approveButtonAction approve action
    @param {function} denyButtonAction deny action
    @param {Object} context context
  */
  showCustomMessage(message, header, visibleButtons, approveButtonCaption, denyButtonCaption, approveButtonAction, denyButtonAction, context) {
    this.trigger('showCustomMessageTriggered', message, header, visibleButtons, approveButtonCaption, denyButtonCaption, approveButtonAction, denyButtonAction, context);
  },

  /**
    Trigger in mixin actions for show verification message.

    @method showVerificationMessage
    @param {String} message Error message
    @param {function} action Approve action
    @param {Object} context context
  */
  showVerificationMessage(message, action, context) {
    this.trigger('showVerificationMessageTriggered', message, action, context);
  }
});
