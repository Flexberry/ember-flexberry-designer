import FdBaseSheet from './fd-base-sheet';
import { isNone } from '@ember/utils';

import layout from '../../templates/components/fd-sheets/fd-navigation-sheet';

export default FdBaseSheet.extend({
  layout,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default 'navigation-sheet'
  */
  sheetComponentName: 'navigation-sheet',

  /**
    Data.

    @property model
    @type Object
  */
  model: undefined,

  /**
    Forms.

    @property forms
    @type Object
  */
  forms: undefined,

  /**
    Value selected view.

    @property selectedValue
    @type Object
  */
  selectedValue: undefined,

  /**
    Custom button title.

    @property customButtonTitle
    @type String
    @default 'forms.fd-navigation.cancel'
  */
  customButtonTitle: 'forms.fd-navigation.cancel',

  /**
    Flag: indicates whether to show create editing panel.

    @property isAddMode
    @type Bool
    @default false
  */
  isAddMode: false,

  /**
    Opening sheet.

     @method openSheet
     @param {String} sheetName Sheet's name.
     @param {Object} currentItem Current list item.
  */
  openSheet(sheetName, currentItem) {
    this.set('isAddMode', false);
    this.set('selectedValue', currentItem);
  },

  /**
    Closing sheet.

     @method closeSheet
     @param {String} sheetName Sheet's name.
  */
  closeSheet() {
    const treeObject = this.get('treeObject');
    if (treeObject) {
      let jstree = treeObject.jstree(true);
      jstree.deselect_node(this.get('selectedValue'));
      const actionReceiver = this.get('actionReceiver');
      if (actionReceiver) {
        actionReceiver.send('redraw');
      }
    }
  },

  actions: {

    /**
      Delete 'selectedNode'.

      @method actions.delete
      @param {Boolean} confirmation
    */
    delete(confirmation) {
      if (isNone(confirmation)) {
        this.get('fdDialogService').showVerificationMessage(this.get('i18n').t('components.fd-modal-message-box.delete-text').toString(), this.get('actions.delete'), this);
        return;
      }

      let jstree = this.get('treeObject').jstree(true);
      let selectedNode = this.get('selectedValue');
      jstree.delete_node(selectedNode);

      this.get('save')();
      this.get('fdSheetService').closeSheet(this.get('sheetComponentName'));
      this.set('readonlyMode', true);
    }
  }
});
