import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get, observer } from '@ember/object';
import { isNone } from '@ember/utils';
import { A } from '@ember/array';
import FdAttributesTree from '../../objects/fd-attributes-tree';
import FdViewAttributesProperty from '../../objects/fd-view-attributes-property';
import FdViewAttributesMaster from '../../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../../objects/fd-view-attributes-detail';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode, getDetailView } from '../../utils/fd-attributes-for-tree';
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
    Value search input.

    @property searchValue
    @type String
    @default ''
  */
  searchValue: '',

  /**
    Value search input for tree.

    @property searchTerm
    @type String
    @default ''
  */
  searchTerm: '',

  /**
    Value selected node.

    @property selectedNode
    @type Object
  */
  selectedNode: computed.alias('selectedNodes.firstObject'),

  /**
    Selected definition property.

    @property selectedPropery
    @type Object
  */
  selectedPropery: undefined,

  /**
    Type selected attribute for editing.

    @property selectedProperyType
    @type Object
  */
  selectedProperyType: undefined,

  /**
    View for details.

    @property detailsViewArray
    @type Array
  */
  detailsViewArray: undefined,

  /**
    Array View selectedPropery.

    @property detailView
    @type Array
  */
  detailView: computed('selectedPropery', function() {
    let selectedPropery = this.get('selectedPropery');
    if (!isNone(selectedPropery) && this.get('selectedProperyType') === 'isDetail') {
      let detailsViewArray = this.get('detailsViewArray');
      let detailViewByName = detailsViewArray.findBy('detailName', selectedPropery.name);
      let detailViewByRole = detailsViewArray.findBy('detailRole', selectedPropery.name);
      if (detailViewByName) {
        return  detailViewByName.detailViewNameItems;
      } else if (detailViewByRole) {
        return detailViewByRole.detailViewNameItems;
      }
    }

    return A();
  }),

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
    let treeEmpty = [

      // Attribute - choose all.
      FdAttributesTree.create({
        text: '*',
        name: '*',
        type: 'property',
      })
    ];

    let treeAttributes = getClassTreeNode(treeEmpty, dataForBuildTree.classes);
    let treeMasters = getAssociationTreeNode(treeAttributes, dataForBuildTree.associations, 'node_');
    let treeDetails = getAggregationTreeNode(treeMasters, dataForBuildTree.aggregations);
    this.setDetailView(dataForBuildTree.aggregations);
    this.get('appState').reset();

    return treeDetails;
  }),

  /**
    Clear propertys.

    @method viewObserver
  */
  viewObserver: observer('view', function() {
    this.set('selectedPropery', undefined);
    this.set('searchTerm', '');
    this.set('searchValue', '');
    let treeObject = this.get('treeObject');
    if (!isNone(treeObject)) {
      let tree = treeObject.jstree(true);
      tree.deselect_all();
      tree.close_all();
    }
  }),

  /**
    Set detailViewArray.

    @method setDetailView
  */
  setDetailView: function(aggregations) {
    let detailView = getDetailView(aggregations);
    this.set('detailsViewArray', detailView);
  },

  /**
    Method for load tree nodes.

    @method loadDataNode
  */
  loadDataNode: function(node, store) {
    let dataForBuildTree = getDataForBuildTree(store, get(node, 'idNode'));
    let childrenAttributes = getClassTreeNode(A(), dataForBuildTree.classes);
    let childrenNode = getAssociationTreeNode(childrenAttributes, dataForBuildTree.associations, get(node, 'id'));

    return childrenNode;
  },

  /**
    Create propertyName for view.

    @method createPropertyName
  */
  createPropertyName: function(selectedNode, jstree) {
    let parents = get(selectedNode, 'parents');
    let propertyName = '';
    if (parents.length > 1) {
      let indexParentID = parents.length - 2;

      while (indexParentID >= 0) {
        let parentID = parents[indexParentID];
        let parent = jstree.get_node(parentID);
        propertyName = propertyName + '.' + get(parent, 'original.name');
        indexParentID--;
      }

      propertyName = propertyName.slice(1) + '.' + get(selectedNode, 'original.name');
    } else {
      propertyName = get(selectedNode, 'original.name');
    }

    return propertyName;
  },

  actions: {

    /**
      Handle click button add node in definition.

      @method actions.addNodeInDefinition
    */
    addNodeInDefinition() {
      let node = this.get('selectedNode');
      if (isNone(node)) {
        return;
      }

      let view = this.get('view.definitionArray');

      // Create propertyName
      let propertyName = this.createPropertyName(node, this.get('treeObject').jstree(true));
      if (view.findBy('name', propertyName)) {
        return;
      }

      let newDdfinition;
      if (get(node, 'parents').length > 1) {
        newDdfinition = FdViewAttributesProperty.create({
          name: propertyName
        });
      } else {
        switch (get(node, 'type')) {
          case 'property':
            newDdfinition = FdViewAttributesProperty.create({
              name: propertyName
            });
            break;
          case 'master':
            newDdfinition = FdViewAttributesMaster.create({
              name: propertyName
            });
            break;
          case 'detail':
            newDdfinition = FdViewAttributesDetail.create({
              name: propertyName
            });
            break;
        }
      }

      view.pushObject(newDdfinition);
    },

    /**
      Resets 'masterPropertyName' and 'masterCustomizationString' if 'LookupType' is 'default'.

      @method actions.changeLookupType
      @param {Object} value An object with a new value in the `value` property.
    */
    changeLookupType(value) {
      if (value === 'default') {
        let selectedPropery = this.get('selectedPropery');
        selectedPropery.set('masterPropertyName', '');
        selectedPropery.set('masterCustomizationString', '');
      }
    },

    /**
      Delete item from definition.

      @method actions.deleteDefinitionItem
      @param {Object} item
    */
    deleteDefinitionItem(item) {
      this.get('view.definitionArray').removeObject(item);
      if (this.get('selectedPropery') === item) {
        this.set('selectedPropery', undefined);
      }
    },

    /**
      Change the order definition property.

      @method actions.changeOrderDefinition
      @param {Bool} up in up = true or is down = false.
    */
    changeOrderDefinition(up) {
      let selectedPropery = this.get('selectedPropery');
      if (isNone(selectedPropery)) {
        return;
      }

      let definitionArray = this.get('view.definitionArray');
      let curruntIndex = definitionArray.indexOf(selectedPropery);
      let newIndex;
      if (up) {
        newIndex = curruntIndex !== 0 ? curruntIndex - 1 : null;
      } else {
        newIndex = curruntIndex !== definitionArray.length - 1 ? curruntIndex + 1 : null;
      }

      if (isNone(newIndex)) {
        return;
      }

      let newIndexNode = definitionArray[newIndex];
      definitionArray.replace(curruntIndex, 1, A([newIndexNode]));
      definitionArray.replace(newIndex, 1, A([selectedPropery]));
    },
  }
});
