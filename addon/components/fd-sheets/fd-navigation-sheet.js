import FdBaseSheet from './fd-base-sheet';
import { isNone } from '@ember/utils';
import { computed } from '@ember/object';

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
    Flag: indicates whether to show create editing panel.

    @property isAddMode
    @type Bool
    @default false
  */
  isAddMode: false,

  /**
    Custom buttons for `fd-sheets-tool-bar` on `fd-navigation-sheet` route.

    @property customButtons
    @type Array
  */
  customButtons: computed('i18n.locale', 'isAddMode', function() {
    let i18n = this.get('i18n');
    return [{
      buttonVisible: this.get('isAddMode'),
      buttonName: i18n.t('forms.fd-navigation.cancel'),
      buttonAction: 'isAddModeCancel',
    }]
  }),

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

    isAddModeCancel() {
      this.set('isAddMode', false);
    },

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
