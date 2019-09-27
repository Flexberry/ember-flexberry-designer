import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import layout from '../templates/components/fd-sheet';

export default Component.extend({
  layout,

  /**
    Current transition from sheet.

    @private
    @property currentTransitionFromSheet
    @type Object
    @default undefined
  */
  _abortedTransitionFromSheet: undefined,

  /**
    Flag activate confirm close dialog.

    @private
    @property _showConfirmDialog
    @type Boolean
    @default false
  */
  _showConfirmDialog: false,

  /**
    Custom button visible.

    @property customButton
    @type Bool
  */
  customButtonVisible: false,

  /**
    Custom button title.

    @property customButton
    @type String
  */
  customButtonTitle: undefined,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  viewComponentName: '',

  /**
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Flag: indicates whether to show toolbar.

    @property toolbarVisible
    @type Bool
  */
  toolbarVisible: true,

  init() {
    this._super(...arguments);

    this.set('classNames', ['fd-sheet', `${this.get('sheetComponentName')}`]);
    this.set('classNameBindings',
    [
      `fdSheetService.sheetSettings.visibility.${this.get('sheetComponentName')}:visible`,
      `fdSheetService.sheetSettings.expanded.${this.get('sheetComponentName')}:expand`,
    ]);

    this.get('fdSheetService').on('transitionFromSheetTrigger', this, this.transitionFromSheet);
    this.get('fdSheetService').on('closeSheetAfterSaveTrigger', this, this.closeSheetAfterSave);
  },

  /**
    Show confirm close dialog when exist unsaved data on sheet.
    
    @method openConfirmUnsavedDialog
    @param {String} sheetName Sheet's dbName
  */
  openConfirmUnsavedDialog() {
    this.set('_showConfirmDialog', true);
  },

  /**
    Transition from opened sheet.

     @method closeSheet
     @param {Object} transition Sheet's component name
  */
  transitionFromSheet(transition, sheetName, viewName) {
    this.set('viewComponentName', viewName);
    const currentSheetName = this.get('sheetComponentName');

    if (currentSheetName == sheetName) {
      const isUnsavedData = this.findUnsavedSheetData();

      if (isUnsavedData) {
        transition.abort();
        this.set('_abortedTransitionFromSheet', transition);
        this.openConfirmUnsavedDialog();
      } else {
        this.closeSheetAndView();        
      }
    }
  },

  /**
    Close sheet when call save and close.

     @method closeSheetAfterSave
     @param {String} sheetName Sheet's component name
  */
  closeSheetAfterSave(sheetName) {
    const currentSheetName = this.get('sheetComponentName');

    if (currentSheetName == sheetName) {
      this.confirmClose();
    }
  },

  /**
    Close sheet when it confirmed.

     @method confirmClose
  */
  confirmClose() {
    const abortedTransition = this.get('_abortedTransitionFromSheet');

    if (!isNone(abortedTransition)) {
      abortedTransition.retry();
      this.closeSheetAndView();
    } else {
      this.send('closeSheet');
    }

    this.send('closeConfirmUnsavedDialog');
  },

  /**
    Close sheet and sheet view when transition is done.

     @method closeSheetAndView
  */
  closeSheetAndView() {
    this.get('fdSheetService').closeSheet(this.get('viewComponentName'));
    this.send('closeSheet');
  },

  /**
    Check if sheet has unsaved data.

     @method findUnsavedSheetData
  */
  findUnsavedSheetData() {
    const currentItemModel = this.getSheetModel();
    const isDirty = (isNone(currentItemModel)) ? false : currentItemModel.hasDirtyAttributes;

    return isDirty;
  },

  /**
    Get sheet model.

    @method getSheetModel
  */
  getSheetModel() {
    const sheetService = this.get('fdSheetService');
    const sheetName = this.get('sheetComponentName');
    const currentItemModel = sheetService.get(`sheetSettings.currentItem.${sheetName}.model.data`);

    return currentItemModel;
  },

  actions: {
    /**
      Closing sheet action on close button.

      @method actions.closeSheet
    */
    closeSheet() {
      const isUnsavedData = this.findUnsavedSheetData();

      if (isUnsavedData) {
        this.openConfirmUnsavedDialog();
      } else {
        const sheetComponentName = this.get('sheetComponentName');
        this.get('fdSheetService').closeSheet(sheetComponentName);        
      }
    },

    /**
      Button action close sheet without saving.

      @method actions.closeWithoutSaving
    */
    closeWithoutSaving() {
      const currentItemModel = this.getSheetModel();
      currentItemModel.rollbackAttributes();

      this.confirmClose();
    },

    /**
      Button action save and close sheet.

      @method actions.closeWithSaving
    */
    closeWithSaving() {
      this.send('save', true);    
    },

    /**
      Close unsaved data confirm dialog

      @method actions.closeConfirmUnsavedDialog
    */
    closeConfirmUnsavedDialog() {
      this.set('_abortedTransitionFromSheet', undefined);
      this.set('_showConfirmDialog', false);
    },

    /**
      Expanding sheet.

      @method actions.expand
    */
    expand() {
      let sheetComponentName = this.get('sheetComponentName');
      this.get('fdSheetService').expand(sheetComponentName);
    },

    /**
      Saving changes.

      @method actions.save
    */
    save(close) {
      this.get('saveController')(close)
    },

    /**
      Delete data.

      @method actions.delete
    */
    delete() {
      this.get('deleteController')();
    },

    /**
      Custom button action.

      @method actions.customButtonAction
    */
    customButtonAction() {
      this.get('customButtonController')();
    }
  }
});
