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

  /**
    Item of sheet that opening was abort and must continue after confirm.

    @property _openingItem
    @type Object
    @default undefined
  */
  openingItem: undefined,

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
    let sheetComponentName = this.get('sheetComponentName');

    if (sheetComponentName === sheetName) {
      this.set('isError', false);
      this.set('messageText', this.get('i18n').t('forms.fd-application-model.').toString());

      this.set('sheetName', sheetName);
      const openingItem = (this.get('selectedElement') !== currentItem) ? currentItem : undefined;
      this.set('openingItem', openingItem);
    
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
    sheetService.set('_originJsonDiagramData', undefined);
    const openingItem = this.get('openingItem');

    if (!isNone(openingItem)) {
      sheetService.openSheet(sheetName, openingItem);
    } else  {
      sheetService.closeSheet(sheetName);
    }
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
    }
  }
});
