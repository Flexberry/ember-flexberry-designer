import Ember from 'ember';

import FdListformColumn from '../objects/fd-listform-column';
import FdViewAttributesProperty from '../objects/fd-view-attributes-property';
import FdAttributesTree from '../objects/fd-attributes-tree';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import {
  getDataForBuildTree,
  getTreeNodeByNotUsedAttributes,
  getAssociationTreeNode,
  getTreeNodeByNotUsedAggregation,
  getClassTreeNode
 } from '../utils/fd-attributes-for-tree';
import { createPropertyName, restorationNodeTree, afterCloseNodeTree, findFreeNodeTreeNameIndex } from '../utils/fd-metods-for-tree';
import { copyViewDefinition } from '../utils/fd-copy-view-definition';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';

export default Ember.Controller.extend(
FdWorkPanelToggler,
FdFormUnsavedData, {
  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: Ember.inject.service(),

  /**
    @private
    @property _showModalDialog
    @type Boolean
    @default false
  */
  _showModalDialog: false,

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
  selectedNodesNotUsedAttributesTree: Ember.A(),

  /**
    Empty rows array, for 10 rows render.

    @property rows
    @type Array
   */
  rows: Ember.A(Array.apply(null, { length: 10 })),

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
  typesOptionsTree: Ember.computed(() => ({
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
  searchOptionsTree: Ember.computed(() => ({
    show_only_matches: true
  })),

  /**
    Data for jsTree.

    @property dataNotUsedAttributesTree
    @type Array
  */
  dataNotUsedAttributesTree: Ember.A(),

  /**
    Update data in tree.

    @method dataNotUsedAttributesTreeObserver
  */
  dataNotUsedAttributesTreeObserver: Ember.observer('_showNotUsedAttributesTree', function() {
    if (!this.get('_showNotUsedAttributesTree')) {
      return;
    }

    let dataobjectId = this.get('dataObject.id');
    let view = this.get('view');

    let dataForBuildTree = getDataForBuildTree(this.get('store'), dataobjectId);
    let attributesForTree = getTreeNodeByNotUsedAttributes(this.get('store'), dataForBuildTree.classes, view, 'type');
    let associationForTree = getAssociationTreeNode(Ember.A(), dataForBuildTree.associations, 'node_', dataobjectId, 'name');
    let aggregationForTree = getTreeNodeByNotUsedAggregation(dataForBuildTree.aggregations, view, 'name');

    let attributesTree = Ember.A();
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

  /**
    @private
    @property _selectedIsFirst
    @readOnly
    @type Boolean
  */
  _selectedIsFirst: Ember.computed('selectedColumn', 'columns.[]', function() {
    return this.get('selectedColumn') === this.get('columns.firstObject');
  }).readOnly(),

  /**
    @private
    @property _selectedIsLast
    @readOnly
    @type Boolean
  */
  _selectedIsLast: Ember.computed('selectedColumn', 'columns.[]', function() {
    return this.get('selectedColumn') === this.get('columns.lastObject');
  }).readOnly(),

  queryParams: ['form', 'class'],

  formClass: Ember.computed.alias('model.listform'),

  view: Ember.computed.alias('model.view'),

  dataObject: Ember.computed.alias('model.dataobject'),

  /**
    View, edited in this exact constructor.

    @property header
    @type String
  */
  viewName: Ember.computed.readOnly('model.listform.name'),

  /**
    Class, edited by this form.

    @property className
    @type String
  */
  className: Ember.computed.alias('model.dataobject.name'),

  /**
    The selected column.

    @property selectedColumn
    @type FdListformColumn
  */
  selectedColumn: undefined,

  /**
    Columns of the table in the list form.

    @property columns
    @type FdListformColumn[]
    @readOnly
  */
  columns: Ember.computed('view.definition', function() {
    let columns = Ember.A();
    let definition = this.get('view.definition');
    let length = definition.get('length');
    for (let i = 0; i < length; i++) {
      columns.pushObject(FdListformColumn.create({
        propertyDefinition: definition.objectAt(i),
      }));
    }

    return columns;
  }).readOnly(),

  actions: {
    /**
      Set the selected column.

      @method actions.selectColumn
      @param {FdListformColumn} column
      @param {Boolean} notTogglePanel
    */
    selectColumn(column, notTogglePanel) {
      let selectedColumn = this.get('selectedColumn');
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      let sidebarOpened = configPanelSidebar.hasClass('visible');

      if (!notTogglePanel && selectedColumn !== column && (column || sidebarOpened)) {
        this.send('toggleConfigPanel', { dataTab: 'control-properties' }, column);
      }

      this.set('selectedColumn', column);

      let newSelectedColumn = selectedColumn === column ? undefined : column;
      if (!Ember.isNone(newSelectedColumn) && newSelectedColumn.get('propertyDefinition.name') === '') {
        this.set('_showNotUsedAttributesTree', true);
      } else {
        this.set('_showNotUsedAttributesTree', false);
      }
    },

    /**
      Adds a new column.

      @method actions.addColumn
    */
    addColumn() {
      let dataobject = this.get('dataObject');
      let attributes = dataobject.get('attributes');
      let atrIndex = findFreeNodeTreeNameIndex('newAttribute', 1, attributes, 'name');

      this.get('store').createRecord('fd-dev-attribute', {
        class: dataobject,
        name: 'newAttribute' + atrIndex,
        type: 'string',
        notNull: false,
        defaultValue: ''
      });

      let dataForBuildTree = getDataForBuildTree(this.get('store'), dataobject.get('id'));
      let newTree = getClassTreeNode(Ember.A(), dataForBuildTree.classes, dataobject.get('id'), 'type');
      this.set('model.attributes', newTree);

      let view = this.get('view');
      let viewDefinition = view.get('definition');
      let propertyDefinition = FdViewAttributesProperty.create({
        caption: `${this.get('i18n').t('forms.fd-listform-constructor.new-column-caption').toString()} #${this.incrementProperty('_newColumnIndex')}`,
        name: 'newAttribute' + atrIndex,
      });
      viewDefinition.pushObject(propertyDefinition);

      let column = FdListformColumn.create({
        propertyDefinition: propertyDefinition,
      });

      this.get('columns').pushObject(column);
      this.send('selectColumn', column, true);
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      Ember.$('.ui.menu', configPanelSidebar).find(`.item[data-tab="control-properties"]`).click();
      Ember.run.scheduleOnce('afterRender', this, this._scrollToSelected);
    },

    addEmptyControl() {
      let column = FdListformColumn.create({
        propertyDefinition: FdViewAttributesProperty.create({
          caption: `${this.get('i18n').t('forms.fd-listform-constructor.new-column-caption').toString()} #${this.incrementProperty('_newColumnIndex')}`,
          name: '',
        }),
      });

      this.get('columns').pushObject(column);
      this.send('selectColumn', column, true);
      Ember.run.scheduleOnce('afterRender', this, this._scrollToSelected);
    },

    /**
      Removes the selected column.

      @method actions.removeSelectedColumn
      @param {Boolean} approve The user is sure.
    */
    removeSelectedColumn(approve) {
      if (approve) {
        let columns = this.get('columns');
        let selectedColumn = this.get('selectedColumn');

        columns.removeObject(selectedColumn);
        this.set('selectedColumn', undefined);
      } else {
        this.set('_showModalDialog', true);
      }
    },

    /**
      Sorts the selected column.

      @method actions.sortSelectedColumn
      @param {Number} step Step of moving the column.
    */
    sortSelectedColumn(step) {
      let columns = this.get('columns');
      let selectedColumn = this.get('selectedColumn');
      let index = columns.indexOf(selectedColumn) + step;

      columns.removeObject(selectedColumn);
      columns.insertAt(index, selectedColumn);
    },

    /**
      Saves the form's metadata.

      @method actions.save
      @param {Boolean} close If `true`, the `close` action will be run after saving.
    */
    save(close) {
      this.get('appState').loading();
      let view = Ember.A(this.get('view'));
      let viewDefinition = Ember.A();
      let columns = this.get('columns');
      for (let i = 0; i < columns.get('length'); i++) {
        let column = columns[i];
        viewDefinition.pushObject(column.get('propertyDefinition'));
      }

      view.set('definition', viewDefinition);

      let formName = this.get('formClass.name');
      if (this.get('formClass.isNew')) {
        this.set('formClass.caption', formName);
        this.set('formClass.stereotype', '«listform»');
        this.set('view.name', `${formName}ViewL`);
        this.set('formClass.formViews.firstObject.name', 'listview');
      }

      if (this.get('dataObject.isNew')) {
        this.set('dataObject.name', `${formName}Object`);
        this.set('dataObject.caption', `${formName}Object`);
      }

      let dataobject = this.get('dataObject');
      if (Ember.isNone(dataobject.get('caption'))) {
        dataobject.set('caption', dataobject.get('name'));
      }

      let formClass = this.get('formClass');
      if (Ember.isNone(formClass.get('caption'))) {
        formClass.set('caption', formClass.get('name'));
      }

      let attributes = dataobject.get('attributes');
      let changedAttributes = attributes.filterBy('hasDirtyAttributes');

      let association = this.get('store').peekAll('fd-dev-association');
      let changedAssociations = association.filterBy('hasDirtyAttributes');

      let aggregation = this.get('store').peekAll('fd-dev-aggregation');
      let changedAggregation = aggregation.filterBy('hasDirtyAttributes');

      dataobject.save().then(() => {
        formClass.save().then(() => {
          this.get('view').save().then(() => {
            this.get('formClass.formViews.firstObject').save().then(() => {
              this.set('class', undefined);
              this.set('form', this.get('formClass.id'));
              this.saveDataToOriginal();
              if (close) {
                this.send('close');
              } else {
                this.get('appState').reset();
              }
            }, (error) => {
              this.get('appState').reset();
              this.set('error', error);
            });
          }, (error) => {
            this.get('appState').reset();
            this.set('error', error);
          });
          this.set('model.originalDefinition', copyViewDefinition(this.get('view.definition')));
          changedAttributes.map(a => a.save());
          changedAssociations.map(a => a.save());
          changedAggregation.map(a => a.save());
        }, (error) => {
          this.get('appState').reset();
          this.set('error', error);
        });
      }, (error) => {
        this.get('appState').reset();
        this.set('error', error);
      });
    },

    /**
      Close listform form constructor and go to application structure constructor.

      @method actions.close
    */
    close() {
      this.transitionToRoute('fd-appstruct-form', {
        queryParams: {
          form: this.get('form'),
          class: this.get('class')
        }
      });
    },

    /**
      Save changes and close form

      @method actions.closeWithSaving
    */
    closeWithSaving() {
      this.send('save', true);
    },

    /**
      Set attribute in control.

      @method actions.setAttributeInControl
    */
    setAttributeInControl() {
      let selectedNodes = this.get('selectedNodesNotUsedAttributesTree')[0];
      let selectedColumn = this.get('selectedColumn');
      let treeData = this.get('dataNotUsedAttributesTree');

      // Create propertyName
      let propertyName = createPropertyName(selectedNodes, treeData[1], false);

      selectedColumn.set('type', selectedNodes.original.typeNode);
      let propertyDefinition;
      if (selectedNodes.type === 'detail') {
        propertyDefinition = FdViewAttributesDetail.create({
          caption: propertyName,
          name: propertyName,
          visible: true
        });

        selectedColumn.set('propertyDefinition', propertyDefinition);
      } else if (selectedNodes.type === 'master') {
        propertyDefinition = FdViewAttributesMaster.create({
          caption: propertyName,
          name: propertyName,
          visible: true
        });

        selectedColumn.set('propertyDefinition', propertyDefinition);
      } else {
        selectedColumn.set('propertyDefinition.caption', propertyName);
        selectedColumn.set('propertyDefinition.name', propertyName);
        propertyDefinition = selectedColumn.get('propertyDefinition');
      }

      let view = this.get('view');
      let viewDefinition = view.get('definition');
      viewDefinition.pushObject(propertyDefinition);

      this.set('_showNotUsedAttributesTree', false);
    },

    /**
      Don't set attribute in control.

      @method actions.deleteEmptyControl
    */
    deleteEmptyControl() {
      let columns = this.get('columns');
      let selectedColumn = this.get('selectedColumn');
      columns.removeObject(selectedColumn);
      this.set('selectedColumn', undefined);
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
    this.set('model.view.definition', Ember.A(this.get('model.originalDefinition')));
  },

  /**
    Scrolls the form to the selected control with jQuery.

    @private
    @method _scrollToSelected
  */
  _scrollToSelected() {
    let form = Ember.$('.form.list-form-constructor .panel-wrapper');
    let selectColumn = Ember.$('.fd-selected:first');
    let firstSelectedOffsetLeft = selectColumn.length > 0 ? selectColumn.offset().left : 0;
    let scrollLeft = firstSelectedOffsetLeft + form.scrollLeft() - (form.offset().left + 10);

    form.animate({ scrollLeft });
  },

  /**
    Overridden action for jsTree 'openNode'.

    @method _openNodeTree
  */
  _openNodeTree(e, data) {
    let treeData = this.get('dataNotUsedAttributesTree');
    restorationNodeTree(treeData, data.node.original, Ember.A(['master', 'class']), false, (function(node) {
      let view = this.get('view');
      let dataForBuildTree = getDataForBuildTree(this.get('store'), node.get('idNode'));
      let childrenAttributes = getTreeNodeByNotUsedAttributes(this.get('store'), dataForBuildTree.classes, view, 'type');
      let childrenNode = getAssociationTreeNode(childrenAttributes, dataForBuildTree.associations, node.get('id'), null, 'name');

      return childrenNode;
    }).bind(this));

    this.get('actionReceiverNotUsedAttributesTree').send('redraw');
  },

  /**
    Check definitions models has changed attributes. Return true if it right

    @method _checkDefinitionsOnChanges
    @private
  */
  _checkDefinitionsOnChanges() {
    let checkresult = false;
    let originalDefinitions = this.get('model.originalDefinition');
    let currentDefinitions = copyViewDefinition(this.get('view.definition'));

    if (Ember.isEmpty(currentDefinitions)) {
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

    let listFormIsDirty = this.get('model.listform.hasDirtyAttributes');

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

    if (listFormIsDirty || attributesIsDirty || associationIsDirty || aggregationIsDirty) {
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
    if (!Ember.isNone(treeObject)) {
      treeObject.off('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.off('after_close.jstree', afterCloseNodeTree.bind(this));
    }
  }
});
