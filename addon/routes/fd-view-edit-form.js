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
    let treeData = getTreeNode(store, idDevClass, 'node_', data);

    this.get('objectlistviewEventsService').setLoadingState('');

    return {
      view: data,
      tree: treeData.tree,
      detailsView: treeData.detailView
    };
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('routeName', this.get('routeName'));
    controller.set('parentRoute', this.get('router.url'));
  },

  actions:{
    didTransition() {
      Ember.$('#example .flexberry-content').css('padding-bottom', 0);
      Ember.$('.flexberry-content > .ui.main.container').css('margin-bottom', 0);
    }
  }
});
