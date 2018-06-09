import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import { getTreeNode } from '../utils/fd-get-view-tree-node';

export default EditFormController.extend({
  parentRoute: 'fd-view-list-form',

  /**
    Index of the selected attribute for editing.

    @property selectedRowIndex
    @type Number
    @default null
   */
  selectedRowIndex: null,

  /**
    Index of the selected attribute for editing.

    @property lookupTypeItems
    @type Array
    @default ['default', 'standard', 'combo', 'custom']
   */
  lookupTypeItems: ['default', 'standard', 'combo', 'custom'],

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
    let model = this.get('model.data.definition');
    let index = this.get('selectedRowIndex');
    if (!Ember.isNone(index)) {
      let rowModel = model[index];
      return rowModel;
    }

    return null;
  }),

  actions: {

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
      this.set('selectedRowIndex', index);
    },

    /**
      Handles creating jsTree.

      @method actions.handleTreeDidBecomeReady
    */
    handleTreeDidBecomeReady() {
      var treeObject = this.get('jstreeObject');
      treeObject.on('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.on('after_close.jstree', this._afterCloseNodeTree.bind(this));
    }
  },

  /**
    Overridden action for jsTree 'openNode'.
    @method _openNodeTree
  */
  _openNodeTree(e, data) {
    let treeData = this.get('model.data.attributesTree');
    this._restorationNodeTree(treeData, data.node.original);

    this.get('jstreeActionReceiver').send('redraw');
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

        if (node.text === wantedNode.text && node.idNode === wantedNode.idNode) {
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
    let tree = getTreeNode(store, idNode, idTree);
    node.set('children', tree);
    node.set('copyChildren', tree);
  },

  willDestroy() {
    this._super(...arguments);
    var treeObject = this.get('jstreeObject');
    treeObject.off('open_node.jstree', this._openNodeTree.bind(this));
    treeObject.off('after_close.jstree', this._afterCloseNodeTree.bind(this));
  }
});
