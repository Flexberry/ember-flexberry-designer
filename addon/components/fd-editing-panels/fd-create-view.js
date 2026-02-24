import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get, observer } from '@ember/object';
import { isNone } from '@ember/utils';
import { A } from '@ember/array';
import { getOwner } from '@ember/application';
import FdAttributesTree from '../../objects/fd-attributes-tree';
import FdViewAttributesProperty from '../../objects/fd-view-attributes-property';
import FdViewAttributesMaster from '../../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../../objects/fd-view-attributes-detail';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode, getDetailView, getExternalTreeNode } from '../../utils/fd-attributes-for-tree';
import layout from '../../templates/components/fd-editing-panels/fd-create-view';
import $ from 'jquery';
import { next } from '@ember/runloop';

export default Component.extend(FdReadonlyModeMixin, {
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
    Value selected nodes.

    @property selectedNodesArray
    @type Object
  */
  selectedNodesArray: computed.alias('selectedNodes'),

  /**
    Selected definition property.

    @property selectedProperty
    @type Object
  */
  selectedProperty: A(),

  /**
    All properties of selected master.

    @property masterProperties
    @type Array
  */
  masterProperties: undefined,

  /**
    Type selected attribute for editing.

    @property selectedPropertyType
    @type Object
  */
  selectedPropertyType: undefined,

  /**
    View for details.

    @property detailsViewArray
    @type Array
  */
  detailsViewArray: undefined,

  /**
    Need for reinit masterProperties dropdown after chenge masterProperties list values.

    @property reInitMasterPropertiesDropdown
    @type Boolean
    @default true
  */

  reInitMasterPropertiesDropdown: true,

  /**
    Array View selectedProperty.

    @property detailView
    @type Array
  */
  detailView: computed('selectedProperty', function() {
    let selectedProperty = this.get('selectedProperty');
    if (selectedProperty.length === 1 && this.get('selectedPropertyType') === 'isDetail') {
      let detailsViewArray = this.get('detailsViewArray');
      let detailViewByName = detailsViewArray.findBy('detailName', selectedProperty.firstObject.name);
      let detailViewByRole = detailsViewArray.findBy('detailRole', selectedProperty.firstObject.name);
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
  tree: computed('model.name', 'model.attributes.@each.{hasDirtyAttributes,isNew}', function() {
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

    getExternalTreeNode(treeDetails, dataForBuildTree.externalParent, getOwner(this).lookup('adapter:application')).then(() => {
      const jstree = this.get('treeObject').jstree(true);
      jstree.refresh();
    });

    return treeDetails;
  }),

  /**
    Clear propertys.

    @method viewObserver
  */
  viewObserver: observer('view', function() {
    this.set('selectedProperty', A());
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
    Get sheet elements height.

    @method getElementsSheetHeight
  */
  getElementsSheetHeight() {
    let sheetHeaderToolbarHeight = $('.fd-sheet-header .fd-sheet-toolbar').outerHeight(true);
    let sheetHeaderHeight = $('.fd-sheet-header .form-header').outerHeight(true);
    let searchHeight = $('.fd-ember-jstree .field').outerHeight(true);

    // In Enterprise is no footer.
    let footerHeight = $('.ui.footer .flex-container').outerHeight(true) || 0;
    let elementsSheetHeight = sheetHeaderHeight + sheetHeaderToolbarHeight + footerHeight + searchHeight;
    this.set('elementsSheetHeight', elementsSheetHeight);
    $('.fd-view-table-attr .overflow-panel').css('max-height', `calc( 100vh - ${elementsSheetHeight}px)`);
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method didInsertElement
  */
  didInsertElement() {
    this._super(...arguments);
    this.getElementsSheetHeight();
    this.$('.fd-view-table-attr').closest('.fd-sheet-body').css('overflow', 'hidden');
  },

  /**
    Set overflow-panels height.

    @method selectedPropertyObserver
  */
  selectedPropertyObserver: observer('selectedProperty.length', 'selectedProperty.firstObject.lookupType', function() {
    if (this.get('selectedProperty.firstObject.lookupType') === 'standard') {
      this.setMasterProperties(this.get('selectedProperty'));
    }

    next(() => {
      let attrProp = $('.fd-attr-prop').outerHeight(true);
      let attrPropHeight = attrProp === undefined ? 0 : attrProp;
      let elementsSheetHeight = attrPropHeight + this.get('elementsSheetHeight');
      $('.fd-view-table-attr .overflow-panel').css('max-height', `calc( 100vh - ${elementsSheetHeight}px)`);
    });
  }),

  /**
    Sets available properties of selected master by its association in `masterPropertyName` dropdown

    @param {Object} property
    @returns
  */
  setMasterProperties(property) {
    if (isNone(property)) {
      return;
    }
    const store = this.get('store');
    const node = this.get('tree').find(node => node.name === property.get('name'));
    if (node) {
      let dataForBuildTree = getDataForBuildTree(store, node.idNode);
      let childrenAttributes = getClassTreeNode(A(), dataForBuildTree.classes);

      this.set('masterProperties', childrenAttributes.map(x => x.name));
    }

    // Need for reinit masterProperties dropdown after chenge masterProperties list values
    this.set('reInitMasterPropertiesDropdown', false);
    next(() => this.set('reInitMasterPropertiesDropdown', true));
  },

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
  _loadDataNode: function(node, store) {
    if (get(node, 'external')) {
      return getExternalTreeNode(A(), get(node, 'idNode'), getOwner(this).lookup('adapter:application'));
    }

    let dataForBuildTree = getDataForBuildTree(store, get(node, 'idNode'));
    let childrenAttributes = getClassTreeNode(A(), dataForBuildTree.classes);
    let childrenNode = getAssociationTreeNode(childrenAttributes, dataForBuildTree.associations, get(node, 'id'));

    return getExternalTreeNode(childrenNode, dataForBuildTree.externalParent, getOwner(this).lookup('adapter:application'));
  },

  loadDataNode: computed(function() {
    return this._loadDataNode.bind(this);
  }),

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

  /**
    Get index of selected property in definitions

    @method getIndexOfSelectedProperty
    @return {Number} index
  */
  getIndexOfSelectedProperty: function() {
    const selectedProperty = this.get('selectedProperty');
    const definitionArray = this.get('view.definitionArray');
    let index = -1;

    if (selectedProperty.length !== 1) {
      return index;
    }

    index = definitionArray.findIndex((definitionProperty) => definitionProperty.get('name') === selectedProperty.name);

    return index;
  },

  actions: {
    /**
      Clear value for next choosing was correct.

      @method actions.inputManuallyChanged
    */
    inputManuallyChanged() {
      this.set('selectedProperty.firstObject.masterPropertyName', '');
    },

    /**
      Handle click button add node in definition.

      @method actions.addNodeInDefinition
    */
    addNodeInDefinition() {
      let nodes = this.get('selectedNodesArray');

      if (isNone(nodes) || nodes.length === 0) {
        return;
      }

      let view = this.get('view.definitionArray');

      let newDefinitions = A();
      nodes.forEach((node) => {
        // Create propertyName
        let propertyName = this.createPropertyName(node, this.get('treeObject').jstree(true));

        if (view.findBy('name', propertyName)) {
          return;
        }

        let newDefinition;
        switch (get(node, 'type')) {
          case 'property':
            newDefinition = FdViewAttributesProperty.create({
              name: propertyName
            });
            break;
          case 'master':
            newDefinition = FdViewAttributesMaster.create({
              name: propertyName
            });
            break;
          case 'detail':
            newDefinition = FdViewAttributesDetail.create({
              name: propertyName
            });
            break;
        }

        newDefinitions.pushObject(newDefinition);
      });

      let indexOfSelectedProperty = this.getIndexOfSelectedProperty();

      if (indexOfSelectedProperty >= 0) {
        view.replace(indexOfSelectedProperty + 1, 0, newDefinitions);
      } else {
        view.pushObjects(newDefinitions);
      }
    },

    /**
      Resets 'masterPropertyName' and 'masterCustomizationString' if 'LookupType' is 'default'.

      @method actions.changeLookupType
      @param {Object} value An object with a new value in the `value` property.
    */
    changeLookupType(value) {
      if (value === 'default') {
        let selectedProperty = this.get('selectedProperty.firstObject');
        selectedProperty.set('masterPropertyName', '');
        selectedProperty.set('masterCustomizationString', '');
      }
    },

    /**
      Delete item from definition.

      @method actions.deleteDefinitionItem
      @param {Object} item
    */
    deleteDefinitionItem(item) {
      this.get('view.definitionArray').removeObject(item);
      let selectedProperty = this.get('selectedProperty');
      if (selectedProperty.includes(item)) {
        selectedProperty.remuveObject(item);
      }
    },

    /**
      Change the order definition property.

      @method actions.changeOrderDefinition
      @param {Bool} up in up = true or is down = false.
    */
    changeOrderDefinition(up) {
      let selectedProperties = this.get('selectedProperty');
      if (!selectedProperties || selectedProperties.length === 0) {
        return;
      }

      let definitionArray = this.get('view.definitionArray');
      let selectedIndices = selectedProperties.map(prop =>
        definitionArray.indexOf(prop)
      ).filter(index => index !== -1).sort((a, b) => a - b);

      if (selectedIndices.length === 0) {
        return;
      }

      if (up && selectedIndices[0] === 0) {
        return;
      }
      if (!up && selectedIndices[selectedIndices.length - 1] === definitionArray.length - 1) {
        return;
      }

      let newArray = definitionArray.slice();

      if (up) {
        // Двигаем вверх: обрабатываем от первого к последнему
        for (let i = 0; i < selectedIndices.length; i++) {
          let currentIndex = selectedIndices[i];
          let element = newArray[currentIndex];

          newArray.splice(currentIndex, 1);
          newArray.splice(currentIndex - 1, 0, element);
        }
      } else {
        // Двигаем вниз: обрабатываем от последнего к первому
        for (let i = selectedIndices.length - 1; i >= 0; i--) {
          let currentIndex = selectedIndices[i];
          let element = newArray[currentIndex];

          newArray.splice(currentIndex, 1);
          newArray.splice(currentIndex + 1, 0, element);
        }
      }

      this.set('view.definitionArray', A(newArray));
    }
  }
});
