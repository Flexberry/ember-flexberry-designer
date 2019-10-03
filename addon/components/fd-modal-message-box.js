import { isNone } from '@ember/utils';
import layout from '../templates/components/fd-modal-message-box';
import FlexberryDialogComponent from 'ember-flexberry/components/flexberry-dialog';

export default FlexberryDialogComponent.extend({
  layout,

  /**
    Flag: indicates whether to show modal button.

    @property isError
    @type Object
    @default false
  */
  isError: false,

  /**
    Sheet component name.

    @property sheetName
    @type String
  */
  sheetName: undefined,

  /**
      Initializes DOM-related component's properties.
    */
   didInsertElement() {
    this._super(...arguments);
    let dialog = this.get('_dialog');
    let newDialog = dialog.modal({
      onApprove: () => {
        let approve = this.get('approve');        
        let e = { closeDialog: true, target: this.get('_dialog') };

        if (!this.get('isError') && !isNone(approve)) {
          let sheetName = this.get('sheetName');
          if (typeof approve === 'function') {
            approve(true);
          } else if (typeof approve === 'object' && !isNone(approve[sheetName])) {
            approve[sheetName](true);
          }
        }

        return e.closeDialog;
      },
    });
  },
});
