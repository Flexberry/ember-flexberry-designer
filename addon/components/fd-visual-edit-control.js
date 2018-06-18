import Ember from 'ember';

import FdDataTypes from '../utils/fd-datatypes';
import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTab from '../objects/fd-editform-tab';

export default Ember.Component.extend({
  enums: undefined,

  typemap: undefined,

  fbtypes: undefined,

  /**
    @private
    @property _selectedIsControl
    @readOnly
    @type Boolean
  */
  _selectedIsControl: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformControl;
  }).readOnly(),

  /**
    @private
    @property _selectedIsGroup
    @readOnly
    @type Boolean
  */
  _selectedIsGroup: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformGroup;
  }).readOnly(),

  /**
    @private
    @property _selectedIsTab
    @readOnly
    @type Boolean
  */
  _selectedIsTab: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformTab;
  }).readOnly(),

  /**
    The selected control.

    @property selectedControl
    @type FdEditformControl|FdEditformGroup|FdEditformTab
  */
  selectedControl: undefined,

  _dataTypes: FdDataTypes.create(),

  _readonly: Ember.computed.empty('selectedControl'),

  types: undefined,

  getAllTypes() {
    let typemap = this.get('typemap');
    let enums = this.get('enums');
    let fbtypes = this.get('fbtypes');
    let ret = Ember.A();
    for (let type of typemap) {
      ret.push(type.name);
    }

    for (let sEnum of enums.content) {
      ret.push(sEnum._data.caption);
    }

    for (let type of fbtypes.content) {
      ret.push(type._data.caption);
    }

    if (ret.length !== 0) {
      this.set('types', ret);
    } else {
      this.set('types', []);
    }

  },

  allowNull: Ember.computed('selectedControl.notNull', {
    get() {
      return !this.get('selectedControl.notNull');
    },

    set(key, value) {
      return this.set('selectedControl.notNull', !value);
    },
  }),

  defaultValueControl: Ember.computed('selectedControl.type', function() {
    switch (this.get('selectedControl.type')) {
      default:
        return 'flexberry-textbox';
    }
  }),

  init() {
    this._super(...arguments);
    this.getAllTypes();
  }
});
