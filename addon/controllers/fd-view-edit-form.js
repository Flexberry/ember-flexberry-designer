import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdViewAttributesProperty from '../objects/fd-view-attributes-property';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import { getTreeNode } from '../utils/fd-get-view-tree-node';

export default EditFormController.extend({

  /**
   Service that triggers objectlistview events.

   @property objectlistviewEventsService
   @type {Class}
   @default Ember.inject.service()
   */
  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

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
      let treeObject = this.get('jstreeObject');
      treeObject.on('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.on('after_close.jstree', this._afterCloseNodeTree.bind(this));
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
      let parents = selectedNodes.parents;
      let propertyName = '';
      if (parents.length > 2) {
        let indexParentID = parents.length - 3;
        let parentAttributes = treeData[0].copyChildren;
        while (indexParentID >= 0) {
          let parentID = parents[indexParentID];
          let parent = parentAttributes.findBy('id', parentID);
          propertyName = propertyName + '.' + parent.text;
          indexParentID--;
          parentAttributes = parent.copyChildren;
        }

        propertyName = propertyName.slice(1) + '.' + selectedNodes.text;

      } else {
        propertyName = selectedNodes.text;
      }

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

      let next = index + 1;
      let node = model[next];
      let nextNode = model[index];
      model.replace(index, 1, node);
      model.replace(next, 1, nextNode);
      this.set('selectedRowIndex', next);
    },

    /**
      Handles form 'saveView' button click.

      @method actions.saveView
    */
    saveView() {
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
        }
      });
    }
  },

  /**
    Overridden action for jsTree 'openNode'.
    @method _openNodeTree
  */
  _openNodeTree(e, data) {
    let treeData = this.get('model.tree');
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
    let treeObject = this.get('jstreeObject');
    if (!Ember.isNone(treeObject)) {
      treeObject.off('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.off('after_close.jstree', this._afterCloseNodeTree.bind(this));
    }
  }
});
