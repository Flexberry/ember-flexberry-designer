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
      Ember.run.next(function(){
        let sidebar = Ember.$('.ui.sidebar.main.menu');
        let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
        Ember.$('.menu .item', configPanelSidebar).tab();
        if (!sidebar.hasClass('visible') && !configPanelSidebar.hasClass('visible') ) {
          Ember.$('.pusher').css({ width: '100%', transform: 'translate3d(0, 0, 0)' });
        }
        else if (sidebar.hasClass('visible') && !configPanelSidebar.hasClass('visible')) {
          Ember.$('.pusher').css({ width: 'calc(100% - ' + sidebar.width() + 'px)', transform: 'translate3d(' + sidebar.width() + 'px, 0, 0)' });
        } 
        else if (!sidebar.hasClass('visible') && configPanelSidebar.hasClass('visible')){
          Ember.$('.pusher').css({ width: 'calc(100% - ' + configPanelSidebar.width() + 'px)', transform: 'translate3d(0, 0, 0)' });
        } 
        else {
          let workPanel = sidebar.width() + configPanelSidebar.width();
          Ember.$('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)', transform: 'translate3d(' + sidebar.width() + 'px, 0, 0)' });
        }
      })
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
