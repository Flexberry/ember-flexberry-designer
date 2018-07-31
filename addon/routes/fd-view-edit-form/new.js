import Ember from 'ember';
import FdAttributesTree from '../../objects/fd-attributes-tree';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode, getDetailView } from '../../utils/fd-attributes-for-tree';

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
    let dataForBuildTree = getDataForBuildTree(store, devClass.id);

    // Set attributes tree.
    let treeEmpty = Ember.A([

      // Attribute - choose all.
      FdAttributesTree.create({
        text: '*',
        type: 'property',
      })
    ]);

    let treeAttributes = getClassTreeNode(treeEmpty, dataForBuildTree.classes);
    let treeMasters = getAssociationTreeNode(treeAttributes, dataForBuildTree.associations, 'node_');
    let treeDetails = getAggregationTreeNode(treeMasters, dataForBuildTree.aggregations);
    let detailView = getDetailView(dataForBuildTree.aggregations);
    let tree = Ember.A([
      FdAttributesTree.create({
        text: devClass.get('name'),
        type: 'class',
        id: 'class',
        idNode: devClass.id,
        children: treeDetails,
        copyChildren: treeDetails,
        state: {
          opened: true
        }
      })
    ]);

    this.get('objectlistviewEventsService').setLoadingState('');

    return {
      view: data,
      tree: tree,
      detailsView: detailView
    };
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('routeName', this.get('routeName'));
    controller.set('parentRoute', this.get('router.url'));
    controller.set('searchTerm', '');
  }
});
