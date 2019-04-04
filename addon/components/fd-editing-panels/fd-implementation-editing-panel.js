import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import FdUpdateBsValueMixin from '../../mixins/fd-editing-panels/fd-update-bs-value';
import FdUpdateAttributeValueMixin from '../../mixins/fd-editing-panels/fd-update-attribute-value';
import FdUpdateMethodeValueMixin from '../../mixins/fd-editing-panels/fd-update-method-value';
import layout from '../../templates/components/fd-editing-panels/fd-implementation-editing-panel';

export default Component.extend(
  FdUpdateBsValueMixin,
  FdUpdateAttributeValueMixin,
  FdUpdateMethodeValueMixin, {
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Table headers.

    @property tableClassStorageTypes
    @type Array
    @default undefined
  */
  tableClassStorageTypes: computed(() => (
    A([{
      columnCaption: 'components.fd-attribute-table.storage.name',
      columnProperty: 'connectionName',
      attrPlaceholder: 'components.fd-attribute-table.storage.name-placeholder',
      columnClass: 'three'
    },
    {
      columnCaption: 'components.fd-attribute-table.storage.string',
      columnProperty: 'connectionString',
      attrPlaceholder: 'components.fd-attribute-table.storage.string-placeholder',
      columnClass: 'four'
    },
    {
      columnCaption: 'components.fd-attribute-table.storage.type',
      columnProperty: 'storageType',
      columnClass: 'four',
      isDropDown: true,
      dropdownItems: ['1', '2', '3'],
      dropdownValue: null,
    }])
  )),

  /**
    Button locale path for ClassStorageTypesButton.

    @property classStorageTypesButton
    @type Object
  */
  classStorageTypesButton: computed(() => ({
    createBtn: 'components.fd-attribute-table.storage.create-btn',
    deleteBtn: 'components.fd-attribute-table.storage.delete-btn',
  })),


  /**
    Table headers for view.

    @property tableViewForView
    @type Array
  */
  tableViewForView: computed(() => (
    A([{
      columnCaption: 'components.fd-attribute-table.view.name',
      columnProperty: 'name',
      attrPlaceholder: 'components.fd-attribute-table.view.name-placeholder',
      columnClass: 'three'
    },
    {
      columnCaption: 'components.fd-attribute-table.view.description',
      columnProperty: 'description',
      attrPlaceholder: 'components.fd-attribute-table.view.description-placeholder',
      columnClass: 'four'
    }])
  )),

  /**
    Button locale path for view.

    @property viewButton
    @type Object
  */
  viewButton: computed(() => ({
    createBtn: 'components.fd-attribute-table.view.create-btn',
    deleteBtn: 'components.fd-attribute-table.view.delete-btn',
  })),


  actions: {

    /**
      Method create ClassStorageTypesButton from table.

      @method actions.createStorage
    */
    createStorage() {
      let store = this.get('store');
      let model = this.get('model');
      store.createRecord('fd-class-storage-type', {
        class: model
      });

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
