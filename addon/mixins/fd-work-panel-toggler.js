import Ember from 'ember';

export default Ember.Mixin.create({

  prevTab: Ember.A(),

  prevAttr: -1,

  configPanelTabsWidth: 58,

  actions: {

    toggleConfigPanel(currentTab, currentAttr = -1) {
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      let toggleconfigPanel = this.prevTab[0] === currentTab;
      if (currentAttr !== -1) {
        toggleconfigPanel = this.prevAttr === currentAttr && toggleconfigPanel;
        this.prevAttr = currentAttr;

        // Open the properties of the attribute in the edit panel.
        Ember.$('.ui.menu', configPanelSidebar).find('.item').tab('change tab', currentTab);
      }

      this.prevTab.setObjects([currentTab]);
      toggleconfigPanel = toggleconfigPanel || !configPanelSidebar.hasClass('visible');

      if (toggleconfigPanel) {
        configPanelSidebar.sidebar({
          closable: false,
          dimPage: false
        }).sidebar('toggle');
        configPanelSidebar.removeClass('overlay');
        this.send('workPlaceConfig');
      }

      Ember.run.next(function() {
        if (!configPanelSidebar.hasClass('visible')) {
          Ember.$('.ui.menu', configPanelSidebar).find('.item').removeClass('active');
        }
      });

    },

    workPlaceConfig(isMainSidebar = false) {
      let sidebar = Ember.$('.ui.sidebar.main.menu');
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      let sidebarVisible = sidebar.hasClass('visible');
      let configPanelSidebarVisible = configPanelSidebar.hasClass('visible');
      let configPanelTabsWidth = this.configPanelTabsWidth;

      if (isMainSidebar) {
        let routsNameWidthConfigPanel = ['fd-editform-constructor', 'fd-view-edit-form', 'fd-appstruct-form'];
        let showTabsPanel = routsNameWidthConfigPanel.includes(this.currentRouteName.split('.')[0]);
        configPanelTabsWidth = showTabsPanel ? this.configPanelTabsWidth : 0;
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
