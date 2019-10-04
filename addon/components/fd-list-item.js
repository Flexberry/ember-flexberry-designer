import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
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
  */
  fdListItemActive: computed('model.active', function() {
    return this.get('model.active')
  }).readOnly(),

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
  fdSheetService: service(),

  init() {
    this._super(...arguments);

    this.get('fdSheetService').on('openSheetTriggered', this, function(sheetName, currentItem) {
      if (sheetName, currentItem === this) {
        this.set('model.active', true);
      }
    });
  },

  actions: {
    /**
      Opening sheet.

      @method openSheet
      @param {Object} currentItem Current list item.
    */
    openSheet(currentItem) {
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'), currentItem);
    }
  }
});
