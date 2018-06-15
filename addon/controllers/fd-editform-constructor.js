import Ember from 'ember';

import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTab from '../objects/fd-editform-tab';
import FdEditformTabgroup from '../objects/fd-editform-tabgroup';

export default Ember.Controller.extend({
  queryParams: ['classId'],

  /**
    The current dragged row.

    @private
    @property _draggedRow
    @type FdEditformRow
  */
  _draggedRow: undefined,

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

    /**
      Set the current dragged row.

      @method actions.setDragRow
      @param {FdEditformRow} row New dragged row.
    */
    setDragRow(row) {
      this.set('_draggedRow', row);
    },

    /**
      Get the current dragged row.

      @method actions.getDragRow
      @return {FdEditformRow} The current dragged row or `null`.
    */
    getDragRow() {
      return this.get('_draggedRow');
    },

    /**
      Move the current dragged row above or below relative to the passed row.

      @param {FdEditformRow} row The row above or below which will be moved the current dragged row.
      @param {String} direction The direction of the row move, allowed values: 'up' or 'down'.
    */
    moveRow(row, direction) {
      let draggedRow = this.get('_draggedRow');
      if (this._findRowContainer(row, Ember.A([draggedRow])) === null) {
        let rows = this.get('model.controls');
        let draggedRowContainer = this._findRowContainer(draggedRow, rows);
        draggedRowContainer.removeObject(draggedRow);

        let rowContainer;
        let index = draggedRowContainer.indexOf(row);
        if (index === -1) {
          rowContainer = this._findRowContainer(row, rows);
          index = rowContainer.indexOf(row);
        } else {
          rowContainer = draggedRowContainer;
        }

        if (direction === 'down') {
          index = Math.min(rowContainer.get('length'), index + 1);
        }

        rowContainer.insertAt(index, draggedRow);
      }
    },
  },

  /**
    Looks for a container that contains the row.

    @method _findRowContainer
    @param {FdEditformRow} row The sought row.
    @param {Ember.Array} container The root container.
    @return {Ember.Array} The container that was found or `null`.
  */
  _findRowContainer(row, container) {
    let _container = null;
    if (container.indexOf(row) === -1) {
      let length = container.get('length');
      for (let i = 0; i < length; i++) {
        let controls = container.objectAt(i).get('controls');
        let length = controls.get('length');
        for (let i = 0; i < length; i++) {
          let control = controls.objectAt(i);
          if (control instanceof FdEditformGroup) {
            _container = this._findRowContainer(row, control.get('rows'));
            if (_container) {
              return _container;
            }
          }

          if (control instanceof FdEditformTabgroup) {
            let tabs = control.get('tabs');
            let length = tabs.get('length');
            for (let i = 0; i < length; i++) {
              _container = this._findRowContainer(row, tabs.objectAt(i).get('rows'));
              if (_container) {
                return _container;
              }
            }
          }
        }
      }
    } else {
      _container = container;
    }

    return _container;
  },
});
