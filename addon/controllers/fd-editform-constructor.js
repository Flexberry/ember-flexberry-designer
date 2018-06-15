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

  configPanelTabsWidth: Ember.computed.alias('applicationController.configPanelTabsWidth'),

  actions: {

    toggleConfigPanel(currentTab) {
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      let configPanelSidebarVisible = configPanelSidebar.hasClass('visible');

      if (this.prevTab === currentTab || this.prevTab === undefined || !configPanelSidebarVisible) {
        let sidebar = Ember.$('.ui.sidebar.main.menu');

        configPanelSidebar.sidebar('toggle');

        configPanelSidebar.removeClass('overlay');
        let sidebarVisible = sidebar.hasClass('visible');

        if (!sidebarVisible) {
          if (configPanelSidebarVisible) {
            Ember.$('.pusher').css({ width: 'calc(100% - ' + this.get('configPanelTabsWidth') + 'px)', transform: 'translate3d(0, 0, 0)' });
          } else {
            Ember.$('.pusher').css({ width: 'calc(100% - ' + configPanelSidebar.width() + 'px)', transform: 'translate3d(0, 0, 0)' });
          }
        } else if (configPanelSidebarVisible) {
          let workPanel = sidebar.width() + this.get('configPanelTabsWidth');
          Ember.$('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)', transform: 'translate3d(' + sidebar.width() + 'px, 0, 0)' });
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
