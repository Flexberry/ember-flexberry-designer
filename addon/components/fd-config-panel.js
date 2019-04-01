
import Component from '@ember/component';
import $ from 'jquery';
import layout from '../templates/components/fd-config-panel';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';

export default Component.extend(FdWorkPanelToggler, {
  layout,

  title: '',

  didInsertElement() {
    let sidebar = $('.ui.sidebar.main.menu');
    if (!sidebar.hasClass('visible')) {
      $('.pusher').css({ width: 'calc(100% - ' + this.configPanelTabsWidth + 'px)' });
    } else {
      let workPanel = sidebar.width() + this.configPanelTabsWidth;
      $('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)' });
    }
  },

  willDestroyElement() {
    let sidebar = $('.ui.sidebar.main.menu');

    if (!sidebar.hasClass('visible')) {
      $('.pusher').css({ width: '100%' });
    } else {
      $('.pusher').css({ width: 'calc(100% - ' + sidebar.width() + 'px)' });
    }
  },
});
