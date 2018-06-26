import Ember from 'ember';
import { getTreeNode } from '../../utils/fd-get-view-tree-node';

export default Ember.Route.extend({
  modelProjection: 'EditFormView',
  modelName: 'fd-dev-view',
  templateName: 'fd-view-edit-form',

  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

  detailInteractionService: Ember.inject.service('detail-interaction'),

  model: function() {
    let data = this.get('detailInteractionService').modelSelectedDetail;
    data.set('definition', Ember.A());

    let store = this.get('store');
    let devClass = this.get('detailInteractionService').modelCurrentAgregators[0];
    data.set('class', devClass);

    // Get attributes tree current class.
    let treeData = getTreeNode(store, devClass.id, 'node_', data);

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
  }
});
