import Component from '@ember/component';
import layout from '../templates/components/fd-list-item';

export default Component.extend({
  layout,

  /**
    Model for list item.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Caption for list item.

    @property caption
    @type String
    @default ''
  */
  caption: '',

  /**
    Indicates is this list item active or not.

    @property fdListItemActive
    @type Boolean
    @default false
  */
  fdListItemActive: false,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: Ember.inject.service(),

  actions: {
    /**
      Opening sheet.

      @method openSheet
      @param {Object} currentItem Current list item.
    */
    openSheet(currentItem) {
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'), currentItem);
      this.set('fdListItemActive', true);
    }
  }
});
