import Mixin from '@ember/object/mixin';
import { isNone } from '@ember/utils';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({

  /**
    Service for managing the state of the component.

    @property fdDialogService
    @type fdDialogService
  */
  fdDialogService: service('fd-dialog-service'),

  /**
    Item of sheet that opening was abort and must continue after confirm.

    @private
    @property _openingItem
    @type Object
    @default undefined
  */
  _openingItem: undefined,

  /**
    Flag activate confirm close dialog.

    @private
    @property show
    @type Boolean
    @default false
  */
  show: false,

  /**
    Type message box.

    @property isError
    @type Object
    @default false
  */
  isError: false,

  /**
    Message text value.

    @property messageText
    @type String
    @default undefined
  */
  messageText: undefined,

  /**
    Sheet component name.

    @property modalSheetName
    @type String
  */
  modalSheetName: undefined,

  /**
    Ember.observer, watching show flag and reset data in fd-heet-service.

    @method _showFlagObserver
  */
  _showFlagObserver: observer('show', function() {
    if (!this.get('show')) {
      this.get('fdSheetService').set('abortedTransitionFromSheet', undefined);
      this.set('modalSheetName', undefined);
      this.set('_openingItem', undefined);
    }
  }),

  init() {
    this._super(...arguments);
    this.get('fdSheetService').on('confirmCloseTrigger', this, this.showCloseDialog);
    this.get('fdDialogService').on('showErrorMessageTriggered', this, this.showErrorMessage);
  },

  /**
    Show error message.

    @method showErrorMessage
    @param {String} message Error message
  */
  showErrorMessage(message) {
    this.set('isError', true);
    this.set('messageText', message);
    this.set('show', true);
  },

  /**
    Show confirm close dialog when unsaved data exist on sheet.

    @method showCloseDialog
    @param {String} sheetName Sheet's dbName
    @param {Object} currentItem Current list item
  */
  showCloseDialog(sheetName, currentItem) {
    let sheetComponentName = this.get('sheetComponentName');
    if (sheetComponentName === sheetName) {
      this.set('isError', false);
      this.set('messageText', this.get('i18n').t('components.fd-modal-message-box.confirmation-text').toString());
      this.set('modalSheetName', sheetName);
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

  actions: {
    /**
      Button action close sheet without saving.

      @method actions.closeWithoutSaving
    */
    closeWithoutSaving() {
      const sheetName = this.get('modalSheetName')
      this.get('fdSheetService').rollbackCurrentItem(sheetName);
      this.confirmClose(sheetName);
    },

    /**
      Button action save and close sheet.

      @method actions.closeWithSaving
    */
    closeWithSaving() {

      // TODO переместить в контроллер.
      this.send('save', true);
    }
  }
});
