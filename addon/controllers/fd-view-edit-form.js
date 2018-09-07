import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdViewAttributesProperty from '../objects/fd-view-attributes-property';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode } from '../utils/fd-attributes-for-tree';
import { translationMacro as t } from 'ember-i18n';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';
import { createPropertyName, restorationNodeTree, afterCloseNodeTree } from '../utils/fd-metods-for-tree';

export default EditFormController.extend(
FdWorkPanelToggler,
FdFormUnsavedData, {
  parentRoute: 'fd-view-list-form',

  /**
    @private
    @property _originalData
    @type string
    @default ''
  */
  _originalData: '',

  /**
   Service that triggers objectlistview events.

   @property objectlistviewEventsService
   @type {Class}
   @default Ember.inject.service()
   */
  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

  allAttrsHidedn: false,

  popupMessage: t(`forms.fd-view-edit-form.attributes-panel.close-panel-btn-caption`),

  /**
    Index of the selected attribute for editing.

    @property selectedRowIndex
    @type Number
    @default null
   */
  selectedRowIndex: null,

  /**
    Array of possible view name for selected detail for editing.

    @property detailViewNameItems
    @type Array
    @default []
   */
  detailViewNameItems: [],

  /**
    Type of the selected master for editing.

    @property lookupTypeItems
    @type Array
    @default ['default', 'standard', 'combo']
   */
  lookupTypeItems: ['default', 'standard', 'combo'],

  /**
    Included plugins for jsTree.

    @property plugins
    @type String
    @default 'wholerow, types, search'
   */
  plugins: 'wholerow, types, search',

  /**
    Selected nodes in jsTree.

    @property jstreeSelectedNodes
    @type Array
    @default []
   */
  jstreeSelectedNodes: Ember.A(),

  /**
    Type settings for jsTree.

    @property typesOptions
    @type Object
  */
  typesOptions: Ember.computed(() => ({
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
    Data for search tree nodes.

    @property searchTerm
    @type String
    @default ''
   */
  searchTerm: '',

  /**
    Search settings for jsTree.

    @property searchOptions
    @type Object
  */
  searchOptions: Ember.computed(() => ({
    show_only_matches: true
  })),

  /**
    Type selected attribute for editing.

    @property propertyType
    @type Object
  */
  propertyType: Ember.computed('rowModel', function() {
    let rowModel = this.get('rowModel');
    if (rowModel instanceof FdViewAttributesDetail) {
      return 'isDetail';
    } else if (rowModel instanceof FdViewAttributesMaster) {
      return 'isMaster';
    } else {
      return null;
    }
  }),

  /**
    Data selected attribute for editing.

    @property rowModel
    @type Object
  */
  rowModel: Ember.computed('selectedRowIndex', function() {
    let model = this.get('model.view.definition');
    let index = this.get('selectedRowIndex');
    if (!Ember.isNone(index)) {
      let rowModel = model[index];
      let detailsViewArray = this.get('model.detailsView');
      let detailViewByName = detailsViewArray.findBy('detailName', rowModel.name);
      let detailViewByRole = detailsViewArray.findBy('detailRole', rowModel.name);
      if (detailViewByName) {
        this.set('detailViewNameItems', detailViewByName.detailViewNameItems);
      } else if (detailViewByRole) {
        this.set('detailViewNameItems', detailViewByRole.detailViewNameItems);
      } else {
        this.set('detailViewNameItems', []);
      }

      return rowModel;
    }

    return null;
  }),

  actions: {

    /**
      Resets 'masterPropertyName' and 'masterCustomizationString' if 'LookupType' is 'default'.

      @method actions.changeLookupType
      @param {Object} value An object with a new value in the `value` property.
    */
    changeLookupType(value) {
      if (value === 'default') {
        let rowModel = this.get('rowModel');
        rowModel.set('masterPropertyName', '');
        rowModel.set('masterCustomizationString', '');
      }
    },

    /**
      Handles form 'onCreateCaptionClick' button click.

      @method actions.onCreateCaptionClick
    */
    onCreateCaptionClick() {
      let rowModel = this.get('rowModel');
      if (Ember.isNone(rowModel)) {
        return;
      }

      let splitName = rowModel.name.split('.');
      let caption = '';
      splitName.forEach((partCaption) => {
        caption = partCaption + ' ' + caption;
      });

      Ember.set(rowModel, 'caption', caption.trim());
    },

    /**
      Handles form 'onAttributesClick' table row click.

      @method actions.onAttributesClick
    */
    onAttributesClick(index) {
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      let sidebarOpened = configPanelSidebar.hasClass('visible');
      let selectedRowIndex = this.get('selectedRowIndex');

      if ((!Ember.isNone(index) || sidebarOpened) && selectedRowIndex !== index) {
        this.send('toggleConfigPanel', { dataTab: 'active-tree-tab' }, index);
      }

      this.set('selectedRowIndex', index);
    },

    /**
      Handles creating jsTree.

      @method actions.handleTreeDidBecomeReady
    */
    handleTreeDidBecomeReady() {
      let treeObject = this.get('jstreeObject');
      treeObject.on('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.on('after_close.jstree', afterCloseNodeTree.bind(this));
    },

    /**
      Handles form 'moveRightHighlighted' button click.
      Add attribute in definition.

      @method actions.moveRightHighlighted
    */
    moveRightHighlighted() {
      let selectedNodes = this.get('jstreeSelectedNodes')[0];
      let treeData = this.get('model.tree');
      let model = this.get('model.view.definition');

      // Create propertyName
      let propertyName = createPropertyName(selectedNodes, treeData[0], true);

      if (model.findBy('name', propertyName)) {
        return;
      }

      let newDdfinition;
      switch (selectedNodes.type) {
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

      if (!Ember.isNone(newDdfinition)) {
        model.pushObject(newDdfinition);
      }
    },

    /**
      Handles form 'moveLeftHighlighted' button click.
      Delete attribute from definition.

      @method actions.moveLeftHighlighted
    */
    moveLeftHighlighted() {
      let rowModel = this.get('rowModel');

      if (!Ember.isNone(rowModel)) {
        let model = this.get('model.view.definition');
        model.removeObject(rowModel);
        this.set('selectedRowIndex', null);
      }
    },

    /**
      Handles form 'moveUpHighlighted' button click.

      @method actions.moveUpHighlighted
    */
    moveUpHighlighted() {
      let index = this.get('selectedRowIndex');
      if (index === 0) {
        return;
      }

      let prevAttrIndex = this.get('prevAttr');
      if (index === prevAttrIndex--) {
        this.set('prevAttr', prevAttrIndex);
      }

      let model = this.get('model.view.definition');
      let prev = index - 1;
      let node = model[index];
      let prevNode = model[prev];
      model.replace(prev, 1, node);
      model.replace(index, 1, prevNode);
      this.set('selectedRowIndex', prev);
    },

    /**
      Handles form 'moveDownHighlighted' button click.

      @method actions.moveDownHighlighted
    */
    moveDownHighlighted() {
      let index = this.get('selectedRowIndex');
      let model = this.get('model.view.definition');
      if (index === model.length - 1) {
        return;
      }

      let prevAttrIndex = this.get('prevAttr');
      if (index === prevAttrIndex++) {
        this.set('prevAttr', prevAttrIndex);
      }

      let next = index + 1;
      let node = model[next];
      let nextNode = model[index];
      model.replace(index, 1, node);
      model.replace(next, 1, nextNode);
      this.set('selectedRowIndex', next);
    },

    closeRightpanel() {
      Ember.$('.closable.panel-left').toggle(500);

      if (this.allAttrsHidedn) {
        this.set('popupMessage', t('forms.fd-view-edit-form.attributes-panel.close-panel-btn-caption'));
        Ember.$('.panel-wrapper .panel-right.view-attributes').css('width', '50%');
      } else {
        this.set('popupMessage', t('forms.fd-view-edit-form.attributes-panel.show-panel-btn-caption'));
        Ember.$('.panel-wrapper .panel-right.view-attributes').css('width', '100%');
      }

      this.toggleProperty('allAttrsHidedn');
    },

    /**
      Handles form 'saveView' button click.

      @method actions.saveView
      @param {Boolean} close If `true`, the `close` action will be run after saving.
    */
    saveView(close) {
      let view = this.get('model.view');
      view.set('definition', Ember.A(view.get('definition').toArray()));
      let _this = this;

      this.get('objectlistviewEventsService').setLoadingState('loading');
      view.save().then(() => {
        let routeName = _this.get('routeName');
        if (routeName.indexOf('.new') > 0) {
          _this.transitionToRoute(routeName.slice(0, -4), view.get('id'));
        } else {
          _this.get('objectlistviewEventsService').setLoadingState('');
          this.saveDataToOriginal();
          if (close) {
            this.send('close');
          }
        }
      });
    },

    /**
      Save changes and close form

      @method actions.closeWithSaving
    */
    closeWithSaving() {
      this.send('saveView', true);
    },
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
    Cancel form data changes for unsaved data check pass

    @method clearDirtyAttributes
  */
  clearDirtyAttributes: function () {
    this._applyDirtyAttributesAsOrigin();
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
    Overridden action for jsTree 'openNode'.
    @method _openNodeTree
  */
  _openNodeTree(e, data) {
    let treeData = this.get('model.tree');
    restorationNodeTree(treeData, data.node.original, Ember.A(['master', 'class']), false, (function(node) {
      let dataForBuildTree = getDataForBuildTree(this.get('store'), node.get('idNode'));
      let childrenAttributes = getClassTreeNode(Ember.A(), dataForBuildTree.classes);
      let childrenNode = getAssociationTreeNode(childrenAttributes, dataForBuildTree.associations, node.get('id'));

      return childrenNode;
    }).bind(this));

    this.get('jstreeActionReceiver').send('redraw');
  },

  /**
    Get model data in string

    @method _getStringifyModel
  */
  _getStringifyModel() {
    let view = this.get('model.view');
    let viewString = JSON.stringify(view);

    return viewString;
  },

  /**
    Save current dirty data as origin for next equal check origin and current data

    @method _applyDirtyAttributesAsOrigin
    @private
  */
  _applyDirtyAttributesAsOrigin() {
    this.saveDataToOriginal();
  },

  willDestroy() {
    this._super(...arguments);
    let treeObject = this.get('jstreeObject');
    if (!Ember.isNone(treeObject)) {
      treeObject.off('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.off('after_close.jstree', afterCloseNodeTree.bind(this));
    }
  }
});
