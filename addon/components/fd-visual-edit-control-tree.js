import Ember from 'ember';
import layout from '../templates/components/fd-visual-edit-control-tree';
import FdViewAttributesProperty from '../objects/fd-view-attributes-property';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import FdAttributesTree from '../objects/fd-attributes-tree';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, parsingPropertyName } from '../utils/fd-attributes-for-tree';
import { createPropertyName, restorationNodeTree, afterCloseNodeTree, findFreeNodeTreeID, findFreeNodeTreeNameIndex } from '../utils/fd-metods-for-tree';

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

  /**
    Flag: indicates whether selectet property is readonly.

    @property readonly
    @type Boolean
    @default false
   */
  readonly: false,

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

  /**
    Data selected attribute for editing.

    @property selectedAttribute
    @type Object
  */
  selectedAttribute: Ember.computed('selectedItem.propertyDefinition.name', function() {
    let propertyDefinition = this.get('selectedItem.propertyDefinition');
    if (Ember.isNone(propertyDefinition)) {
      return;
    }

    let attributesTree = this.get('dataAttributesTree');
    restorationNodeTree(attributesTree, {}, Ember.A(['master', 'class']), false);

    let attribute;
    let namesPropertyDefinition = propertyDefinition.name.split('.');
    if (namesPropertyDefinition.length > 1) {
      this.set('readonly', true);
    } else {
      this.set('readonly', false);
    }

    let store = this.get('store');
    let allClasses = store.peekAll('fd-dev-class');
    let stagePk = this.get('currentProjectContext').getCurrentStage();
    let classesCurrentStage = allClasses.filterBy('stage.id', stagePk);

    if (propertyDefinition instanceof FdViewAttributesDetail) {
      this.set('selectedItem.type', 'detail');
      attribute = this.get('model.aggregation').findBy('endRole', namesPropertyDefinition[0]);

      let classData = classesCurrentStage.findBy('name', namesPropertyDefinition[0]);
      let detailViews = classData.get('views');
      this.set('dropdownItems', detailViews.mapBy('name'));

    } else if (propertyDefinition instanceof FdViewAttributesMaster) {
      this.set('selectedItem.type', 'master');
      let parsingResult = parsingPropertyName(store, this.get('model.dataobject'), namesPropertyDefinition);
      attribute = parsingResult.associations[0];

      let listForms = classesCurrentStage.filter(function(item) {
        return item.get('formViews.firstObject.view.class.id') === attribute.get('startClass.id') &&
         item.get('stereotype') === '«listform»';
      });
      this.set('dropdownItems', Ember.A(listForms).mapBy('name'));

    } else {
      let parsingResult = parsingPropertyName(store, this.get('model.dataobject'), namesPropertyDefinition);
      let selectedClass = classesCurrentStage.findBy('id', parsingResult.classId);
      let attributes = selectedClass.get('attributes');
      let index = namesPropertyDefinition.length - 1;
      attribute = attributes.findBy('name', namesPropertyDefinition[index]);
      if (!attribute) {
        this.set('readonly', true);
      }
    }

    return attribute;
  }),

  /**
    PropertyLookupStr selected attribute for editing.

    @property propertyLookupStr
    @type Object
  */
  propertyLookupStr: Ember.computed('selectedAttribute', function() {
    let propertyDefinition = this.get('selectedItem.propertyDefinition');
    if (!(propertyDefinition instanceof FdViewAttributesMaster)) {
      return {};
    }

    let selectedAttribute = this.get('selectedAttribute');
    let realStartRole = selectedAttribute.get('realStartRole') || selectedAttribute.get('startRole');
    let propertyLookupStrArray = this.get('model.editform.propertyLookupStr');
    let propertyLookupStr = propertyLookupStrArray.findBy('property', realStartRole);
    if (Ember.isNone(propertyLookupStr)) {
      propertyLookupStr = { property: realStartRole, container: '' };
      propertyLookupStrArray.pushObject(propertyLookupStr);
    }

    return propertyLookupStr;
  }),
  /**
    Handles changes in propertyName and selectedNodesTypeTree.

    @method _propertyNameObserver
  */
  _propertyNameObserver: Ember.observer('propertyName', 'selectedNodesTypeTree', function() {
    let propertyName = this.get('propertyName');
    let selectedNodes = this.get('selectedNodesTypeTree');
    if (selectedNodes.length === 0 || selectedNodes[0].type === 'class' || propertyName === '') {
      this.set('applyTypeDisabled', 'disabled');
    } else {
      this.set('applyTypeDisabled', '');
      let oldPropertyName = this.get('oldPropertyName');
      if (Ember.isNone(oldPropertyName) || propertyName !== oldPropertyName) {
        let attributesTree = this.get('dataAttributesTree');
        attributesTree.forEach((nodes)=> {
          let findNodes = nodes.copyChildren.filter(function(item) {
            return item.get('name').toLocaleLowerCase() === propertyName.toLocaleLowerCase();
          });
          if (findNodes.length !== 0) {
            this.set('applyTypeDisabled', 'disabled');
          }
        });
      }
    }
  }),

  /**
    Handles changes in selectedNodesAttributesTree.

    @method _selectedNodesAttributesTreeObserver
  */
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
      Changes the start multiplicity of the association.

      @method actions.changeMasterNotNull
      @param {Object} value An object with a new value in the `checked` property.
    */
    changeMasterNotNull(value) {
      this.set('selectedAttribute.startMultiplicity', value.checked ? '1' : '0..1');
    },

    /**
      Add new attribute.

      @method actions.addAttribute
    */
    addAttribute() {
      this.set('treeViewMode', false);
      this.set('propertyName', '');

      let typeTree = this.get('dataTypeTree');
      restorationNodeTree(typeTree, {}, Ember.A(['master', 'class']), false);
    },

    /**
      Edit select attribute.

      @method actions.editAttribute
    */
    editAttribute() {
      this.set('treeViewMode', false);

      let selectedNodes = this.get('selectedNodesAttributesTree');
      this.set('oldPropertyName', selectedNodes[0].original.name);
      this.set('propertyName', selectedNodes[0].original.name);

      let typeTree = this.get('dataTypeTree');
      restorationNodeTree(typeTree, {}, Ember.A(['master', 'class']), false);
    },

    /**
      Handles remove node from attribute jsTree.

      @method actions.removeAttribute
    */
    removeAttribute() {
      this._deleteAttribute();
      let selectedNode = this.get('selectedNodesAttributesTree')[0];
      this.get('actionReceiverAttributesTree').send('deleteNode', selectedNode);
      this.set('selectedNodesAttributesTree', Ember.A());
    },

    /**
      Handles select node from attribute jsTree.

      @method actions.applyAttribute
    */
    applyAttribute() {
      let selectedNode = this.get('selectedNodesAttributesTree')[0];
      let treeData = this.get('dataAttributesTree');

      // Create propertyName
      let propertyName = createPropertyName(selectedNode, treeData[1], false);
      let recordsDevClass = this.get('store').peekAll('fd-dev-class');

      let propertyDefinition;
      switch (selectedNode.type) {
        case 'property':
          propertyDefinition = FdViewAttributesProperty.create({
            name: propertyName,
          });
          break;
        case 'master':
          let listForms = recordsDevClass.filter(function(item) {
            return item.get('formViews.firstObject.view.class.id') === selectedNode.original.idNode &&
            item.get('stereotype') === '«listform»';
          });
          this.set('dropdownItems', Ember.A(listForms).mapBy('name'));
          propertyDefinition = FdViewAttributesMaster.create({
            name: propertyName,
          });
          break;
        case 'detail':
          let classData = recordsDevClass.findBy('id', selectedNode.original.idNode);
          let detailViews = classData.get('views');
          this.set('dropdownItems', detailViews.mapBy('name'));
          propertyDefinition = FdViewAttributesDetail.create({
            name: propertyName,
          });
          break;
      }

      this.set('selectedItem.propertyDefinition', propertyDefinition);
      this.set('selectedItem.type', selectedNode.original.typeNode);
    },

    /**
      Handles creating jsTree.

      @method actions.handleTreeDidBecomeReady
    */
    handleTreeDidBecomeReady() {
      let treeObject = this.get('treeObjectAttributesTree');
      treeObject.on('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.on('after_close.jstree', afterCloseNodeTree.bind(this));
    },

    /**
      Add new node in attributes tree.

      @method actions.applyСlick
    */
    applyСlick() {
      let selectedNode = this.get('selectedNodesTypeTree')[0];
      let nodeId = findFreeNodeTreeID('np', 0, this.get('treeObjectAttributesTree'));
      let newNode = FdAttributesTree.create({
        text: this.get('propertyName') + ' (' + selectedNode.text + ')',
        type: selectedNode.type,
        typeNode: selectedNode.text,
        name: this.get('propertyName'),
        id: 'np' + nodeId,
        idNode: selectedNode.original.idNode
      });

      let store = this.get('store');
      let dataobject = this.get('model.dataobject');
      let arrayChengeClassElements = this.get('model.arrayChengeClassElements');
      let attributesTree = this.get('dataAttributesTree');
      let recordsDevClass = store.peekAll('fd-dev-class');
      let newAttribute;
      switch (selectedNode.type) {
        case 'master':

          // Update attributesTree.
          newNode.set('children', ['#']);
          newNode.set('copyChildren', ['#']);
          newNode.set('typeNode', 'master');
          attributesTree[1].copyChildren.pushObject(newNode);

          // Create new association.
          let startClass = recordsDevClass.findBy('id', selectedNode.original.idNode);
          newAttribute = store.createRecord('fd-dev-association', {
            endClass: dataobject,
            startClass: startClass,
            startRole: this.get('propertyName'),
            stage: dataobject.get('stage')
          });
          arrayChengeClassElements.pushObject(newAttribute);
          break;
        case 'detail':

          // Update attributesTree.
          newNode.set('typeNode', 'detail');
          attributesTree[2].copyChildren.pushObject(newNode);

          // Update typeTree.
          let dataTypeTree = this.get('dataTypeTree');
          let arrayChildrens = dataTypeTree[5].get('copyChildren');
          let selectedObject = arrayChildrens.findBy('text', selectedNode.text);
          arrayChildrens.removeObject(selectedObject);

          // Create new aggregation.
          let endClass = recordsDevClass.findBy('id', selectedNode.original.idNode);
          newAttribute = store.createRecord('fd-dev-aggregation', {
            endClass: endClass,
            startClass: dataobject,
            endRole: this.get('propertyName'),
            stage: dataobject.get('stage')
          });
          arrayChengeClassElements.pushObject(newAttribute);
          break;
        default:
          attributesTree[0].copyChildren.pushObject(newNode);

          // Create new attribute.
          store.createRecord('fd-dev-attribute', {
            class: dataobject,
            name: this.get('propertyName'),
            type: selectedNode.text,
          });
      }

      // Delete old attribute.
      if (!Ember.isNone(this.get('oldPropertyName'))) {
        this._deleteAttribute();
      }

      restorationNodeTree(attributesTree, {}, Ember.A(['master', 'class']), false);
      this.set('oldPropertyName', undefined);
      this.set('treeViewMode', true);
      this.set('selectedNodesTypeTree', Ember.A());
    },

    /**
      Open attributes tree.

      @method actions.cancelСlick
    */
    cancelСlick() {
      let attributesTree = this.get('dataAttributesTree');
      restorationNodeTree(attributesTree, {}, Ember.A(['master', 'class']), false);
      this.set('treeViewMode', true);
      this.set('selectedNodesTypeTree', Ember.A());
    }
  },

  /**
    Overridden action for jsTree 'openNode'.

    @method _openNodeTree
  */
  _openNodeTree(e, data) {
    let treeData = this.get('dataAttributesTree');
    restorationNodeTree(treeData, data.node.original, Ember.A(['master', 'class']), false, (function(node) {
      let dataForBuildTree = getDataForBuildTree(this.get('store'), node.get('idNode'));
      let childrenAttributes = getClassTreeNode(Ember.A(), dataForBuildTree.classes, null, 'type');
      let childrenNode = getAssociationTreeNode(childrenAttributes, dataForBuildTree.associations, node.get('id'), null, 'name');

      return childrenNode;
    }).bind(this));

    this.get('actionReceiverAttributesTree').send('redraw');
  },

  /**
    Method delete attributes from class.

    @method _deleteAttribute
  */
  _deleteAttribute() {
    let selectedNode = this.get('selectedNodesAttributesTree')[0];
    let dataobject = this.get('model.dataobject');
    let arrayChengeClassElements = this.get('model.arrayChengeClassElements');

    // Delete node from parent copyChildren.
    let parentSelectedNode = this.get('treeObjectAttributesTree').jstree(true).get_node(selectedNode.parent);
    let arrayChildrensParentSelectedNode = parentSelectedNode.original.get('copyChildren');
    let selectedObject = arrayChildrensParentSelectedNode.findBy('text', selectedNode.text);
    arrayChildrensParentSelectedNode.removeObject(selectedObject);

    switch (selectedNode.type) {
      case 'property':
        let attributes = dataobject.get('attributes');
        let deleteAttribute = attributes.findBy('name', selectedNode.original.name);
        deleteAttribute.deleteRecord();
        arrayChengeClassElements.pushObject(deleteAttribute);
        break;
      case 'master':
        let association = this.get('model.association');
        let associationCurrentClass = association.filterBy('endClass.id', dataobject.id);
        let deleteAssociation = Ember.A(associationCurrentClass).findBy('startClass.name', selectedNode.original.name);
        deleteAssociation.deleteRecord();
        arrayChengeClassElements.pushObject(deleteAssociation);
        break;
      case 'detail':
        let aggregation = this.get('model.aggregation');
        let aggregationCurrentClass = aggregation.filterBy('startClass.id', dataobject.id);
        let deleteAggregation = Ember.A(aggregationCurrentClass).findBy('endClass.name', selectedNode.original.name);
        deleteAggregation.deleteRecord();
        arrayChengeClassElements.pushObject(deleteAggregation);
        let typeTree = this.get('dataTypeTree')[5];
        let nodeId = findFreeNodeTreeNameIndex('detail', 0, typeTree.copyChildren, 'id');
        let recordsDevClass = this.get('store').peekAll('fd-dev-class');
        let classData = recordsDevClass.findBy('id', selectedObject.idNode);
        typeTree.copyChildren.pushObject(
          FdAttributesTree.create({
            text: classData.get('name'),
            type: selectedObject.type,
            id: 'detail' + nodeId,
            idNode: selectedObject.idNode
          }));
        break;
    }
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
      treeObject.off('after_close.jstree', afterCloseNodeTree.bind(this));
    }
  }
});
