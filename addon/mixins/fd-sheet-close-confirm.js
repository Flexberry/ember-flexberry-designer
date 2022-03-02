import Mixin from '@ember/object/mixin';
import { isNone } from '@ember/utils';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({

  /**
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Service for managing the state of the component.

    @property fdDialogService
    @type fdDialogService
  */
  fdDialogService: service('fd-dialog-service'),

  /**
    Router service of current application.

    @property router
    @type RouterService
  */
  router: service(),

  /**
    Item of sheet that opening was abort and must continue after confirm.

    @private
    @property _openingItem
    @type Object
    @default undefined
  */
  _openingItem: undefined,

  /**
    Sheet component name.

    @property closeSheetName
    @type String
  */
  closeSheetName: undefined,

  /**
    Flag activate confirm close dialog.

    @private
    @property show
    @type Boolean
    @default false
  */
  show: false,

  /**
    Visible button message box.

    @property visibleButtons
    @type Boolean
    @default false
  */
  visibleButtons: false,

  /**
    Header text value.

    @property headerCaption
    @type String
  */
  headerCaption: undefined,

  /**
    Message text value.

    @property messageText
    @type String
  */
  messageText: undefined,

  /**
    Component's approve button caption.

    @property approveButtonCaption
    @type String
    @default t('components.fd-modal-message-box.confirmation-approve')
  */
  approveButtonCaption: undefined,

  /**
    Component's approve button action.

    @property approveButtonAction
    @type Object
  */
  approveButtonAction: undefined,

  /**
    Component's deny button caption.

    @property denyButtonCaption
    @type String
    @default t('components.fd-modal-message-box.confirmation-deny')
  */
  denyButtonCaption: undefined,

  /**
    Component's deny button action.

    @property denyButtonAction
    @type Object
  */
  denyButtonAction: undefined,

  /**
    Context approve and deny action.

    @property context
    @type Object
  */
  context: undefined,

  /**
    Ember.observer, watching show flag and reset data in fd-heet-service.

    @method _showFlagObserver
  */
  _showFlagObserver: observer('show', function() {
    if (!this.get('show')) {
      this.get('fdSheetService').set('abortedTransitionFromSheet', undefined);
      this.set('closeSheetName', undefined);
      this.set('_openingItem', undefined);
    }
  }),

  init() {
    this._super(...arguments);

    this.get('fdSheetService').on('confirmCloseTrigger', this, this.showCloseDialog);
    this.get('fdDialogService').on('showErrorMessageTriggered', this, this.showErrorMessage);
    this.get('fdDialogService').on('showCustomMessageTriggered', this, this.showCustomMessage);
    this.get('fdDialogService').on('showVerificationMessageTriggered', this, this.showVerificationMessage);
  },

  willDestroy() {
    this._super(...arguments);

    this.get('fdSheetService').off('confirmCloseTrigger', this, this.showCloseDialog);
    this.get('fdDialogService').off('showErrorMessageTriggered', this, this.showErrorMessage);
    this.get('fdDialogService').off('showCustomMessageTriggered', this, this.showCustomMessage);
    this.get('fdDialogService').off('showVerificationMessageTriggered', this, this.showVerificationMessage);
  },

  /**
    Show error message.

    @method showErrorMessage
    @param {String} message Error message
  */
  showErrorMessage(message) {
    if (this.get('router.currentRouteName') === this.get('routeName')) {
      this.set('headerCaption', this.get('i18n').t('components.fd-modal-message-box.error-caption').toString());
      this.set('messageText', message);
      this.set('visibleButtons', false);
      this.set('approveButtonCaption', undefined);
      this.set('denyButtonCaption', undefined);
      this.set('approveButtonAction', undefined);
      this.set('denyButtonAction', undefined);
      this.set('context', undefined);

      this.set('show', true);
    }
  },

  /**
    Show custom message.

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
  showCustomMessage(message, header, visibleButtons = false, approveButtonCaption, denyButtonCaption, approveButtonAction, denyButtonAction, context) {
    if (this.get('router.currentRouteName') === this.get('routeName')) {
      this.set('headerCaption', header);
      this.set('messageText', message);
      this.set('visibleButtons', visibleButtons);
      if (!visibleButtons) {
        this.set('approveButtonCaption', undefined);
        this.set('denyButtonCaption', undefined);
        this.set('approveButtonAction', undefined);
        this.set('denyButtonAction', undefined);
        this.set('context', undefined);
      } else {
        this.set('approveButtonCaption', approveButtonCaption);
        this.set('denyButtonCaption', denyButtonCaption);
        this.set('approveButtonAction', approveButtonAction);
        this.set('denyButtonAction', denyButtonAction);
        this.set('context', context);
      }

      this.set('show', true);
    }
  },

  /**
    Show verification message.

    @method showVerificationMessage
    @param {String} message Message
    @param {function} action Approve action
    @param {Object} context context
  */
  showVerificationMessage(message, action, context) {
    if (this.get('router.currentRouteName') === this.get('routeName')) {
      this.set('headerCaption', this.get('i18n').t('components.fd-modal-message-box.confirmation-caption').toString());
      this.set('messageText', message);
      this.set('visibleButtons', true);
      this.set('approveButtonCaption', this.get('i18n').t('components.fd-modal-message-box.custom-approve').toString());
      this.set('denyButtonCaption', this.get('i18n').t('components.fd-modal-message-box.custom-deny').toString());
      this.set('approveButtonAction', action);
      this.set('denyButtonAction', function() {
        this.set('show', false);
      });
      this.set('context', context);

      this.set('show', true);
    }
  },

  /**
    Show confirm close dialog when unsaved data exist on sheet.

    @method showCloseDialog
    @param {String} sheetName Sheet's dbName
    @param {Object} currentItem Current list item
  */
  showCloseDialog(sheetName, currentItem) {
    if (this.get('router.currentRouteName') === this.get('routeName')) {
      this.set('headerCaption', this.get('i18n').t('components.fd-modal-message-box.confirmation-caption').toString());
      this.set('messageText', this.get('i18n').t('components.fd-modal-message-box.confirmation-text').toString());
      this.set('visibleButtons', true);
      this.set('approveButtonCaption', this.get('i18n').t('components.fd-modal-message-box.confirmation-approve').toString());
      this.set('denyButtonCaption', this.get('i18n').t('components.fd-modal-message-box.confirmation-deny').toString());
      this.set('approveButtonAction', this.get('closeWithSaving'));
      this.set('denyButtonAction', this.get('closeWithoutSaving'));
      this.set('context', this);

      this.set('closeSheetName', sheetName);
      this.set('_openingItem', currentItem);

      this.set('show', true);
    }
  },

  /**
    Close sheet when it confirmed.

    @method confirmClose
    @param {String} sheetName Sheet's dbName
  */
  confirmClose(sheetName) {
    const sheetService = this.get('fdSheetService');
    const openingItem = this.get('_openingItem');

    if (!isNone(openingItem)) {
      sheetService.openSheet(sheetName, openingItem);
    } else  {
      sheetService.closeSheet(sheetName);
    }

    this.set('show', false);
  },

  /**
    Button method close sheet without saving.

    @method closeWithoutSaving
  */
  closeWithoutSaving() {
    const sheetName = this.get('closeSheetName')
    this.get('fdSheetService').rollbackCurrentItem(sheetName);
    this.confirmClose(sheetName);
  },

  /**
    Button method save and close sheet.

    @method closeWithSaving
  */
  closeWithSaving() {
    const sheetName = this.get('closeSheetName')
    this.get('fdSheetService').saveCurrentItem(sheetName, true);
  },

  actions: {

    /**
      Button approve action.

      @method approveAction
    */
    approveAction() {
      let action = this.get('approveButtonAction');
      if (!isNone(action)) {
        let context = this.get('context') || this;
        action.apply(context, [true]);
      }
    },

    /**
      Button deny action.

      @method denyAction
    */
    denyAction() {
      let action = this.get('denyButtonAction');
      if (!isNone(action)) {
        let context = this.get('context') || this;
        action.apply(context);
      }
    }
  }
});
