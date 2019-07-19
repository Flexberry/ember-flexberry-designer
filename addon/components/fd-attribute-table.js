import Component from '@ember/component';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import layout from '../templates/components/fd-attribute-table';

export default Component.extend({
  layout,
  classNames: ['ui equal width grid fd-table'],

  /**
    Table headers.

    @property tableView
    @type Array
  */
  tableView: undefined,

  /**
    Button locale path.

    @property buttonCaption
    @type Array
  */
  buttonCaption: undefined,

  /**
    Data.

    @property model
    @type Object
  */
  model: undefined,

  /**
    Array selected values.

    @property selectedValues
    @type Array
    @default Ember.A()
  */
  selectedValues: undefined,

  /**
    Flag: indicates whether to show toolbar.

    @property toolbarVisible
    @type Bool
    @default true
  */
  toolbarVisible: true,

  /**
    Flag: indicates whether property is readonly.

    @property readonly
    @type Boolean
    @default false
   */
  readonly: false,

  /**
    Flag: indicates whether show edit button in row.

    @property editButtonInRow
    @type Boolean
    @default false
   */
  editButtonInRow: false,

  init() {
    this._super(...arguments);

    if (isNone(this.get('selectedValues'))) {
      this.set('selectedValues', A());
    }
  },

  actions: {

    /**
      Method create value from table.

      @method actions.createValue
    */
    createValue() {
      let createAction = this.get('create');
      if (!isNone(createAction)) {
        createAction();
      }
    },

    /**
      Method delete value from table.

      @method actions.deleteValue
    */
    deleteValue() {
      let selectedValues = this.get('selectedValues');
      let deleteAction = this.get('delete');
      if (!isNone(deleteAction)) {
        deleteAction(selectedValues);
      }

      selectedValues.forEach((value) => value.deleteRecord());
      selectedValues.clear();
    },

    /**
      Method select value from table.

      @method selectValue
      @param {Object} value selected value.
    */
    selectValue(value) {
      let selectedValues = this.get('selectedValues');
      if (selectedValues.includes(value)) {
        selectedValues.removeObject(value);
      } else {
        selectedValues.pushObject(value);
      }
    },

    /**
      Method edit value from table.

      @method editButtonInRowAction
      @param {Object} value value.
    */
    editButtonInRowAction(value) {
      let editAction = this.get('edit');
      if (!isNone(editAction)) {
        editAction(value);
      }
    }
  }
});
