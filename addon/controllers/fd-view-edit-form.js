import { computed, set } from '@ember/object';
import { A } from '@ember/array';
import { inject } from '@ember/service';
import { isNone } from '@ember/utils';
import $ from 'jquery';

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
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: inject(),

  allAttrsHidedn: false,

  closeRightPanelBtnMessage: t(`forms.fd-view-edit-form.attributes-panel.close-panel-btn-caption`),

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
  detailViewNameItems: undefined,

  /**
    Type of the selected master for editing.

    @property lookupTypeItems
    @type Array
    @default ['default', 'standard', 'combo']
   */
  lookupTypeItems: computed(() => [
    'default',
    'standard',
    'combo'
  ]).readOnly(),

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
  jstreeSelectedNodes: A(),

  /**
    Type settings for jsTree.

    @property typesOptions
    @type Object
  */
  typesOptions: computed(() => ({
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
  searchOptions: computed(() => ({
    show_only_matches: true
  })),

  /**
    Type selected attribute for editing.

    @property propertyType
    @type Object
  */
  propertyType: computed('rowModel', function() {
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
  rowModel: computed('selectedRowIndex', function() {
    let model = this.get('model.view.definition');
    let index = this.get('selectedRowIndex');
    if (!isNone(index)) {
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

  closeRightPanelBtnSelector: 'div.text-center > div > button.close-panel-btn',

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
      if (isNone(rowModel)) {
        return;
      }

      let splitName = rowModel.name.split('.');
      let caption = '';
      splitName.forEach((partCaption) => {
        caption = partCaption + ' ' + caption;
      });

      set(rowModel, 'caption', caption.trim());
    },

    /**
      Handles form 'onAttributesClick' table row click.

      @method actions.onAttributesClick
    */
    onAttributesClick(index) {
      let configPanelSidebar = $('.ui.sidebar.config-panel');
      let sidebarOpened = configPanelSidebar.hasClass('visible');
      let selectedRowIndex = this.get('selectedRowIndex');

      if ((!isNone(index) || sidebarOpened) && selectedRowIndex !== index) {
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

      if (!isNone(newDdfinition)) {
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

      if (!isNone(rowModel)) {
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

    closeRightPanel() {
      $('.closable.panel-left').toggle(500);

      if (this.allAttrsHidedn) {
        this.set('closeRightPanelBtnMessage', t('forms.fd-view-edit-form.attributes-panel.close-panel-btn-caption'));
        $('.panel-wrapper .panel-right.view-attributes').css('width', '50%');
      } else {
        this.set('closeRightPanelBtnMessage', t('forms.fd-view-edit-form.attributes-panel.show-panel-btn-caption'));
        $('.panel-wrapper .panel-right.view-attributes').css('width', '100%');
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
      view.set('definition', A(view.get('definition').toArray()));

      this.get('appState').loading();
      view.save().then(() => {
        let routeName = this.get('routeName');
        if (close) {
          this.saveDataToOriginal();
          this.send('close');
        } else if (routeName.indexOf('.new') > 0) {
          this.transitionToRoute(routeName.slice(0, -4), view.get('id'));
        }
      }).finally(() => {
        this.get('appState').reset();
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
    Cancel form data changes

    @method clearDirtyAttributes
  */
  clearDirtyAttributes: function () {
    this.get('model.view').rollbackAttributes();
  },

  /**
    Check if fields changed, but unsaved

    @method findUnsavedFormData
  */
  findUnsavedFormData: function () {
    let isDirtyAttributes = this.get('model.view.hasDirtyAttributes');
    return isDirtyAttributes;
  },

  /**
    Overridden action for jsTree 'openNode'.
    @method _openNodeTree
  */
  _openNodeTree(e, data) {
    let treeData = this.get('model.tree');
    restorationNodeTree(treeData, data.node.original, A(['master', 'class']), false, (function(node) {
      let dataForBuildTree = getDataForBuildTree(this.get('store'), node.get('idNode'));
      let childrenAttributes = getClassTreeNode(A(), dataForBuildTree.classes);
      let childrenNode = getAssociationTreeNode(childrenAttributes, dataForBuildTree.associations, node.get('id'));

      return childrenNode;
    }).bind(this));

    this.get('jstreeActionReceiver').send('redraw');
  },

  willDestroy() {
    this._super(...arguments);
    let treeObject = this.get('jstreeObject');
    if (!isNone(treeObject)) {
      treeObject.off('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.off('after_close.jstree', afterCloseNodeTree.bind(this));
    }
  },

  init() {
    this._super(...arguments);

    this.set('detailViewNameItems', []);
  }
});
