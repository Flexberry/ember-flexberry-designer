import Mixin from '@ember/object/mixin';
import { isNone } from '@ember/utils';

export default Mixin.create({
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
  */
  messageText: undefined,

  init() {
    this._super(...arguments);
    this.get('fdSheetService').on('showCloseDialogTrigger', this, this.showCloseDialog);
    this.get('fdSheetService').on('hideCloseDialogTrigger', this, this.hideCloseDialog);
  },

  /**
    Show confirm close dialog when unsaved data exist on sheet.

    @method showCloseDialog
  */
  showCloseDialog(sheetName) {
    this.set('isError', false);
    this.set('sheetName', sheetName);
    this.set('messageText', this.get('i18n').t('forms.fd-application-model.').toString());
    this.set('show', true);
  },

  /**
    Hide confirm close dialog.

    @method hideCloseDialog
  */
  hideCloseDialog() {
    const sheetService = this.get('fdSheetService');
    sheetService.set('abortedTransitionFromSheet', undefined);
    sheetService.set('openingItem', undefined);
    this.set('show', false);
  },

  /**
    Close sheet after save data/

     @method closeAfterSave
     @param {Boolean} close close after save
     @param {String} sheetName name of closing sheet
  */
  closeAfterSaveConfirm(close, sheetName) {
    if (close && !isNone(sheetName)) {
      this.get('fdSheetService').confirmClose(sheetName);
    }
  },

  actions: {
    /**
      Button action close sheet without saving.

      @method actions.closeWithoutSaving
    */
    closeWithoutSaving() {
      const sheetService = this.get('fdSheetService');
      const sheetName = this.get('sheetName');
      sheetService.rollbackCurrentItem(sheetName);
      sheetService.confirmClose(sheetName);
    },

    /**
      Close Dialog

      @method actions.closeDialog
    */
    closeDialog() {
      this.hideCloseDialog();
    }
  }
});
