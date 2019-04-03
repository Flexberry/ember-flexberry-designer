import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

/**
  Mixin with the support `View table` for controls in the edit form constructor.

  @class FdUpdateViewValueMixin
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Table headers for view.

    @property tableViewForView
    @type Array
  */
  tableViewForView: [
    {
      columnCaption: 'components.fd-attribute-table.view.name',
      columnProperty: 'name',
      attrPlaceholder: 'components.fd-attribute-table.view.name-placeholder',
    },
    {
      columnCaption: 'components.fd-attribute-table.view.description',
      columnProperty: 'description',
      attrPlaceholder: 'components.fd-attribute-table.view.description-placeholder',
    },
  ],

  /**
    Button locale path for view.

    @property viewButton
    @type Object
  */
  viewButton: {
    createBtn: 'components.fd-attribute-table.view.create-btn',
    deleteBtn: 'components.fd-attribute-table.view.delete-btn',
  },

  actions: {

    /**
      Method create view from table.

      @method actions.createView
    */
    createView() {
      let store = this.get('store');
      let model = this.get('model');
      let view = store.createRecord('fd-dev-view', {
        class: model
      });

      this.send('openViewSheet', view);
    },

    /**
      Method open view sheet.

      @method actions.openViewSheet
    */
    openViewSheet(selectView) {
      this.get('openViewSheetController')(selectView);
    }
  }
});
