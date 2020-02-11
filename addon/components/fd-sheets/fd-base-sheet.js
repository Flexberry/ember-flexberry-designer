import Component from '@ember/component';
import FdSaveHasManyRelationshipsMixin from '../../mixins/fd-save-has-many-relationships';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { assert } from '@ember/debug';

export default Component.extend(FdSaveHasManyRelationshipsMixin, {

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Service for managing the state of the application.

    @property appState
    @type AppStateService
  */
  appState: service(),

  /**
    @property store
    @type Service
  */
  store: service(),

  /**
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Service for managing the message dialog.

    @property fdDialogService
    @type fdDialogService
  */
  fdDialogService: service('fd-dialog-service'),

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Child sheet component name.

    @property nestedSheetName
    @type String
    @default ''
  */
  nestedSheetName: '',

  /**
    Flag: indicates whether sheet is readonly.

    @property readonlyMode
    @type Boolean
    @default true
   */
  readonlyMode: true,

  init() {
    this._super(...arguments);

    this.set('classNames', ['fd-sheet', `${this.get('sheetComponentName')}`]);
    this.set('classNameBindings',
    [
      `fdSheetService.sheetSettings.visibility.${this.get('sheetComponentName')}:visible`,
      `fdSheetService.sheetSettings.expanded.${this.get('sheetComponentName')}:expand`,
    ]);

    this.get('fdSheetService').on('openSheetTriggered', this, this.openSheetBase);
    this.get('fdSheetService').on('closeSheetTriggered', this, this.closeSheetBase);
    this.get('fdSheetService').on('saveCurrentItemTrigger', this, this.saveCurrentItemSheetBase);
  },

  willDestroy() {
    this._super(...arguments);

    this.get('fdSheetService').off('openSheetTriggered', this, this.openSheetBase);
    this.get('fdSheetService').off('closeSheetTriggered', this, this.closeSheetBase);
    this.get('fdSheetService').off('saveCurrentItemTrigger', this, this.saveCurrentItemSheetBase);
  },

  /**
    Opening sheet base method.

     @method openSheetBase
     @param {String} sheetName Sheet's name.
     @param {Object} currentItem Current list item.
  */
  openSheetBase(sheetName, currentItem) {
    let sheetComponentName = this.get('sheetComponentName');
    if (sheetComponentName === sheetName) {
      this.closeNestedSheet();
      this.openSheet(sheetName, currentItem);
    }
  },

  /**
    Closing sheet base method.

     @method closeSheetBase
     @param {String} sheetName Sheet's name.
  */
  closeSheetBase(sheetName) {
    let sheetComponentName = this.get('sheetComponentName');
    if (sheetComponentName === sheetName) {
      this.closeNestedSheet();
      this.closeSheet(sheetName);
    }
  },

  /**
    Closing nested sheet.

     @method closeNestedSheet
  */
  closeNestedSheet() {
    let nestedSheetName = this.get('nestedSheetName');
    if (!isBlank(nestedSheetName) && this.get('fdSheetService').isVisible(nestedSheetName)) {
      this.get('fdSheetService').closeSheet(nestedSheetName);
    }
  },

  /**
    Opening sheet.

     @method openSheet
     @param {String} sheetName Sheet's name.
     @param {Object} currentItem Current list item.
  */
  openSheet(sheetName) {
    assert(`Please specify 'openSheet' method for '${sheetName}' sheet compoenent`);
  },

  /**
    Closing sheet.

     @method closeSheet
     @param {String} sheetName Sheet's name.
  */
  closeSheet(sheetName) {
    assert(`Please specify 'closeSheet' method for '${sheetName}' sheet compoenent`);
  },

    /**
      Save currentItem.

       @method saveCurrentItemSheetBase
       @param {String} sheetName Sheet's component name
       @param {Boolean} closeAfter Close after save.
    */
  saveCurrentItemSheetBase(sheetName, closeAfter) {
    let sheetComponentName = this.get('sheetComponentName');
    if (sheetComponentName === sheetName) {
      this.send('save', closeAfter);
    }
  },

  actions: {
    /**
      Opening nested sheet.

       @method openNestedSheet
       @param {Object} object The object to edit.
    */
    openNestedSheet(object) {
      let nestedSheetName = this.get('nestedSheetName');
      if (!isBlank(nestedSheetName)) {
        this.get('fdSheetService').openSheet(nestedSheetName, object);
      }
    },
  }
});
