import Mixin from '@ember/object/mixin';
import { isNone } from '@ember/utils';
import { observer } from '@ember/object';

export default Mixin.create({
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
    Ember.observer, watching show flag and reset data in fd-heet-service.

    @method _showFlagObserver
  */
  _showFlagObserver: observer('show', function() {
    const show = this.get('show');
    if (!show) {
      const sheetService = this.get('fdSheetService');
      sheetService.set('abortedTransitionFromSheet', undefined);
    }
  }),

  init() {
    this._super(...arguments);
    this.get('fdSheetService').on('confirmCloseTrigger', this, this.showCloseDialog);
  },

  /**
    Show confirm close dialog when unsaved data exist on sheet.

    @method showCloseDialog
     @param {String} sheetName Sheet's dbName
     @param {Object} currentItem Current list item
  */
  showCloseDialog(sheetName, currentItem) {    
    const sheetComponentName = this.get('sheetComponentName');

    if (sheetComponentName === sheetName) {
      this.set('isError', false);
      this.set('sheetName', sheetName);
      const openingItem = (this.get('selectedElement') !== currentItem) ? currentItem : undefined;
      this.set('_openingItem', openingItem);
    
      this.set('show', true);
    }
  },

  /**
    Close sheet when it confirmed.

     @method confirmClose
  */
  confirmClose() {
    const sheetName = this.get('sheetComponentName');
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
    Close sheet after save data/

     @method closeAfterSaveConfirm
  */
  closeAfterSaveConfirm() {
    this.confirmClose();
  },

  actions: {
    /**
      Button action close sheet without saving.

      @method actions.closeWithoutSaving
    */
    closeWithoutSaving() {
      const sheetService = this.get('fdSheetService');
      const sheetName = this.get('sheetComponentName');
      sheetService.rollbackCurrentItem(sheetName);
      this.confirmClose();
    },

    /**
      Button action save and close sheet.

      @method actions.closeWithSaving
    */
    closeWithSaving() {
      this.send('close', true);
    },

    /**
      Button action close confirm dialog.

      @method actions.closeDialog
    */
    closeDialog() {
      this.set('show', false);
    }
  }
});
