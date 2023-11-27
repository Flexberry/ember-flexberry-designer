import FdBaseSheet from './fd-base-sheet';
import { isNone } from '@ember/utils';

import layout from '../../templates/components/fd-sheets/fd-view-sheet';

export default FdBaseSheet.extend({
  layout,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default 'view-sheet'
  */
  sheetComponentName: 'view-sheet',

  /**
    Value selected entity.

    @property model
    @type Object
  */
  model: undefined,

  /**
    Value selected view.

    @property selectedValue
    @type Object
  */
  selectedValue: undefined,

  /**
    Opening sheet.

     @method openSheet
     @param {String} sheetName Sheet's name.
     @param {Object} currentItem Current list item.
  */
  openSheet(sheetName, currentItem) {
    this.set('readonlyMode', true);
    this.set('selectedValue', currentItem);
    this.set('model', currentItem.get('class'));
  },

  /**
    Closing sheet.

     @method closeSheet
     @param {String} sheetName Sheet's name.
  */
  closeSheet() {
    let selectedValue = this.get('selectedValue');
    if (!isNone(selectedValue)) {
      this.set('readonlyMode', true);
      this.set('selectedValue', undefined);
    }
  },

  actions: {
    /**
      Save 'View'.

       @method actions.save
    */
    save() {
      let view = this.get('selectedValue');
      let stage = this.get('currentProjectContext').getCurrentStageModel();
      this.get('appState').loading();
      view.save().then(() => {
        stage.set('changeDate', new Date());

        return stage.save();
      })
      .then(() => {
        this.get('fdSheetService').successSaveModel(this.get('sheetComponentName'));
      })
      .catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Delete selected view.

      @method actions.delete
      @param {Boolean} confirmation
    */
    delete(confirmation) {
      if (isNone(confirmation)) {
        this.get('fdDialogService').showVerificationMessage(this.get('i18n').t('components.fd-modal-message-box.delete-text').toString(), this.get('actions.delete'), this);
        return;
      }

      let view = this.get('selectedValue');

      this.get('appState').loading();
      view.destroyRecord()
      .then(() => {
        this.set('selectedValue', undefined);
        this.get('fdSheetService').closeSheet(this.get('sheetComponentName'));
      })
      .catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    }
  }
});
