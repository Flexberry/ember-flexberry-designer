import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { isNone } from '@ember/utils';
import { A } from '@ember/array';
import FdAttributesTree from '../../objects/fd-attributes-tree';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode } from '../../utils/fd-attributes-for-tree';
import layout from '../../templates/components/fd-editing-panels/fd-create-view';

export default Component.extend({
  layout,

  /**
    Service for managing the state of the application.

    @property appState
    @type AppStateService
  */
  appState: service(),

  /**
    @property store
    @type Service
  */
  store: service(),

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
    tree data.

    @property tree
    @type Object
  */
  tree: computed('model.name', function() {
    let model = this.get('model');
    if (isNone(model)) {
      return null;
    }

    let store = this.get('store');

    // Get attributes tree current class.
    let dataForBuildTree = getDataForBuildTree(store, model.get('id'));

    // Set attributes tree.
    let treeEmpty = A([

      // Attribute - choose all.
      FdAttributesTree.create({
        text: '*',
        type: 'property',
      })
    ]);

    let treeAttributes = getClassTreeNode(treeEmpty, dataForBuildTree.classes, null, null, true);
    let treeMasters = getAssociationTreeNode(treeAttributes, dataForBuildTree.associations, 'node_', null, null, true);
    let treeDetails = getAggregationTreeNode(treeMasters, dataForBuildTree.aggregations, null, null, true);
    let tree = [
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
    ];

    this.get('appState').reset();

    return [].concat(treeDetails);
  }),

  /**
    Method for load tree nodes.

    @method loadDataNode
  */
  loadDataNode: function(node, store) {
    let dataForBuildTree = getDataForBuildTree(store, get(node, 'idNode'));
    let childrenAttributes = getClassTreeNode(A(), dataForBuildTree.classes, null, null, true);
    let childrenNode = getAssociationTreeNode(childrenAttributes, dataForBuildTree.associations, get(node, 'id'), null, null, true);

    return childrenNode;
  },

  /**
    Handle click button in node.

    @method handleButtonInNode
    @param {JQuery.Event} event
  */
  handleButtonInNode: function(event) {
    let idNode = get(event, 'data.id');
  }
});
