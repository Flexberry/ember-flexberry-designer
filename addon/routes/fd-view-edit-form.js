import Ember from 'ember';
import FdAttributesTree from '../objects/fd-attributes-tree';
import FdLoadingForTransitionMixin from '../mixins/fd-loading-for-transition';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode, getDetailView } from '../utils/fd-attributes-for-tree';

export default Ember.Route.extend(FdLoadingForTransitionMixin, {

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
    let dataForBuildTree = getDataForBuildTree(store, idDevClass);

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
        idNode: idDevClass,
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
  },

  actions:{
    didTransition() {
      Ember.$('#example .flexberry-content').css('padding-bottom', 0);
      Ember.$('.flexberry-content > .ui.main.container').css('margin-bottom', 0);
    }
  }
});