import Ember from 'ember';
import { getTreeNode } from '../utils/fd-get-view-tree-node';

export default Ember.Route.extend({

  /**
   Service that triggers objectlistview events.

   @property objectlistviewEventsService
   @type {Class}
   @default Ember.inject.service()
   */
  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

  model: function(arg) {
    let store = this.get('store');

    // Get attribute view.
    var recordsView = store.peekAll('fd-dev-view');
    let data = recordsView.findBy('id', arg.id);

    // Get current class.
    let devClass = data.get('class');
    let idDevClass = devClass.get('id');

    // Get attributes tree current class.
    let tree = getTreeNode(store, idDevClass, 'node_', data);

    this.get('objectlistviewEventsService').setLoadingState('');

    return {
      view: data,
      tree: tree
    };
  },

  activate() {
    let sidebar = Ember.$('.ui.sidebar.main.menu');
    let configPanelTabsWidth = this.controllerFor(this.routeName).get('configPanelTabsWidth');
    if (!sidebar.hasClass('visible')) {
      Ember.$('.pusher').css({ width: 'calc(100% - ' + configPanelTabsWidth + 'px)' });
    } else {
      let workPanel = sidebar.width() + configPanelTabsWidth;
      Ember.$('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)' });
    }

    Ember.run.schedule('afterRender', function() {
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      Ember.$('.menu .item', configPanelSidebar).tab();
    });
  },

  deactivate() {
    let sidebar = Ember.$('.ui.sidebar.main.menu');

    if (!sidebar.hasClass('visible')) {
      Ember.$('.pusher').css({ width: '100%' });
    } else {
      Ember.$('.pusher').css({ width: 'calc(100% - ' + sidebar.width() + 'px)' });
    }
  }
});
