import Component from '@ember/component';
import { inject as service } from '@ember/service';
import layout from '../templates/components/fd-sheet';

export default Component.extend({
  layout,
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
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**	
    Sheet component name.	
    @property sheetComponentName	
    @type String	
    @default ''	
  */	
  sheetComponentName: '',

  /**
    Flag: indicates whether to show toolbar.

    @property toolbarVisible
    @type Bool
  */
  toolbarVisible: true,

  /**
    Flag: indicates whether to not show button for new model.

    @property isNewModel
    @type Bool
  */
  isNewModel: false,

  init() {
    this._super(...arguments);

    this.set('classNames', ['fd-sheet', `${this.get('sheetComponentName')}`]);
    this.set('classNameBindings',
    [
      `fdSheetService.sheetSettings.visibility.${this.get('sheetComponentName')}:visible`,
      `fdSheetService.sheetSettings.expanded.${this.get('sheetComponentName')}:expand`,
    ]);
  },  

  actions: {
    /**
      Closing sheet action on close button.

      @method actions.closeSheet
    */
    closeSheet() {
      const sheetComponentName = this.get('sheetComponentName');
      this.get('fdSheetService').closeSheet(sheetComponentName);
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
