import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { set, computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import Builder from 'ember-flexberry-data/query/builder';
import FdUpdateBsValueMixin from '../../mixins/fd-editing-panels/fd-update-bs-value';
import FdUpdateAttributeValueMixin from '../../mixins/fd-editing-panels/fd-update-attribute-value';
import FdUpdateMethodeValueMixin from '../../mixins/fd-editing-panels/fd-update-method-value';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import layout from '../../templates/components/fd-editing-panels/fd-implementation-editing-panel';

export default Component.extend(
  FdUpdateBsValueMixin,
  FdUpdateAttributeValueMixin,
  FdUpdateMethodeValueMixin,
  FdReadonlyModeMixin, {
  layout,

  /**
    Store of current application.

    @property store
    @type DS.Store or subclass
  */
  store: service('store'),

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Storages arrays.

    @property storagesItems
    @type Object
  */
  storagesItems: undefined,

  /**
    Table headers.

    @property tableClassStorageTypes
    @type Array
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
      columnProperty: 'storageType.shortName',
      columnClass: 'four',
      isDropDown: true,
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

  storagesTableCaption: 'components.fd-attribute-table.storage.table-caption',

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

  viewsTableCaption: 'components.fd-attribute-table.view.table-caption',

  init() {
    this._super(...arguments);

    let _this = this;
    let store = this.get('store');
    let builder = new Builder(store)
      .from('fd-storage-type')
      .selectByProjection('ListFormView');

    store.query('fd-storage-type', builder.build()).then((storages) => {
      let storagesNames = storages.mapBy('shortName');
      storagesNames.unshift('');

      _this.set('storagesItems', {
        names: storagesNames,
        objects: storages,
      });
    });
  },

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
    },

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
      Method edit view.

      @method actions.createView
    */
    editView(view) {
      this.send('openViewSheet', view);
    },

    /**
      Method copy view.

      @method actions.copyView
    */
    copyView(view) {
      let store = this.get('store');
      let model = this.get('model');
      let newView = store.createRecord('fd-dev-view', {
        class: model,
        definition: view.get('definition'),
      });
      this.send('openViewSheet', newView);
    },

    /**
      Method open view sheet.

      @method actions.openViewSheet
    */
    openViewSheet(selectView) {
      this.get('openViewSheetController')(selectView);
    },

    /**
      Update storageType.

      @method actions.dropdownChangeStorage
    */
    dropdownChangeStorage(model, value) {
      if (isBlank(value)) {
        set(model, 'storageType', null);
      } else {
        let storagesItems = this.get('storagesItems');
        let storageObject = storagesItems.objects.findBy('shortName', value);
        set(model, 'storageType', storageObject);
      }
    },

    /**
      Changes AccessType.

      @method actions.changeAccessType
      @param {Object} value An object with a new value in the `checked` property.
    */
    changeAccessType(value) {
      this.set('model.accessType', value.checked ? 'this' : 'none');
    }
  }
});
