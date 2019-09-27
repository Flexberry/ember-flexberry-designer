import Mixin from '@ember/object/mixin';

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
  
  actions: {
    /**
      Button action close sheet without saving.

      @method actions.closeWithoutSaving
    */
    closeWithoutSaving() {
      const sheetService = this.get('fdSheetService');
      const sheetname = sheetService.get('currentSheetName');
      const currentItemModel = sheetService.getSheetModel(sheetname);
      currentItemModel.rollbackAttributes();

      sheetService.confirmClose(sheetname);
    },

    /**
      Button action save and close sheet.

      @method actions.closeWithSaving
    */
    closeWithSaving() {
      const sheetService = this.get('fdSheetService');
      sheetService.closeWithSaving();
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
