import Ember from 'ember';

import FdDataTypes from '../utils/fd-datatypes';

export default Ember.Component.extend({
  _dataTypes: FdDataTypes.create(),

  _readonly: Ember.computed.empty('attribute'),

  types: Ember.computed(function() {
    return this.get('_dataTypes').fDTypes();
  }),

  allowNull: Ember.computed('attribute.notNull', {
    get() {
      return !this.get('attribute.notNull');
    },
    set(key, value) {
      return this.set('attribute.notNull', !value);
    },
  }),

  defaultValueControl: Ember.computed('attribute.type', function() {
    switch (this.get('attribute.type')) {
      default:
        return 'flexberry-textbox';
    }
  }),
});
