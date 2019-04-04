import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import FdUpdateBsValueMixin from '../../mixins/fd-editing-panels/fd-update-bs-value';
import FdUpdateAttributeValueMixin from '../../mixins/fd-editing-panels/fd-update-attribute-value';
import FdUpdateMethodeValueMixin from '../../mixins/fd-editing-panels/fd-update-method-value';
import FdUpdateViewValueMixin from '../../mixins/fd-editing-panels/fd-update-view-value';
import layout from '../../templates/components/fd-editing-panels/fd-implementation-editing-panel';

export default Component.extend(
  FdUpdateBsValueMixin,
  FdUpdateAttributeValueMixin,
  FdUpdateMethodeValueMixin,
  FdUpdateViewValueMixin, {
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

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

  actions:{

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
    }
  }
});
