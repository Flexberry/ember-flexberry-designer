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
    @private
    @property _originalData
    @type string
    @default ''
  */
  _originalData: '',

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
      @param {Boolean} close If `true`, the `close` action will be run.
    */
    save(close) {
      this.set('state', 'loading');
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
              if (close) {
                this.send('close');
              } else {
                this.set('state', '');
              }
            }, (error) => {
              this.set('state', '');
              this.set('error', error);
            });
          }, (error) => {
            this.set('state', '');
            this.set('error', error);
          });
          this.set('model.originalDefinition', copyViewDefinition(this.get('view.definition')));
          changedAttributes.map(a => a.save());
          changedAssociations.map(a => a.save());
          changedAggregation.map(a => a.save());
        }, (error) => {
          this.set('state', '');
          this.set('error', error);
        });
      }, (error) => {
        this.set('state', '');
        this.set('error', error);
      });

      this.saveDataToOriginal();
    },

    close() {
      history.back();
    },

    /**
      Save changes and close form

      @method actions.closeWithSaving
    */
    closeWithSaving() {
      promise = this.send('saveTree');
      Ember.run.next(() => {
        this.send('close');
      });
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
    }
  },

  /**
    Scrolls the form to the selected control with jQuery.

    @private
    @method _scrollToSelected
  */
  _scrollToSelected() {
    let $verticalForm = Ember.$('.form.flexberry-vertical-form');
    let form = $verticalForm.children('.ui.segment');
    let firstSelectedOffsetLeft = Ember.$('.positive:first').length > 0 ? Ember.$('.positive:first').offset().left : 0;
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
    Get model data in string

    @method _getStringifyModel
  */
  _getStringifyModel() {
    let attributes = this.get('model.attributes');
    let attributesString = JSON.stringify(attributes);

    let view = this.get('model.view');
    let viewString = JSON.stringify(view);

    let allDataString = attributesString + viewString;

    return allDataString;
  },

  /**
    This method run non ember data saved when model is loaded

    @method saveOriginalData
  */
  originalDataInit: function () {
    Ember.run.next(this, () => {
      this.saveDataToOriginal();
    });
  },

  /**
    Save fields before changes

    @method saveOriginalData
  */
  saveDataToOriginal: function () {
    let originalDataString = this._getStringifyModel();
    this.set('_originalData', originalDataString);
  },

  /**
    Cancel form data changes

    @method clearDirtyAttributes
  */
  clearDirtyAttributes: function () {
    this.saveDataToOriginal();
  },

  /**
    Check if fields changed, but unsaved

    @method findUnsavedFormData
  */
  findUnsavedFormData: function () {
    let checkResult = false;
    let originalDataString = this.get('_originalData');
    let currentDataString = this._getStringifyModel();
    if (!Ember.isEqual(originalDataString, currentDataString)) {
      checkResult = true;
    }

    return checkResult;
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
