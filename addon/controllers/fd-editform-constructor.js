import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import { A, isArray } from '@ember/array';
import { isEmpty, isNone } from '@ember/utils';
import { scheduleOnce } from '@ember/runloop';
import { all } from 'rsvp';
import $ from 'jquery';

import FdEditformRow from '../objects/fd-editform-row';
import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTabgroup from '../objects/fd-editform-tabgroup';
import FdEditformTab from '../objects/fd-editform-tab';

import FdViewAttributesProperty from '../objects/fd-view-attributes-property';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import FdAttributesTree from '../objects/fd-attributes-tree';
import {
  getDataForBuildTree,
  getTreeNodeByNotUsedAttributes,
  getAssociationTreeNode,
  getAggregationTreeNode,
  getTreeNodeByNotUsedAggregation,
  getClassTreeNode
 } from '../utils/fd-attributes-for-tree';
import { createPropertyName, restorationNodeTree, afterCloseNodeTree, findFreeNodeTreeNameIndex } from '../utils/fd-metods-for-tree';
import { copyViewDefinition } from '../utils/fd-copy-view-definition';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';
import { controlsToDefinition, locateControlByPath } from '../utils/fd-view-path-functions';
import FdDataTypes from '../utils/fd-datatypes';

export default Controller.extend(
FdWorkPanelToggler,
FdFormUnsavedData, {
  /**
    Service for managing the state of the application.

    @property appState
    @type AppStateService
  */
  appState: service(),

  queryParams: ['classId'],

  /**
    @private
    @property _dataTypes
    @type Ember.Object
  */
  _dataTypes: FdDataTypes.create(),

  /**
    @private
    @property _dataForBuildTree
    @type Object
  */
  _dataForBuildTree: computed('model.dataobject.id', function() {
    return getDataForBuildTree(this.get('store'), this.get('model.dataobject.id'));
  }),

  /**
    @private
    @property _showModalDialog
    @type Boolean
    @default false
  */
  _showModalDialog: false,

  /**
    @private
    @property _showLookupDialog
    @type Boolean
    @default false
  */
  _showLookupDialog: false,

  /**
    @private
    @property _lookupCaption
    @type String
  */
  _lookupCaption: undefined,

  /**
    @private
    @property _lookupView
    @type FdDevViewModel
  */
  _lookupView: undefined,

  /**
    @private
    @property _lookupTypes
    @type Array
  */
  _lookupTypes: undefined,

  /**
    Indicates that the user has started moving control, and the next selected control will be the target of the move.

    @private
    @property _moveItem
    @type Boolean
    @default false
  */
  _moveItem: false,

  /**
    The current dragged item.

    @private
    @property _draggedItem
    @type FdEditformRow|FdEditformControl
  */
  _draggedItem: undefined,

  /**
    Flag: indicates whether show tree.

    @private
    @property _showNotUsedAttributesTree
    @type Boolean
    @default false
  */
  _showNotUsedAttributesTree: false,

  /**
    Selected nodes in jsTree.

    @property selectedNodesNotUsedAttributesTree
    @type Array
    @default []
   */
  selectedNodesNotUsedAttributesTree: A(),

  /**
    Included plugins for jsTree.

    @property pluginsTree
    @type String
    @default 'wholerow, types, search'
   */
  pluginsTree: 'wholerow, types, search',

  /**
    Type settings for jsTree.

    @property typesOptionsTree
    @type Object
  */
  typesOptionsTree: computed(() => ({
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
    Data for search tree node.

    @property searchTermTree
    @type String
    @default ''
   */
  searchTermTree: '',

  /**
    Search settings for jsTree.

    @property searchOptionsTree
    @type Object
  */
  searchOptionsTree: computed(() => ({
    show_only_matches: true
  })),

  /**
    Data for jsTree.

    @property dataNotUsedAttributesTree
    @type Array
  */
  dataNotUsedAttributesTree: A(),

  /**
    View, edited in this exact constructor.

    @property header
    @type String
  */
  viewName: computed.readOnly('model.editform.name'),

  /**
    Class, edited by this form.

    @property className
    @type String
  */
  className: computed.alias('model.dataobject.name'),

  /**
    Update data in tree.

    @method dataNotUsedAttributesTreeObserver
  */
  dataNotUsedAttributesTreeObserver: observer('_showNotUsedAttributesTree', function() {
    if (!this.get('_showNotUsedAttributesTree')) {
      return;
    }

    let dataobjectId = this.get('model.dataobject.id');
    let mockView = EmberObject.create({
      definition: controlsToDefinition(this.get('controlsTree')),
      class: this.get('model.dataobject')
    });

    let dataForBuildTree = getDataForBuildTree(this.get('store'), dataobjectId);
    let attributesForTree = getTreeNodeByNotUsedAttributes(this.get('store'), dataForBuildTree.classes, mockView, 'type');
    let associationForTree = getAssociationTreeNode(A(), dataForBuildTree.associations, 'node_', dataobjectId, 'name');
    let aggregationForTree = getTreeNodeByNotUsedAggregation(dataForBuildTree.aggregations, mockView, 'name');

    let attributesTree = A();
    attributesTree.pushObjects([
      FdAttributesTree.create({
        text: this.get('i18n').t('forms.fd-editform-constructor.form-config-panel.tree.not-used-attributes.property').toString(),
        type: 'class',
        id: 'attributes',
        children: attributesForTree,
        copyChildren: attributesForTree,
        state: { opened: true }
      }),
      FdAttributesTree.create({
        text: this.get('i18n').t('forms.fd-editform-constructor.form-config-panel.tree.not-used-attributes.master').toString(),
        type: 'class',
        id: 'masters',
        children: associationForTree,
        copyChildren: associationForTree,
        state: { opened: true }
      }),
      FdAttributesTree.create({
        text: this.get('i18n').t('forms.fd-editform-constructor.form-config-panel.tree.not-used-attributes.detail').toString(),
        type: 'class',
        id: 'details',
        children: aggregationForTree,
        copyChildren: aggregationForTree,
        state: { opened: true }
      })
    ]);

    this.set('dataNotUsedAttributesTree', attributesTree);
  }),

  _applyDisabled: computed('selectedNodesNotUsedAttributesTree', function() {
    let selectedNodes = this.get('selectedNodesNotUsedAttributesTree');
    if (selectedNodes.length === 0 || selectedNodes[0].type === 'class') {
      return 'disabled';
    } else {
      return '';
    }
  }),

  /**
    If the `selectedItem` is the only control in the row, it will be the row.

    @private
    @property _itemToMove
    @readOnly
    @type {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab}
  */
  _itemToMove: computed('selectedItem', function() {
    let selectedItem = this.get('selectedItem');
    if (this._isControl(selectedItem)) {
      let itemContainer = this._findItemContainer(selectedItem);
      if (this._getItemStorage(itemContainer).get('length') === 1) {
        return itemContainer;
      }
    }

    return selectedItem;
  }).readOnly(),

  /**
    An array that contains `_itemToMove`.

    @private
    @property _itemToMoveStorage
    @readOnly
    @type Ember.NativeArray
  */
  _itemToMoveStorage: computed('_itemToMove', function() {
    let itemToMove = this.get('_itemToMove');
    if (itemToMove) {
      return this._getItemStorage(this._findItemContainer(itemToMove));
    }
  }).readOnly(),

  /**
    @private
    @property _itemToMoveIsRow
    @readOnly
    @type Boolean
  */
  _itemToMoveIsRow: computed('_itemToMove', function() {
    return this.get('_itemToMove') instanceof FdEditformRow;
  }).readOnly(),

  /**
    @private
    @property _itemToMoveIsFirst
    @readOnly
    @type Boolean
  */
  _itemToMoveIsFirst: computed('_itemToMoveStorage.[]', function() {
    let itemToMove = this.get('_itemToMove');
    let itemToMoveStorage = this.get('_itemToMoveStorage');
    if (itemToMove && itemToMoveStorage) {
      return itemToMoveStorage.get('firstObject') === itemToMove;
    }

    return false;
  }).readOnly(),

  /**
    @private
    @property _itemToMoveIsLast
    @readOnly
    @type Boolean
  */
  _itemToMoveIsLast: computed('_itemToMoveStorage.[]', function() {
    let itemToMove = this.get('_itemToMove');
    let itemToMoveStorage = this.get('_itemToMoveStorage');
    if (itemToMove && itemToMoveStorage) {
      return itemToMoveStorage.get('lastObject') === itemToMove;
    }

    return false;
  }).readOnly(),

  /**
    The selected item.

    @property selectedItem
    @type {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab}
  */
  selectedItem: undefined,

  /**
    @property implementations
    @type Ember.NativeArray
  */
  implementations: computed.filter('model.classes', clazz => clazz.get('stereotype') === '«implementation»' || clazz.get('stereotype') === null),

  /**
    @property attributes
    @type Ember.NativeArray
  */
  attributes: computed('_dataForBuildTree', function() {
    return getClassTreeNode(A(), this.get('_dataForBuildTree.classes'), this.get('model.dataobject.id'), 'type');
  }),

  /**
    @property masters
    @type Ember.NativeArray
  */
  masters: computed('_dataForBuildTree', function() {
    return getAssociationTreeNode(A(), this.get('_dataForBuildTree.associations'), 'node_', this.get('model.dataobject.id'), 'name');
  }),

  /**
    @property details
    @type Ember.NativeArray
  */
  details: computed('_dataForBuildTree', function() {
    return getAggregationTreeNode(A(), this.get('_dataForBuildTree.aggregations'), this.get('model.dataobject.id'), 'name');
  }),

  /**
    @property mastersType
    @type Ember.NativeArray
  */
  mastersType: computed('implementations', function() {
    return this._buildTree(this.get('implementations'), 'master', true);
  }),

  /**
    @property detailsType
    @type Ember.NativeArray
  */
  detailsType: computed('implementations', 'model.{aggregations,dataobject.id}', function() {
    let implementations = this.get('implementations');
    let aggregations = this.get('model.aggregations');
    let dataObjectId = this.get('model.dataobject.id');
    let details = implementations.filter(clazz => clazz.get('id') !== dataObjectId && aggregations.findBy('endClass.id', clazz.get('id')) === undefined);

    return this._buildTree(details, 'detail', true);
  }),

  /**
    @property simpleTypes
    @type Ember.NativeArray
  */
  simpleTypes: computed('_dataTypes', function() {
    return this._buildTree(this.get('_dataTypes').fDTypes(), 'property');
  }),

  /**
    @property typemap
    @type Ember.NativeArray
  */
  typemap: computed('model.stage.typeMapCS', '_dataTypes', function() {
    let dataTypes = this.get('_dataTypes');
    let typemap = this.get('model.stage.typeMapCS').filter(t => dataTypes.fDTypeToFlexberry(t.name) === null);
    return this._buildTree(typemap, '«typemap»');
  }),

  /**
    @property enums
    @type Ember.NativeArray
  */
  enums: computed('model.classes', function() {
    return this._buildTree(this.get('model.classes').filterBy('stereotype', '«enumeration»'), '«enumeration»');
  }),

  /**
    @property types
    @type Ember.NativeArray
  */
  types: computed('model.classes', function() {
    return this._buildTree(this.get('model.classes').filterBy('stereotype', '«type»'), '«type»');
  }),

  /**
    An object with all (including inherited) the attributes, associations and aggregations for the this form data object.

    @property dataObjectProperties
    @type Object
  */
  dataObjectProperties: computed('model.{dataobject.attributes.@each.type,inheritances,associations,aggregations}', function() {
    let dataObject = this.get('model.dataobject');
    let inheritances = this.get('model.inheritances');
    let associations = this.get('model.associations');
    let aggregations = this.get('model.aggregations');

    return this._getClassProperties(dataObject, inheritances, associations, aggregations);
  }),

  /**
    The controls tree created from a view definition.

    @property controlsTree
    @readOnly
    @type Ember.NativeArray
  */
  controlsTree: computed('model.editform.formViews.firstObject.view.definition', function() {
    let controlsTree = A();

    let definition = this.get('model.editform.formViews.firstObject.view.definition');
    let length = definition.get('length');
    for (let i = 0; i < length; i++) {
      let propertyDefinition = definition.objectAt(i);
      let path = propertyDefinition.get('path');
      let caption = propertyDefinition.get('caption') || propertyDefinition.get('name');
      let width = this._getWidth(path);
      let control = FdEditformControl.create({ caption, width, propertyDefinition });
      locateControlByPath(controlsTree, control, path);
    }

    return controlsTree;
  }),

  actions: {
    /**
      Adds a new control to the form, if there is a selected item, the control will be added to it.

      @method actions.addControl
    */
    addControl() {
      let dataobject = this.get('model.dataobject');
      let attributes = dataobject.get('attributes');
      let atrIndex = findFreeNodeTreeNameIndex('newAttribute', 1, attributes, 'name');

      this.get('store').createRecord('fd-dev-attribute', {
        class: dataobject,
        name: 'newAttribute' + atrIndex,
        type: 'string',
        notNull: false,
        defaultValue: ''
      });

      this.notifyPropertyChange('_dataForBuildTree');

      let propertyDefinition = FdViewAttributesProperty.create({
        name: 'newAttribute' + atrIndex,
        visible: true,
      });

      let control = FdEditformControl.create({
        caption: `${this.get('i18n').t('forms.fd-editform-constructor.new-control-caption').toString()} #${this.incrementProperty('_newControlIndex')}`,
        type: 'string',
        propertyDefinition: propertyDefinition,
      });

      this._insertItem(control, this.get('selectedItem') || this.get('controlsTree'));
      this.send('selectItem', control, true);
      let configPanelSidebar = $('.ui.sidebar.config-panel');
      $('.ui.menu', configPanelSidebar).find(`.item[data-tab="control-properties"]`).click();
      scheduleOnce('afterRender', this, this._scrollToSelected);
    },

    /**
      Adds a new empty control to the form, if there is a selected item, the empty control will be added to it.

      @method actions.addEmptyControl
    */
    addEmptyControl() {
      let control = FdEditformControl.create({
        caption: `${this.get('i18n').t('forms.fd-editform-constructor.new-control-caption').toString()} #${this.incrementProperty('_newControlIndex')}`,
        type: 'string',
        propertyDefinition: FdViewAttributesProperty.create({
          name: '',
          visible: true,
        }),
      });

      this._insertItem(control, this.get('selectedItem') || this.get('controlsTree'));
      this.send('selectItem', control, true);
      scheduleOnce('afterRender', this, this._scrollToSelected);
    },

    /**
      Adds a new group to the form, if there is a selected item, the group will be added to it.

      @method actions.addGroup
    */
    addGroup() {
      this._insertItem(FdEditformGroup.create({
        caption: `${this.get('i18n').t('forms.fd-editform-constructor.new-group-caption').toString()} #${this.incrementProperty('_newGroupIndex')}`,
        rows: A(),
      }), this.get('selectedItem') || this.get('controlsTree'));
    },

    /**
      Adds a new tab to the form, if there is a selected item, the tab will be added to it.

      @method actions.addTab
    */
    addTab() {
      this._insertItem(FdEditformTab.create({
        caption: `${this.get('i18n').t('forms.fd-editform-constructor.new-tab-caption').toString()} #${this.incrementProperty('_newTabIndex')}`,
        rows: A(),
      }), this.get('selectedItem') || this.get('controlsTree'));
    },

    /**
      Removes the selected item.

      @method actions.removeSelectedItem
      @param {Boolean} approve The user is sure.
    */
    removeSelectedItem(approve) {
      if (approve) {
        this._removeItem(this.get('selectedItem'));

        // Refresh definition for filter not used attributes in 'dataNotUsedAttributesTreeObserver'.
        // let view = this.get('model.editform.formViews.firstObject.view');
        // view.set('definition', controlsToDefinition(this.get('controlsTree')));

        this.set('selectedItem', undefined);
      } else {
        this.set('_showModalDialog', true);
      }
    },

    /**
      Sorts the selected item in its container.

      @method actions.sortSelectedItem
      @param {Number} step Step of moving the item.
    */
    sortSelectedItem(step) {
      let itemToMove = this.get('_itemToMove');
      let itemToMoveStorage = this.get('_itemToMoveStorage');
      let index = itemToMoveStorage.indexOf(itemToMove) + step;

      itemToMoveStorage.removeObject(itemToMove);
      itemToMoveStorage.insertAt(index, itemToMove);
    },

    /**
      Close edit form constructor and go to application structure constructor.

      @method actions.close
    */
    close() {
      history.back();
    },

    /**
      Save changes and close form

      @method actions.closeWithSaving
    */
    closeWithSaving() {
      this.send('save', true);
    },

    /**
      Set the selected item.

      @method actions.selectItem
      @param {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} item
      @param {Boolean} notTogglePanel
    */
    selectItem(item, notTogglePanel) {
      let selectedItem = this.get('selectedItem');
      if (this.get('_moveItem') && !isNone(item)) {
        if (this._findItemContainer(item, selectedItem) === null) {
          let selectedItemContainer = this._findItemContainer(selectedItem);
          try {
            this._removeItem(selectedItem);
            this._insertItem(selectedItem, item);
            this.notifyPropertyChange('_itemToMove');
            this.set('_moveItem', false);
          } catch (error) {
            this._insertItem(selectedItem, selectedItemContainer);
            this.set('error', error);
          }
        }
      } else if (!this.get('_moveItem')) {
        let configPanelSidebar = $('.ui.sidebar.config-panel');
        let sidebarOpened = configPanelSidebar.hasClass('visible');

        if (!notTogglePanel && selectedItem !== item && (item || sidebarOpened)) {
          this.send('toggleConfigPanel', { dataTab: 'control-properties' }, item);
        }

        this.set('selectedItem', item);

        let newSelectedItem = selectedItem === item ? undefined : item;
        if (!isNone(newSelectedItem) && newSelectedItem.get('propertyDefinition.name') === '') {
          this.set('_showNotUsedAttributesTree', true);
        } else {
          this.set('_showNotUsedAttributesTree', false);
        }
      }
    },

    /**
      Set the current dragged item.

      @method actions.setDragItem
      @param {FdEditformRow|FdEditformControl} item New dragged item.
    */
    setDragItem(item) {
      this.set('_draggedItem', item);
    },

    /**
      Get the current dragged item.

      @method actions.getDragItem
      @return {FdEditformRow|FdEditformControl} The current dragged item or `undefined`.
    */
    getDragItem() {
      return this.get('_draggedItem');
    },

    /**
      Returns an object with properties to render the component.

      @method actions.getComponentProperties
      @param {FdViewAttributesProperty|FdViewAttributesMaster|FdViewAttributesDetail} propertyDefinition Definition a property in a view.
      @return {Object} An object with properties for the component.
    */
    getComponentProperties(propertyDefinition) {
      return this._getComponentProperties(propertyDefinition, this.get('dataObjectProperties'));
    },

    /**
      Shows the lookup form in modal dialog.

      @method actions.showLookup
      @param {String} caption Caption for the lookup form.
      @param {FdDevViewModel} view The view on which the table will be render in the lookup form.
      @param {Array} types An array of types for the view.
    */
    showLookup(caption, view, types) {
      this.set('_lookupCaption', caption);
      this.set('_lookupView', view);
      this.set('_lookupTypes', types);
      this.set('_showLookupDialog', true);
    },

    /**
      Move the current dragged item above or below relative to the passed item.

      @method actions.moveDragItem
      @param {FdEditformRow|FdEditformControl} item The item above or below which will be moved the current dragged item.
      @param {String} direction The direction of the item move, allowed values: 'up' or 'down'.
    */
    moveDragItem(item, direction) {
      let draggedItem = this.get('_draggedItem');
      if (this._findItemContainer(item, draggedItem) === null) {
        let draggedItemStorage = this._getItemStorage(this._findItemContainer(draggedItem));
        draggedItemStorage.removeObject(draggedItem);

        let itemStorage;
        let index = draggedItemStorage.indexOf(item);
        if (index === -1) {
          itemStorage = this._getItemStorage(this._findItemContainer(item));
          index = itemStorage.indexOf(item);
        } else {
          itemStorage = draggedItemStorage;
        }

        if (direction === 'down') {
          index = Math.min(itemStorage.get('length'), index + 1);
        }

        itemStorage.insertAt(index, draggedItem);
      }
    },

    /**
      Saves the form's metadata.

      @method actions.save
      @param {Boolean} close If `true`, the `close` action will be run after saving.
    */
    save(close) {
      this.get('appState').loading();
      try {
        this._saveMetadata(this.get('model'), this.get('controlsTree')).then(() => {
          this.set('model.originalDefinition', copyViewDefinition(this.get('model.editform.formViews.firstObject.view.definition')));
          this.get('appState').reset();
          if (close) {
            this.send('close');
          }
        });
      } catch (error) {
        this.get('appState').reset();
        this.set('error', error);
      }
    },

    /**
      Set attribute in control.

      @method actions.setAttributeInControl
    */
    setAttributeInControl() {
      let selectedNodes = this.get('selectedNodesNotUsedAttributesTree')[0];
      let selectedItem = this.get('selectedItem');
      let treeData = this.get('dataNotUsedAttributesTree');

      // Create propertyName
      let propertyName = createPropertyName(selectedNodes, treeData[1], false);

      selectedItem.set('type', selectedNodes.original.typeNode);
      let propertyDefinition;
      if (selectedNodes.type === 'detail') {
        propertyDefinition = FdViewAttributesDetail.create({
          name: propertyName,
          visible: true
        });

        selectedItem.set('propertyDefinition', propertyDefinition);
      } else if (selectedNodes.type === 'master') {
        propertyDefinition = FdViewAttributesMaster.create({
          name: propertyName,
          visible: true
        });

        selectedItem.set('propertyDefinition', propertyDefinition);
      } else {
        selectedItem.set('propertyDefinition.name', propertyName);
        propertyDefinition = selectedItem.get('propertyDefinition');
      }

      let view = this.get('model.editform.formViews.firstObject.view');
      let viewDefinition = view.get('definition');
      viewDefinition.pushObject(propertyDefinition);

      this.set('_showNotUsedAttributesTree', false);
    },

    /**
      Don't set attribute in control.

      @method actions.deleteEmptyControl
    */
    deleteEmptyControl() {
      this._removeItem(this.get('selectedItem'));
      this.set('selectedItem', undefined);
      this.set('_showNotUsedAttributesTree', false);
    },

    /**
      Handles creating jsTree.

      @method actions.handleTreeDidBecomeReady
    */
    handleTreeDidBecomeReady() {
      let treeObject = this.get('treeObjectNotUsedAttributesTree');
      treeObject.on('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.on('after_close.jstree', afterCloseNodeTree.bind(this));
    },

    /**
      Cancels the changes made to the type map, and send `close` action.

      @method actions.rollback
    */
    rollback() {
      this.clearFormData();
      this.send('removeModalDialog');
      this.send('closeUnsavedForm');
    }
  },

  /**
    Check if fields changed, but unsaved

    @method findUnsavedFormData
  */
  findUnsavedFormData: function () {
    let checkResult = false;

    let definitionsIsChanged = this._checkDefinitionsOnChanges();
    let modelIsChanged = this._checkEmberModelsOnDirty();

    if (definitionsIsChanged || modelIsChanged) {
      checkResult = true;
    }

    return checkResult;
  },

  /**
    Clear all changes in from

    @method clearFormData
  */
  clearFormData: function () {
    let store = this.get('store');
    store.peekAll('fd-dev-class').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-stage').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-association').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-aggregation').forEach((item) => item.rollbackAll());
    let definition = this.get('model.editform.formViews.firstObject.view.definition');
    definition.clear();
    definition.pushObjects(this.get('model.originalDefinition'));
    let controlsTree = this.get('controlsTree');
    controlsTree.clear();
  },

  /**
    Overridden action for jsTree 'openNode'.

    @method _openNodeTree
  */
  _openNodeTree(e, data) {
    let treeData = this.get('dataNotUsedAttributesTree');
    restorationNodeTree(treeData, data.node.original, A(['master', 'class']), false, (function(node) {
      let view = this.get('model.editform.formViews.firstObject.view');
      let dataForBuildTree = getDataForBuildTree(this.get('store'), node.get('idNode'));
      let childrenAttributes = getTreeNodeByNotUsedAttributes(this.get('store'), dataForBuildTree.classes, view, 'type');
      let childrenNode = getAssociationTreeNode(childrenAttributes, dataForBuildTree.associations, node.get('id'), null, 'name');

      return childrenNode;
    }).bind(this));

    this.get('actionReceiverNotUsedAttributesTree').send('redraw');
  },

  /**
    Inserts an `item` into `container`, if `container` is `FdEditformControl`, `item` is inserted into the parent row after `container`.

    @method _insertItem
    @param {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} item
      The item that need to insert.
    @param {Ember.NativeArray|FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} container
      The container in that need to insert the item.
  */
  _insertItem(item, container) {
    let _item;
    let index;
    let target;
    if (container instanceof FdEditformRow) {
      target = container.get('controls');
      _item = this._getControl(item);
    } else if (container instanceof FdEditformGroup || container instanceof FdEditformTab) {
      target = container.get('rows');
      _item = this._getRow(item);
    } else if (container instanceof FdEditformTabgroup) {
      if (item instanceof FdEditformTab) {
        target = container.get('tabs');
        _item = item;
      } else {
        target = container.get('activeTab.rows');
        _item = this._getRow(item);
      }
    } else if (container instanceof FdEditformControl) {
      target = this._findItemContainer(container).get('controls');
      index = target.indexOf(container) + 1;
      _item = this._getControl(item);
    } else {
      target = container;
      _item = this._getRow(item);
    }

    if (typeof index !== 'number') {
      index = target.get('length');
    }

    target.insertAt(index, _item);
  },

  /**
    Removes the specified item from the form.

    @method _removeItem
    @param {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} item The item that need to remove.
  */
  _removeItem(item) {
    let container = this._findItemContainer(item);
    if (container instanceof FdEditformRow) {
      if (container.get('controls.length') === 1) {
        this._removeItem(container);
      } else {
        container.get('controls').removeObject(item);
      }
    } else if (container instanceof FdEditformTabgroup) {
      if (container.get('tabs.length') === 1) {
        this._removeItem(container);
      } else {
        container.get('tabs').removeObject(item);
        container.set('activeTab', container.get('tabs.firstObject'));
      }
    } else if (container instanceof FdEditformGroup || container instanceof FdEditformTab) {
      container.get('rows').removeObject(item);
    } else {
      container.removeObject(item);
    }
  },

  /**
    Looks for a container that contains the item.

    @method _findItemContainer
    @param {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} item
      The sought item.
    @param {Ember.NativeArray|FdEditformRow|FdEditformGroup|FdEditformTabgroup|FdEditformTab} [container]
      The container from which to start the search, if not specified, uses `controlsTree`.
    @return {Ember.NativeArray|FdEditformRow|FdEditformGroup|FdEditformTabgroup|FdEditformTab}
      The container that was found or `null`.
  */
  _findItemContainer(item, container = this.get('controlsTree')) {
    let foundContainer;
    if (container instanceof FdEditformControl) {
      foundContainer = null;
    } else if (container instanceof FdEditformRow && container.get('controls').indexOf(item) === -1) {
      foundContainer = this._findItemContainer(item, container.get('controls'));
    } else if (container instanceof FdEditformTabgroup && container.get('tabs').indexOf(item) === -1) {
      foundContainer = this._findItemContainer(item, container.get('tabs'));
    } else if ((container instanceof FdEditformGroup || container instanceof FdEditformTab) && container.get('rows').indexOf(item) === -1) {
      foundContainer = this._findItemContainer(item, container.get('rows'));
    } else if (isArray(container) && container.indexOf(item) === -1) {
      let index = 0;
      let length = container.get('length');
      while (index < length && !foundContainer) {
        foundContainer = this._findItemContainer(item, container.objectAt(index++));
      }
    } else {
      foundContainer = container;
    }

    return foundContainer;
  },

  /**
    Returns the item storage in the container.

    @private
    @method _getItemStorage
    @param {FdEditformRow|FdEditformGroup|FdEditformTabgroup|FdEditformTab} container Item container.
    @return {Ember.NativeArray} Item storage.
  */
  _getItemStorage(container) {
    if (container instanceof FdEditformRow) {
      return container.get('controls');
    } else if (container instanceof FdEditformTabgroup) {
      return container.get('tabs');
    } else if (container instanceof FdEditformGroup || container instanceof FdEditformTab) {
      return container.get('rows');
    } else if (isArray(container)) {
      return container;
    } else {
      throw new Error(this.get('i18n').t('forms.fd-editform-constructor.unsupported-container-error'));
    }
  },

  /**
    Returns a row that can be added to the form.

    @private
    @method _getRow
    @param {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} item The item to be converted.
    @return {FdEditformRow} A row that can be added to the form.
  */
  _getRow(item) {
    let row;
    if (item instanceof FdEditformRow) {
      row = item;
    } else if (item instanceof FdEditformTab) {
      row = FdEditformRow.create({ controls: A([
        FdEditformTabgroup.create({ tabs: A([item]) }),
      ]) });
    } else if (this._isControl(item)) {
      row = FdEditformRow.create({ controls: A([item]) });
    } else {
      throw new Error(this.get('i18n').t('forms.fd-editform-constructor.item-cast-error'));
    }

    return row;
  },

  /**
    Returns the control that can be added to a row.

    @method _getControl
    @param {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} item The item to be converted.
    @return {FdEditformControl|FdEditformGroup|FdEditformTabgroup} The control that can be added to a row.
  */
  _getControl(item) {
    let control;
    if (this._isControl(item)) {
      control = item;
    } else if (item instanceof FdEditformTab) {
      control = FdEditformTabgroup.create({ tabs: A([item]) });
    } else if (item instanceof FdEditformRow && item.get('controls.length') === 1) {
      control = item.get('controls.firstObject');
    } else {
      throw new Error(this.get('i18n').t('forms.fd-editform-constructor.item-cast-error'));
    }

    return control;
  },

  /**
    Checks whether the control is suitable for placement in a row.

    @private
    @method _isControl
    @param {Any} control The control to check.
    @return {Boolean} If the control can be placed in a row then `true`, else `false`.
  */
  _isControl(control) {
    return control instanceof FdEditformControl || control instanceof FdEditformGroup || control instanceof FdEditformTabgroup;
  },

  /**
    Save editform metadata: dataobject attributes, view, editform class.

    @method _saveMetadata
    @param {Object} model Complex model for processing and save.
    @param {Ember.NativeArray} controlsTree The controls tree.
    @return {Ember.RSVP.Promise}
  */
  _saveMetadata(model, controlsTree) {
    let view = model.editform.get('formViews.firstObject.view');
    let viewDefinition = controlsToDefinition(controlsTree);

    // Check viewDefinition on errors.
    let duplicateValues = A();
    let detailViewNull = A();
    viewDefinition.forEach((atr) => {
      let countDefinition = viewDefinition.filterBy('name', atr.name);
      if (countDefinition.length !== 1) {
        duplicateValues.addObject(atr.name);
      }

      if (atr instanceof FdViewAttributesDetail && atr.detailViewName === '') {
        detailViewNull.addObject(atr.name);
      }
    });

    if (duplicateValues.length !== 0 || detailViewNull.length !== 0) {
      let dublicateValuesText = this.get('i18n').t('forms.fd-editform-constructor.duplicate-value-error');
      let unknownDetailViewText = this.get('i18n').t('forms.fd-editform-constructor.unknown-detail-view-error');
      let duplicateError = duplicateValues.length > 0 ? `${dublicateValuesText}: ` + duplicateValues.uniq() + '. ' : '';
      let detailViewError = detailViewNull.length > 0 ? `${unknownDetailViewText}: ` + detailViewNull.uniq() + '. ' : '';
      throw new Error(duplicateError + detailViewError);
    }

    view.set('definition', viewDefinition);

    // Save attributes.
    let dataobject = this.get('model.dataobject');
    if (isNone(dataobject.get('caption'))) {
      dataobject.set('caption', dataobject.get('name'));
    }

    let attributes = dataobject.get('attributes');
    let changedAttributes = attributes.filterBy('hasDirtyAttributes');

    let association = this.get('store').peekAll('fd-dev-association');
    let changedAssociations = association.filterBy('hasDirtyAttributes');
    let aggregation = this.get('store').peekAll('fd-dev-aggregation');
    let changedAggregation = aggregation.filterBy('hasDirtyAttributes');

    // Сохранить класс формы редактирования
    let editform = this.get('model.editform');
    editform.set('propertyLookupStr', A(editform.get('propertyLookupStr').toArray()));

    return all([
      view.save(),
      dataobject.save(),
      editform.save(),
      all(changedAttributes.map(a => a.save())),
      all(changedAssociations.map(a => a.save())),
      all(changedAggregation.map(a => a.save())),
    ]);
  },

  /**
    Scrolls the form to the selected control with jQuery.

    @private
    @method _scrollToSelected
  */
  _scrollToSelected() {
    let form = $('.full.height');
    let firstSelectedOffsetTop = $('.selected:first').length > 0 ? $('.selected:first').offset().top : 0;
    let scrollTop = firstSelectedOffsetTop + form.scrollTop() - (form.offset().top + 10);

    form.animate({ scrollTop });
  },

  /**
    Returns an object with all (including inherited) the attributes, associations and aggregations for the class.

    @private
    @method _getClassProperties
    @param {FdDevClassModel} clazz The class for which to get the properties.
    @param {Ember.NativeArray} inheritances All inheritances.
    @param {Ember.NativeArray} associations All associations.
    @param {Ember.NativeArray} aggregations All aggregations.
    @return {Object} An object with properties for the class.
  */
  _getClassProperties(clazz, inheritances, associations, aggregations) {
    let properties = {
      attributes: A(),
      associations: A(),
      aggregations: A(),
    };
    let clazzId = clazz.get('id');

    properties.attributes.pushObjects(clazz.get('attributes').toArray());
    properties.associations.pushObjects(associations.filterBy('endClass.id', clazzId));
    properties.associations.pushObjects(aggregations.filterBy('endClass.id', clazzId));
    properties.aggregations.pushObjects(aggregations.filterBy('startClass.id', clazzId));

    let parents = inheritances.filterBy('child.id', clazzId);
    while (parents.length > 0) {
      let parent = parents.pop().get('parent');
      let parentId = parent.get('id');

      properties.attributes.pushObjects(parent.get('attributes').toArray());
      properties.associations.pushObjects(associations.filterBy('endClass.id', parentId));
      properties.associations.pushObjects(aggregations.filterBy('endClass.id', parentId));
      properties.aggregations.pushObjects(aggregations.filterBy('startClass.id', parentId));

      if (parents.length === 0) {
        parents = inheritances.filterBy('child.id', parentId);
      }
    }

    return properties;
  },

  /**
    Returns an object with properties to render the component.

    @private
    @method _getComponentProperties
    @param {FdViewAttributesProperty|FdViewAttributesMaster|FdViewAttributesDetail} propertyDefinition Definition a property in a view.
    @param {Object} dataObjectProperties
    @return {Object} An object with properties for the component.
  */
  _getComponentProperties(propertyDefinition, dataObjectProperties) {
    let type;
    let view;
    let types;
    let items;

    let path = propertyDefinition.get('name').split('.');
    let propertyName = path.pop();
    if (propertyDefinition instanceof FdViewAttributesDetail) {
      let { aggregations } = dataObjectProperties;
      let relation = aggregations.findBy('endRole', propertyName) || aggregations.findBy('endClass.name', propertyName);
      type = 'detail';
      view = A(this.get('model.views').filterBy('class.id', relation.get('endClass.id'))).findBy('name', propertyDefinition.get('detailViewName'));
      types = this._getTypesForView(view);
    } else if (propertyDefinition instanceof FdViewAttributesMaster) {
      type = 'master';
      let propertyLookup = this.get('model.editform.propertyLookupStr').findBy('property', propertyDefinition.get('name'));
      if (propertyLookup) {
        let form = this.get('model.classes').findBy('name', propertyLookup.container);
        if (form) {
          view = form.get('formViews.firstObject.view');
          types = this._getTypesForView(view);
        }
      }
    } else if (propertyDefinition instanceof FdViewAttributesProperty) {
      let properties = dataObjectProperties;
      let inheritances = this.get('model.inheritances');
      let associations = this.get('model.associations');
      let aggregations = this.get('model.aggregations');
      while (path.length > 0) {
        let role = path.shift();
        let relation = properties.associations.findBy('startRole', role) || properties.associations.findBy('startClass.name', role);
        if (relation) {
          properties = this._getClassProperties(relation.get('startClass'), inheritances, associations, aggregations);
        } else {
          // eslint-disable-next-line no-console
          console.error('Not found association with name:' + role);
        }
      }

      let attribute = properties.attributes.findBy('name', propertyName);
      if (attribute) {
        let typeInMap = this.get('model.stage.typeMapCS').findBy('name', attribute.get('type'));
        if (typeInMap) {
          type = typeInMap.value || typeInMap.name;
        } else {
          let clazz = this.get('model.classes').findBy('name', attribute.get('type'));
          if (clazz && clazz.get('stereotype') === '«enumeration»') {
            type = 'enumeration';
            items = clazz.get('attributes').mapBy('name');
          } else {
            type = 'default';
          }
        }
      } else {
        type = 'default';
      }
    } else {
      throw new Error('Invalid property definition.');
    }

    return { type, view, types, items };
  },

  /**
    Returns an array of types used in the view.

    @private
    @method _getTypesForView
    @param {FdDevViewModel} view A view for which types are needed.
    @return {Array} An array of types used in the view.
  */
  _getTypesForView(view) {
    let types = [];

    let clazz = view.get('class');
    let definition = view.get('definition');
    let inheritances = this.get('model.inheritances');
    let associations = this.get('model.associations');
    let aggregations = this.get('model.aggregations');
    let dataObjectProperties = this._getClassProperties(clazz, inheritances, associations, aggregations);

    let length = definition.get('length');
    for (let i = 0; i < length; i++) {
      types.push(this._getComponentProperties(definition.objectAt(i), dataObjectProperties));
    }

    return types;
  },

  /**
    Create tree.

    @method _buildTree
    @param {Array} data Data for tree.
    @param {String} type Type for tree.
    @param {Boolean} nodeId Flag need add in object node id.
    @return {Object} Object data for tree.
  */
  _buildTree(data, type, nodeId) {
    let treeData = A();
    data.forEach((item, index) => {
      let text;
      if (type === '«typemap»') {
        text = item.name;
      } else if (type === 'property') {
        text = item;
      } else {
        text = item.get('name');
      }

      let newNode = FdAttributesTree.create({
        text: text,
        type: type,
        id: type + index
      });

      if (!isNone(nodeId)) {
        newNode.set('idNode', item.get('id'));
      }

      treeData.pushObject(newNode);
    });

    return treeData;
  },

  /**
    Looks for width in the path

    @method _getWidth
    @param {String} path Property path from view.
  */
  _getWidth: function(path) {
    let partsPath = path.split('\\');
    let lastPartsPath = partsPath[partsPath.length - 1];
    let startWidth = lastPartsPath.lastIndexOf('(');
    let endWidth = lastPartsPath.lastIndexOf(')');
    let width = '';
    if (endWidth !== -1 && startWidth !== -1 && endWidth === lastPartsPath.length - 1 && lastPartsPath.charAt(0) === '#') {
      width = lastPartsPath.slice(startWidth + 1, endWidth);
    }

    return width;
  },

  /**
    Check definitions models has changed attributes. Return true if it right

    @method _checkDefinitionsOnChanges
    @private
  */
  _checkDefinitionsOnChanges() {
    let checkresult = false;
    let originalDefinitions = this.get('model.originalDefinition');

    let currentDefinitions = controlsToDefinition(this.get('controlsTree'));
    if (isEmpty(currentDefinitions)) {
      return false;
    }

    let originalDefinitionsLength = originalDefinitions.length;
    let currentDefinitionsLength = currentDefinitions.length;

    if (originalDefinitionsLength !== currentDefinitionsLength) {
      checkresult = true;
    } else {
      for (let i = 0; i < originalDefinitionsLength; i++) {
        if (originalDefinitions[i].name !== currentDefinitions[i].name ||
          originalDefinitions[i].caption !== currentDefinitions[i].caption ||
          originalDefinitions[i].path !== currentDefinitions[i].path ||
          originalDefinitions[i].visible !== currentDefinitions[i].visible) {
          checkresult = true;
        }
      }
    }

    return checkresult;
  },

  /**
    Check if one of the ember models has dirty attributes. Return true if it right

    @method _checkEmberModelsOnDirty
    @private
  */
  _checkEmberModelsOnDirty() {
    let checkresult = false;

    let editformIsDirty = this.get('model.editform.hasDirtyAttributes');

    let dataobject = this.get('model.dataobject');

    let attributes = dataobject.get('attributes');
    let changedAttributes = attributes.filterBy('hasDirtyAttributes');
    let attributesIsDirty = changedAttributes.length > 0 ? true : false;

    let association = this.get('store').peekAll('fd-dev-association');
    let changedAssociations = association.filterBy('hasDirtyAttributes');
    let associationIsDirty = changedAssociations.length > 0 ? true : false;

    let aggregation = this.get('store').peekAll('fd-dev-aggregation');
    let changedAggregation = aggregation.filterBy('hasDirtyAttributes');
    let aggregationIsDirty = changedAggregation.length > 0 ? true : false;

    if (editformIsDirty || attributesIsDirty || associationIsDirty || aggregationIsDirty) {
      checkresult = true;
    }

    return checkresult;
  },

  /**
    Destroys helper.
  */
  willDestroy() {
    this._super(...arguments);
    let treeObject = this.get('treeObjectNotUsedAttributesTree');
    if (!isNone(treeObject)) {
      treeObject.off('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.off('after_close.jstree', afterCloseNodeTree.bind(this));
    }
  }
});
