import Ember from 'ember';
import layout from '../templates/components/fd-attribute-table';

export default Ember.Component.extend({
  layout,
  classNames: ['row'],

  /**
    Table headers.

    @property tableView
    @type Array
    @default undefined
  */
  tableView: undefined,

  /**
    Button locale path.

    @property buttonCaption
    @type Array
    @default undefined
  */
  buttonCaption: undefined,

  /**
    Data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Array selected values.

    @property selectedValues
    @type Array
    @default Ember.A()
  */
  selectedValues: Ember.A(),

  actions: {

    /**
      Method create value from table.

      @method createValue
    */
    createValue() {
      this.sendAction('create');
    },

    /**
      Method delete value from table.

      @method deleteValue
    */
    deleteValue() {
      this.sendAction('delete');

      let selectedValues = this.get('selectedValues');
      selectedValues.forEach((value)=> value.deleteRecord());
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
    }
  }
});
