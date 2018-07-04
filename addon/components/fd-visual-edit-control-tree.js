import Ember from 'ember';
import layout from '../templates/components/fd-visual-edit-control-tree';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import FdAttributesTree from '../objects/fd-attributes-tree';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode } from '../utils/fd-attributes-for-tree';

export default Ember.Component.extend({
  layout,

  /**
    Model view.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Selected item for change.

    @property selectedItem
  */
  selectedItem: undefined,

  /**
    Flag: indicates whether to show attributesTree or typesTree .

    @property treeViewMode
  */
  treeViewMode: true,

  /**
    Name for create new properties.

    @property propertyName
  */
  propertyName: undefined,

  /**
    Old name for edit properties.

    @property oldPropertyName
  */
  oldPropertyName: undefined,

  readonly: false,

  view: '',

  /*
    Setting off for buttons of the tree.
  */
  editAttributeDisabled: 'disabled',
  removeAttributeDisabled: 'disabled',
  applyAttributeDisabled: 'disabled',
  applyTypeDisabled: 'disabled',

  /**
    @property store
    @type Service
  */
  store: Ember.inject.service(),

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
   */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),
  /**
    Data for jsTree.

    @property dataAttributesTree
    @type Array
    @default []
   */
  dataAttributesTree: undefined,

  /**
    Data for jsTree.

    @property dataAttributesTree
    @type Array
    @default []
   */
  dataTypeTree: undefined,

  /**
    Selected nodes in jsTree.

    @property selectedNodesAttributesTree
    @type Array
    @default []
   */
  selectedNodesAttributesTree: Ember.A(),

  /**
    Selected nodes in jsTree.

    @property selectedNodesAttributesTree
    @type Array
    @default []
   */
  selectedNodesTypeTree: Ember.A(),

  /**
    Included plugins for jsTree.

    @property plugins
    @type String
    @default 'wholerow, types'
   */
  plugins: 'wholerow, types',

  /**
    Type settings for jsTree.

    @property typesOptions
    @type Object
  */
  typesOptions: Ember.computed(() => ({
    '«type»': {
      icon: 'assets/images/attribute.bmp'
    },
    '«enumeration»': {
      icon: 'assets/images/attribute.bmp'
    },
    '«typemap»': {
      icon: 'assets/images/attribute.bmp'
    },
    'property': {
      icon: 'assets/images/attribute.bmp'
    },
    'master': {
      icon: 'assets/images/master.bmp'
    },
    'detail': {
      icon: 'assets/images/datail.png'
    },
    'class': {
      icon: 'assets/images/class.bmp'
    }
  })),

  selectedAttribute: Ember.computed('selectedItem.propertyDefinition.name', function() {
    let propertyDefinition = this.get('selectedItem.propertyDefinition');
    if (Ember.isNone(propertyDefinition)) {
      return;
    }

    let attribute;
    let namesPropertyDefinition = propertyDefinition.name.split('.');
    if (namesPropertyDefinition.length > 1) {
      this.set('readonly', true);
    } else {
      this.set('readonly', false);
    }

    if (propertyDefinition instanceof FdViewAttributesDetail) {
      this.set('selectedItem.type', 'detail');
      let aggregation = this.get('model.aggregation');
      attribute = aggregation.findBy('endRole', namesPropertyDefinition[0]);
    } else if (propertyDefinition instanceof FdViewAttributesMaster) {
      this.set('selectedItem.type', 'master');
      let parsingResult = this._parsingPropertyName(namesPropertyDefinition);
      attribute = parsingResult.associations[0];
    } else {
      let parsingResult = this._parsingPropertyName(namesPropertyDefinition);
      let selectedClass = this.get('store').peekAll('fd-dev-class').findBy('id', parsingResult.classId);
      attribute = selectedClass.get('attributes').findBy('name', namesPropertyDefinition[namesPropertyDefinition.length - 1]);
    }

    return attribute;
  }),

  _propertyNameObserver: Ember.observer('propertyName', function() {
    let propertyName = this.get('propertyName');
    let oldPropertyName = this.get('oldPropertyName');
    if (!Ember.isNone(oldPropertyName) && propertyName === oldPropertyName) {
      this.set('applyTypeDisabled', '');
    } else {
      this.set('applyTypeDisabled', '');
      let attributesTree = this.get('dataAttributesTree');
      attributesTree.forEach((nodes)=> {
        let findNodes = nodes.copyChildren.filter(function(item) {
          return item.get('name').toLocaleLowerCase() === propertyName.toLocaleLowerCase();
        });
        if (findNodes.length !== 0 || propertyName === '') {
          this.set('applyTypeDisabled', 'disabled');
        }
      });
    }
  }),

  _selectedItemObserver: Ember.observer('selectedItem', function() {
    let selectedItem = this.get('selectedItem');
    if (!Ember.isNone(selectedItem)) {
      let attributesTree = this.get('dataAttributesTree');
      this._restorationNodeTree(attributesTree, {});
      if (selectedItem.type === 'master') {
        let allClasses = this.get('store').peekAll('fd-dev-class');
        let stagePk = this.get('currentProjectContext').getCurrentStage();
        let classesCurrentStage = allClasses.filterBy('stage.id', stagePk);
        let selectedItemClass = classesCurrentStage.findBy('name', selectedItem.propertyDefinition.name);
        let listForms = classesCurrentStage.filter(function(item) {
          return item.get('formViews.firstObject.view.class.id') === selectedItemClass.id &&
           item.get('stereotype') === '«listform»';
        });
        let listFormsName = Ember.A(listForms).mapBy('name');
        this.set('dropdownItems', listFormsName);
      } else if (selectedItem.type === 'detail') {
        let allClasses = this.get('store').peekAll('fd-dev-class');
        let stagePk = this.get('currentProjectContext').getCurrentStage();
        let classesCurrentStage = allClasses.filterBy('stage.id', stagePk);
        let classData = classesCurrentStage.findBy('name', selectedItem.propertyDefinition.name);
        let detailViews = classData.get('views');
        let detailViewsItems = detailViews.mapBy('name');
        this.set('dropdownItems', detailViewsItems);
      }
    }
  }),

  _selectedNodesAttributesTreeObserver: Ember.observer('selectedNodesAttributesTree', function() {
    let selectedNodes = this.get('selectedNodesAttributesTree');
    if (selectedNodes.length === 0 || selectedNodes[0].type === 'class') {
      this.set('editAttributeDisabled', 'disabled');
      this.set('removeAttributeDisabled', 'disabled');
      this.set('applyAttributeDisabled', 'disabled');
    } else {
      this.set('applyAttributeDisabled', '');
      if (selectedNodes[0].original.own) {
        this.set('editAttributeDisabled', '');
        this.set('removeAttributeDisabled', '');
      } else {
        this.set('editAttributeDisabled', 'disabled');
        this.set('removeAttributeDisabled', 'disabled');
      }
    }
  }),

  _selectedNodesTypeTreeObserver: Ember.observer('selectedNodesTypeTree', function() {
    let selectedNodes = this.get('selectedNodesTypeTree');
    if (selectedNodes.length === 0 || selectedNodes[0].type === 'class') {
      this.set('applyTypeDisabled', 'disabled');
    } else {
      this._propertyNameObserver();
    }
  }),

  init() {
    this._super(...arguments);
    let attributesTree = this._createAttributesTree();
    this.set('dataAttributesTree', attributesTree);

    let typeTree = this._createTypeTree();
    this.set('dataTypeTree', typeTree);
    this.set('treeViewMode', true);
  },

  actions: {

    /**
      Add new attribute.

      @method actions.applyСlick
    */
    addAttribute() {
      this.set('treeViewMode', false);
      this.set('propertyName', '');

      let typeTree = this.get('dataTypeTree');
      this._restorationNodeTree(typeTree, {});
    },

    /**
      Edit select attribute.

      @method actions.applyСlick
    */
    editAttribute() {
      this.set('treeViewMode', false);

      let selectedNodes = this.get('selectedNodesAttributesTree');
      this.set('oldPropertyName', selectedNodes[0].original.name);
      this.set('propertyName', selectedNodes[0].original.name);

      let typeTree = this.get('dataTypeTree');
      this._restorationNodeTree(typeTree, {});
    },

    /**
      Handles remove node from attribute jsTree.

      @method actions.removeAttribute
    */
    removeAttribute() {
      let selectedNodes = this.get('selectedNodesAttributesTree');
      if (selectedNodes.length === 0) {
        return;
      }

      let dataobject = this.get('model.dataobject');
      let attributes = dataobject.get('attributes');
      let deleteAttribute = attributes.findBy('name', selectedNodes[0].original.name);
      attributes.removeObject(deleteAttribute);

      // Delete node from parent copyChildren.
      let parentSelectedNode = this.get('treeObjectAttributesTree').jstree(true).get_node(selectedNodes[0].parent);
      let arrayChildrensParentSelectedNode = parentSelectedNode.original.get('copyChildren');
      let selectedObject = arrayChildrensParentSelectedNode.findBy('text', selectedNodes[0].text);
      arrayChildrensParentSelectedNode.removeObject(selectedObject);

      if (selectedObject.type === 'detail') {
        // Find free id.
        let typeTree = this.get('dataTypeTree')[5];
        let nodeId = 0;
        let foundId = typeTree.copyChildren.findBy('id', 'detail' + nodeId);
        while (foundId) {
          nodeId++;
          foundId = typeTree.copyChildren.findBy('id', 'detail' + nodeId);
        }

        let recordsDevClass = this.get('store').peekAll('fd-dev-class');
        let classData = recordsDevClass.findBy('id', selectedObject.idNode);
        typeTree.copyChildren.pushObject(
          FdAttributesTree.create({
            text: classData.get('name'),
            type: selectedObject.type,
            id: 'detail' + nodeId,
            idNode: selectedObject.idNode
          }));
      }

      this.get('actionReceiverAttributesTree').send('deleteNode', selectedNodes[0]);
      this.set('selectedNodesAttributesTree', Ember.A());
    },

    applyAttribute() {
      let selectedNodes = this.get('selectedNodesAttributesTree');

      // Create propertyName
      let treeData = this.get('dataAttributesTree');
      let parents = selectedNodes[0].parents;
      let propertyName = '';
      if (parents.length > 2) {
        let indexParentID = parents.length - 3;
        let parentAttributes = treeData[1].copyChildren;
        while (indexParentID >= 0) {
          let parentID = parents[indexParentID];
          let parent = parentAttributes.findBy('id', parentID);
          propertyName = propertyName + '.' + parent.name;
          indexParentID--;
          parentAttributes = parent.copyChildren;
        }

        propertyName = propertyName.slice(1) + '.' + selectedNodes[0].original.name;

      } else {
        propertyName = selectedNodes[0].original.name;
      }

      this.set('selectedItem.propertyDefinition.name', propertyName);
      this.set('selectedItem.type', selectedNodes[0].original.typeNode);

      this.set('selectedItem.view', '');
      this.set('selectedItem.propertyDefinition.detailViewName', '');
      this.set('selectedItem.propertyDefinition.masterPropertyName', '');

      if (selectedNodes[0].type === 'master') {
        this.set('selectedItem.propertyDefinition.detailViewName', undefined);
        let recordsDevClass = this.get('store').peekAll('fd-dev-class');
        let listForms = recordsDevClass.filter(function(item) {
          return item.get('formViews.firstObject.view.class.id') === selectedNodes[0].original.idNode &&
           item.get('stereotype') === '«listform»';
        });
        let listFormsName = Ember.A(listForms).mapBy('name');
        this.set('dropdownItems', listFormsName);
      } else if (selectedNodes[0].type === 'detail') {
        this.set('selectedItem.view', undefined);
        this.set('selectedItem.propertyDefinition.masterPropertyName', undefined);
        let recordsDevClass = this.get('store').peekAll('fd-dev-class');
        let classData = recordsDevClass.findBy('id', selectedNodes[0].original.idNode);
        let detailViews = classData.get('views');
        let detailViewsItems = detailViews.mapBy('name');
        this.set('dropdownItems', detailViewsItems);
      } else {
        this.set('selectedItem.view', undefined);
        this.set('selectedItem.propertyDefinition.detailViewName', undefined);
        this.set('selectedItem.propertyDefinition.masterPropertyName', undefined);
      }
    },

    /**
      Handles creating jsTree.

      @method actions.handleTreeDidBecomeReady
    */
    handleTreeDidBecomeReady() {
      let treeObject = this.get('treeObjectAttributesTree');
      treeObject.on('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.on('after_close.jstree', this._afterCloseNodeTree.bind(this));
    },

    /**
      Add new node in attributes tree.

      @method actions.applyСlick
    */
    applyСlick() {
      let selectedNodes = this.get('selectedNodesTypeTree');
      let selectedNode = selectedNodes[0];
      let attributesTree = this.get('dataAttributesTree');

      // Find free id.
      let nodeId = 0;
      let foundId = this.get('treeObjectAttributesTree').jstree(true).get_node('np' + nodeId);
      while (foundId) {
        nodeId++;
        foundId = this.get('treeObjectAttributesTree').jstree(true).get_node('np' + nodeId);
      }

      let newNode = FdAttributesTree.create({
        text: this.get('propertyName') + ' (' + selectedNode.text + ')',
        type: selectedNode.type,
        typeNode: selectedNode.text,
        name: this.get('propertyName'),
        id: 'np' + nodeId,
        idNode: selectedNode.original.idNode
      });

      switch (selectedNode.type) {
        case 'master':
          newNode.set('children', ['#']);
          newNode.set('copyChildren', ['#']);
          newNode.set('typeNode', 'master');
          attributesTree[1].copyChildren.pushObject(newNode);
          break;
        case 'detail':
          newNode.set('typeNode', 'detail');
          attributesTree[2].copyChildren.pushObject(newNode);
          let dataTypeTree = this.get('dataTypeTree');
          let arrayChildrens = dataTypeTree[5].get('copyChildren');
          let selectedObject = arrayChildrens.findBy('text', selectedNode.text);
          arrayChildrens.removeObject(selectedObject);
          break;
        default:
          attributesTree[0].copyChildren.pushObject(newNode);
      }

      if (!Ember.isNone(this.get('oldPropertyName'))) {
        let selectedNodesAttributesTree = this.get('selectedNodesAttributesTree');
        let parentSelectedNodes = this.get('treeObjectAttributesTree').jstree(true).get_node(selectedNodesAttributesTree[0].parent);
        parentSelectedNodes.original.copyChildren.removeObject(selectedNodesAttributesTree[0].original);
      }

      this._restorationNodeTree(attributesTree, {});
      this.set('oldPropertyName', undefined);
      this.set('treeViewMode', true);
    },

    /**
      Open attributes tree.

      @method actions.applyСlick
    */
    cancelСlick() {
      let attributesTree = this.get('dataAttributesTree');
      this._restorationNodeTree(attributesTree, {});
      this.set('treeViewMode', true);
    }
  },

  /**
    Overridden action for jsTree 'openNode'.
    @method _openNodeTree
  */
  _openNodeTree(e, data) {
    let treeData = this.get('dataAttributesTree');
    this._restorationNodeTree(treeData, data.node.original);

    this.get('actionReceiverAttributesTree').send('redraw');
  },

  /**
    Overridden action for jsTree 'eventDidClose'.
    @method _afterCloseNodeTree
  */
  _afterCloseNodeTree(e, data) {
    data.node.original.state.opened = false;
  },

  /**
    Method for restoring tree nodes.
    @method _restorationNodeTree
  */
  _restorationNodeTree(nodeArray, wantedNode) {
    let _this = this;
    nodeArray.forEach(function(node) {
      if (node.type === 'master' || node.type === 'class') {
        node.set('children', node.get('copyChildren'));

        if (!Ember.isNone(node.state) && node.state.opened) {
          _this._restorationNodeTree(node.get('children'), wantedNode);
        }

        if (node.text === wantedNode.text && node.idNode === wantedNode.idNode && node.id === wantedNode.id) {
          node.state = { opened: true };
          if (node.get('children').length === 1 && node.get('children')[0] === '#') {
            _this._getChildrenNode(node);
          } else {
            _this._restorationNodeTree(node.get('children'), wantedNode);
          }
        }
      }
    });
  },

  /**
    Method for loading tree node data.
    @method _getChildrenNode
  */
  _getChildrenNode(node) {
    let store = this.get('store');
    let idNode = node.get('idNode');
    let idTree = node.get('id');

    let dataForBuildTree = getDataForBuildTree(store, idNode);
    let childrenAttributes = getClassTreeNode(Ember.A(), dataForBuildTree.classes, null, 'type');
    let childrenNode = getAssociationTreeNode(childrenAttributes, dataForBuildTree.associations, idTree, null, 'name');

    node.set('children', childrenNode);
    node.set('copyChildren', childrenNode);
  },

  _parsingPropertyName(nameSplitPoint) {
    let store = this.get('store');
    let stageId = this.get('currentProjectContext').getCurrentStage();
    let allAssociation = store.peekAll('fd-dev-association').filterBy('stage.id', stageId);

    let startRole = nameSplitPoint[0];
    let endRoleID = this.get('model.dataobject.id');
    let associationSelectedClass = allAssociation.filter(function(item) {
      return item.get('endClass.id') === endRoleID && item.get('realStartRole') === startRole;
    });

    for (let i = 1; i < nameSplitPoint.length; i++) {
      startRole = nameSplitPoint[i];
      endRoleID = associationSelectedClass[0].get('startClass.id');
      let associationFilteBuId = allAssociation.filterBy('endClass.id', endRoleID);
      let associationFilteBRole = Ember.A(associationFilteBuId).filterBy('realStartRole', startRole);
      associationSelectedClass = associationFilteBRole;
    }

    return {
      classId: endRoleID,
      associations: associationSelectedClass
    };
  },

  /**
    Method for create attributes tree.

    @method _createAttributesTree
  */
  _createAttributesTree() {
    let attributesTree = Ember.A();
    attributesTree.pushObjects([
      FdAttributesTree.create({
        text: 'Собственные свойства',
        type: 'class',
        id: 'attributes',
        children: this.get('model.attributes'),
        copyChildren: this.get('model.attributes'),
        state: { opened: true }
      }),
      FdAttributesTree.create({
        text: 'Мастера',
        type: 'class',
        id: 'masters',
        children: this.get('model.masters'),
        copyChildren: this.get('model.masters'),
        state: { opened: true }
      }),
      FdAttributesTree.create({
        text: 'Детейлы',
        type: 'class',
        id: 'details',
        children: this.get('model.details'),
        copyChildren: this.get('model.details'),
        state: { opened: true }
      })
    ]);

    return attributesTree;
  },

  /**
    Method for create type tree.

    @method _createTypeTree
  */
  _createTypeTree() {
    let typeTree = Ember.A();

    typeTree.pushObjects([
      FdAttributesTree.create({
        text: 'Простые типы',
        type: 'class',
        id: 'simpleTypes',
        children: this.get('model.simpleTypes'),
        copyChildren: this.get('model.simpleTypes'),
        state: { opened: true }
      }),
      FdAttributesTree.create({
        text: 'typedef',
        type: 'class',
        id: 'typedef',
        children: this.get('model.typemap'),
        copyChildren: this.get('model.typemap'),
        state: { opened: true }
      }),
      FdAttributesTree.create({
        text: 'enumeration',
        type: 'class',
        id: 'enum',
        children: this.get('model.enums'),
        copyChildren: this.get('model.enums'),
        state: { opened: true }
      }),
      FdAttributesTree.create({
        text: 'type',
        type: 'class',
        id: 'type',
        children: this.get('model.types'),
        copyChildren: this.get('model.types'),
        state: { opened: true }
      }),
      FdAttributesTree.create({
        text: 'Мастера',
        type: 'class',
        id: 'masters',
        children: this.get('model.mastersType'),
        copyChildren: this.get('model.mastersType'),
        state: { opened: true }
      }),
      FdAttributesTree.create({
        text: 'Детейлы',
        type: 'class',
        id: 'details',
        children: this.get('model.detailsType'),
        copyChildren: this.get('model.detailsType'),
        state: { opened: true }
      })
    ]);

    return typeTree;
  },

  willDestroy() {
    this._super(...arguments);
    let treeObject = this.get('treeObjectAttributesTree');
    if (!Ember.isNone(treeObject)) {
      treeObject.off('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.off('after_close.jstree', this._afterCloseNodeTree.bind(this));
    }
  }

});
