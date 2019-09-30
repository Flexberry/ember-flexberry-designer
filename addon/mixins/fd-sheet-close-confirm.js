import Mixin from '@ember/object/mixin';
import { isNone } from '@ember/utils';

export default Mixin.create({
  /**
    Flag activate confirm close dialog.

    @private
    @property _showConfirmDialog
    @type Boolean
    @default false
  */
  _showConfirmDialog: false,

  init() {
    this._super(...arguments);
    this.get('fdSheetService').on('showCloseDialogTrigger', this, this.showCloseDialog);
    this.get('fdSheetService').on('hideCloseDialogTrigger', this, this.hideCloseDialog);    
  },
  
  /**
    Show confirm close dialog when unsaved data exist on sheet.
    
    @method showCloseDialog
  */
  showCloseDialog() {
    this.set('_showConfirmDialog', true);
  },

  /**
    Hide confirm close dialog.
    
    @method hideCloseDialog
  */
  hideCloseDialog() {
    const sheetService = this.get('fdSheetService');
    sheetService.set('abortedTransitionFromSheet', undefined);
    sheetService.set('openingSheetName', '');
    sheetService.set('openingItem', undefined);
    this.set('_showConfirmDialog', false);
  },

  /**
    Save and close/

     @method saveSheet
  */
  saveAndClose() {
    const selectedElement = this.get('selectedElement');
    if (!isNone(selectedElement)) {
      this.send('save', true);
    }
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

      const selectedElement = this.get('selectedElement');
      const currentItemModel = selectedElement.get('model.data');
      currentItemModel.rollbackAttributes();

      const sheetName = selectedElement.get('sheetComponentName');
      sheetService.confirmClose(sheetName);
    },

    /**
      Button action save and close sheet.

      @method actions.closeWithSaving
    */
    closeWithSaving() {
      this.saveAndClose();
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
