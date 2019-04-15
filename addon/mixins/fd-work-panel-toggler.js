import Mixin from '@ember/object/mixin';
import { run } from '@ember/runloop';
import { A } from '@ember/array';
import $ from 'jquery';

export default Mixin.create({

  prevTab: A(),

  prevAttr: -1,

  configPanelTabsWidth: 58,

  /**
    Name of the active tab.

    @property activeTab
    @type String
    @default 'none'
   */
  activeTab: 'none',

  actions: {

    toggleConfigPanel(currentTab, currentAttr = -1) {
      let configPanelSidebar = $('.ui.sidebar.config-panel');
      let toggleconfigPanel = this.prevTab[0] ? this.prevTab[0].dataTab === currentTab.dataTab : false;
      if (currentAttr !== -1) {
        toggleconfigPanel = this.prevAttr === currentAttr && toggleconfigPanel;
        this.prevAttr = currentAttr;

        // Open the properties of the attribute in the edit panel.
        this.set('activeTab', currentTab.dataTab);
        $('.ui.menu', configPanelSidebar).find('.item').tab('change tab', currentTab.dataTab);
      }

      this.prevTab.setObjects([currentTab]);
      toggleconfigPanel = toggleconfigPanel || !configPanelSidebar.hasClass('visible');

      if (toggleconfigPanel) {
        configPanelSidebar.sidebar('toggle');
        configPanelSidebar.removeClass('overlay');
        this.send('workPlaceConfig');

        // For reinit overflowed tabs.
        run.later(this, function () {
          $(window).trigger('resize');
        }, 500);
      }

      let _this = this;
      run.next(function () {
        if (!configPanelSidebar.hasClass('visible')) {
          _this.set('activeTab', 'none');
          $('.ui.menu', configPanelSidebar).find('.item').removeClass('active');
          $('.ui.form', configPanelSidebar).find('.tab').removeClass('active');
        }
      });
    },

    workPlaceConfig(isMainSidebar = false) {
      let sidebar = $('.ui.sidebar.main.menu');
      let configPanelSidebar = $('.ui.sidebar.config-panel');
      let sidebarVisible = sidebar.hasClass('visible');
      let configPanelSidebarVisible = configPanelSidebar.hasClass('visible');
      let configPanelTabsWidth = this.configPanelTabsWidth;

      if (isMainSidebar) {
        let routesWidthConfigPanel = ['fd-editform-constructor', 'fd-view-edit-form', 'fd-appstruct-form', 'fd-diagram-edit-form', 'fd-listform-constructor'];
        let showTabsPanel = routesWidthConfigPanel.includes(this.currentRouteName.split('.')[0]);
        configPanelTabsWidth = showTabsPanel ? this.configPanelTabsWidth : 0;
        sidebarVisible = !sidebarVisible;
        configPanelSidebarVisible = !configPanelSidebarVisible;
      }

      if (!sidebarVisible) {
        if (configPanelSidebarVisible) {
          $('.pusher').css({ width: 'calc(100% - ' + configPanelTabsWidth + 'px)', transform: 'translate3d(0, 0, 0)' });
        } else {
          $('.pusher').css({ width: 'calc(100% - ' + configPanelSidebar.width() + 'px)', transform: 'translate3d(0, 0, 0)' });
        }
      } else if (configPanelSidebarVisible) {
        let workPanel = sidebar.width() + configPanelTabsWidth;
        $('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)', transform: 'translate3d(' + sidebar.width() + 'px, 0, 0)' });
      } else {
        let workPanel = sidebar.width() + configPanelSidebar.width();
        $('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)', transform: 'translate3d(' + sidebar.width() + 'px, 0, 0)' });
      }
    }
  }
});
