
import Ember from 'ember';
import layout from '../templates/components/fd-config-panel';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';

export default Ember.Component.extend(FdWorkPanelToggler, {
  layout,

  title: '',

  didInsertElement() {
    let sidebar = Ember.$('.ui.sidebar.main.menu');
    if (!sidebar.hasClass('visible')) {
      Ember.$('.pusher').css({ width: 'calc(100% - ' + this.configPanelTabsWidth + 'px)' });
    } else {
      let workPanel = sidebar.width() + this.configPanelTabsWidth;
      Ember.$('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)' });
    }

    Ember.run.schedule('afterRender', function() {
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      Ember.$('.menu .item', configPanelSidebar).tab();
    });
  },

  willDestroyElement() {
    let sidebar = Ember.$('.ui.sidebar.main.menu');

    if (!sidebar.hasClass('visible')) {
      Ember.$('.pusher').css({ width: '100%' });
    } else {
      Ember.$('.pusher').css({ width: 'calc(100% - ' + sidebar.width() + 'px)' });
    }
  },
});
