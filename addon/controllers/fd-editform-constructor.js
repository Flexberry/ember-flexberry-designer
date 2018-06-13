import Ember from 'ember';

import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTab from '../objects/fd-editform-tab';

export default Ember.Controller.extend({
  queryParams: ['classId'],

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

  prevTab: undefined,

  applicationController: Ember.inject.controller('application'),

  configPanrlTabsWidth: Ember.computed.alias('applicationController.configPanrlTabsWidth'),

  actions: {

    toggleConfigPanel(currentTab) {
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');

      if (this.prevTab === currentTab || this.prevTab === undefined || !configPanelSidebar.hasClass('visible')) {
        let sidebar = Ember.$('.ui.sidebar.main.menu');

        configPanelSidebar.sidebar({
          closable: false,
          dimPage: false,
        }).sidebar('toggle');

        configPanelSidebar.removeClass('overlay');

        if (!sidebar.hasClass('visible') && configPanelSidebar.hasClass('visible')) {
          Ember.$('.pusher').css({ width: 'calc(100% - ' + this.get('configPanrlTabsWidth') + 'px)', transform: 'translate3d(0, 0, 0)' });
        } else if (sidebar.hasClass('visible') && configPanelSidebar.hasClass('visible')) {
          let workPanel = sidebar.width() + this.get('configPanrlTabsWidth');
          Ember.$('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)', transform: 'translate3d(' + sidebar.width() + 'px, 0, 0)' });
        } else if (!sidebar.hasClass('visible') && !configPanelSidebar.hasClass('visible')) {
          Ember.$('.pusher').css({ width: 'calc(100% - ' + configPanelSidebar.width() + 'px)', transform: 'translate3d(0, 0, 0)' });
        } else {
          let workPanel = sidebar.width() + configPanelSidebar.width();
          Ember.$('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)', transform: 'translate3d(' + sidebar.width() + 'px, 0, 0)' });
        }
      }

      this.prevTab = currentTab;
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
