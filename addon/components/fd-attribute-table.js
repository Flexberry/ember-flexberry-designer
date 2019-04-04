import Component from '@ember/component';
import { A } from '@ember/array';
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
      this.get('delete')();

      let selectedValues = this.get('selectedValues');
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

      @method dropdownChange
      @param {Object} value selected value.
    */
    dropdownChange(value) {
    }
  }
});
