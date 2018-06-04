import Ember from 'ember';

import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTab from '../objects/fd-editform-tab';

export default Ember.Controller.extend({
  queryParams: ['classId'],

  /**
    @private
    @property _selecetedIsControl
    @readOnly
    @type Boolean
  */
  _selecetedIsControl: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformControl;
  }).readOnly(),

  /**
    @private
    @property _selecetedIsGroup
    @readOnly
    @type Boolean
  */
  _selecetedIsGroup: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformGroup;
  }).readOnly(),

  /**
    @private
    @property _selecetedIsTab
    @readOnly
    @type Boolean
  */
  _selecetedIsTab: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformTab;
  }).readOnly(),

  /**
    The selected control.

    @property selectedControl
    @type FdEditformControl|FdEditformGroup|FdEditformTab
  */
  selectedControl: undefined,

  actions: {
    close() {
      this.transitionToRoute('fd-appstruct-form');
    },

    toggleConfigPanel() {
      if (this.toggleProperty('configPanelState')) {
        this.transitionToRoute('fd-editform-constructor.form-config-panel');
      } else {
        this.transitionToRoute('fd-editform-constructor');
      }
    },

    /**
      Set the selected control.

      @method actions.selectControl
      @param {FdEditformControl|FdEditformGroup|FdEditformTab} control
    */
    selectControl(control) {
      this.set('selectedControl', control);
    },
  },
});
