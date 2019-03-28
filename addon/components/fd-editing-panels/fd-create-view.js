import Ember from 'ember';
import FdAttributesTree from '../../objects/fd-attributes-tree';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode, getDetailView } from '../../utils/fd-attributes-for-tree';
import layout from '../../templates/components/fd-editing-panels/fd-create-view';

export default Ember.Component.extend({
  layout,

  /**
    Service for managing the state of the application.

    @property appState
    @type AppStateService
  */
  appState: Ember.inject.service(),

  /**
    @property store
    @type Service
  */
  store: Ember.inject.service(),

  /**
    Classes data.

    @property model
    @type Object
  */
  model: undefined,

  /**
    View data.

    @property view
    @type Object
  */
  view: undefined,

  /**
    details data.

    @property detailsView
    @type Object
  */
  detailsView: undefined,

  /**
    tree data.

    @property tree
    @type Object
  */
  tree: Ember.computed('model.name', function() {
    let model = this.get('model');
    if (Ember.isNone(model)) {
      return null;
    }

    let store = this.get('store');

    // Get attributes tree current class.
    let dataForBuildTree = getDataForBuildTree(store, model.get('id'));

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
    let tree = Ember.A([
      FdAttributesTree.create({
        text: model.get('name'),
        type: 'class',
        id: 'class',
        idNode: model.get('id'),
        children: treeDetails,
        state: {
          opened: true
        }
      })
    ]);

    let detailView = getDetailView(dataForBuildTree.aggregations);
    this.set('detailsView', detailView);
    this.get('appState').reset();

    return tree;
  }),

  /**
    Method for load tree nodes.

    @method loadDataNode
  */
  loadDataNode: function(node, store) {
    let dataForBuildTree = getDataForBuildTree(store, node.get('idNode'));
    let childrenAttributes = getClassTreeNode(Ember.A(), dataForBuildTree.classes);
    let childrenNode = getAssociationTreeNode(childrenAttributes, dataForBuildTree.associations, node.get('id'));

    return childrenNode;
  }
});
