import Component from '@ember/component';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import layout from '../templates/components/fd-attribute-table';

export default Component.extend({
  layout,
  classNames: ['row'],

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
    Items for dropdowns.

    @property dropdownItemsObject
    @type Object
  */
  dropdownItemsObject: undefined,

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

  init() {
    this._super(...arguments);

    this.set('selectedValues', A());
  },

  actions: {

    /**
      Method create value from table.

      @method actions.createValue
    */
    createValue() {
      this.get('create')();
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
      Method for dropdown change.

      @method dropdownChangeValue
      @param {Object} model data.
      @param {Object} value selected value.
    */
    dropdownChangeValue(model, value) {
      let dropdownChange = this.get('dropdownChange');
      if (!isNone(dropdownChange)) {
        dropdownChange(model, value);
      }
    }
  }
});