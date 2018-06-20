import Ember from 'ember';

export default Ember.Mixin.create({

  prevTab: undefined,

  prevAttr: -1,

  applicationController: Ember.inject.controller('application'),

  configPanelTabsWidth: Ember.computed.alias('applicationController.configPanelTabsWidth'),

  actions: {

    toggleConfigPanel(currentTab, currentAttr = -1) {
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      let toggleconfigPanel;
      if (currentAttr !== -1) {
        toggleconfigPanel = this.prevAttr === currentAttr;
        this.prevAttr = currentAttr;

        // Open the properties of the attribute in the edit panel.
        Ember.$('.ui.menu', configPanelSidebar).find('.item').tab('change tab', 'control-properties');
      } else {
        toggleconfigPanel = this.prevTab === currentTab;
      }

      this.prevTab = currentTab;
      toggleconfigPanel = toggleconfigPanel || !configPanelSidebar.hasClass('visible');

      if (toggleconfigPanel) {
        configPanelSidebar.sidebar({
          closable: false,
          dimPage: false
        }).sidebar('toggle');
        configPanelSidebar.removeClass('overlay');
        this.send('workPlaceConfig');
      }
    },

    workPlaceConfig(isMainSidebar = false) {
      let sidebar = Ember.$('.ui.sidebar.main.menu');
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      let sidebarVisible = sidebar.hasClass('visible');
      let configPanelSidebarVisible = configPanelSidebar.hasClass('visible');
      let configPanelTabsWidth = this.get('configPanelTabsWidth');

      if (isMainSidebar) {
        let showTabsPanel = this.currentRouteName.split('.')[0] === 'fd-editform-constructor' || this.currentRouteName.split('.')[0] === 'fd-view-edit-form';
        configPanelTabsWidth = showTabsPanel ? this.get('configPanelTabsWidth') : 0;
        sidebarVisible = !sidebarVisible;
        configPanelSidebarVisible = !configPanelSidebarVisible;
      }

      if (!sidebarVisible) {
        if (configPanelSidebarVisible) {
          Ember.$('.pusher').css({ width: 'calc(100% - ' + configPanelTabsWidth + 'px)', transform: 'translate3d(0, 0, 0)' });
        } else {
          Ember.$('.pusher').css({ width: 'calc(100% - ' + configPanelSidebar.width() + 'px)', transform: 'translate3d(0, 0, 0)' });
        }
      } else if (configPanelSidebarVisible) {
        let workPanel = sidebar.width() + configPanelTabsWidth;
        Ember.$('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)', transform: 'translate3d(' + sidebar.width() + 'px, 0, 0)' });
      } else {
        let workPanel = sidebar.width() + configPanelSidebar.width();
        Ember.$('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)', transform: 'translate3d(' + sidebar.width() + 'px, 0, 0)' });
      }
    }
  }
});
