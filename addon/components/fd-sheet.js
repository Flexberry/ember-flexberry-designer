import Component from '@ember/component';
import $ from 'jquery';
import { run } from '@ember/runloop';
import layout from '../templates/components/fd-sheet';

export default Component.extend({
  layout,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: Ember.inject.service(),

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
      Closing sheet.

      @method actions.closeSheet
    */
    closeSheet() {
      let sheetComponentName = this.get('sheetComponentName');
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
    save() {
      this.sendAction('saveController');
    }
  }
});
