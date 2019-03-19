import Ember from 'ember';
import layout from '../templates/components/fd-ember-jstree';

export default Ember.Component.extend({
  layout,

  /**
    Action service jsTree.

    @property actionReceiver
    @type service
   */
  actionReceiver: undefined,

  /**
    Selected nodes in jsTree.

    @property selectedNodes
    @type Array
    @default Ember.A()
   */
  selectedNodes: undefined,

  /**
    Included plugins for jsTree.

    @property plugins
    @type String
    @default 'wholerow, types, search'
   */
  plugins: 'wholerow, types, search',

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
  searchTerm: undefined,

  /**
    Search settings for jsTree.

    @property searchOptions
    @type Object
  */
  searchOptions: Ember.computed(() => ({
    show_only_matches: true
  })),

  /**
    Property for add event listeners.

    @property treeObject
    @type Object
  */
  treeObject: undefined,

  actions: {

    /**
      Handles creating jsTree.

      @method actions.handleTreeDidBecomeReady
    */
    handleTreeDidBecomeReady() {
      let treeObject = this.get('jstreeObject');
      treeObject.on('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.on('after_close.jstree', this._afterCloseNodeTree.bind(this));
    },
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
    Overridden action for jsTree 'eventDidClose'.

    @method _afterCloseNodeTree
  */
  _afterCloseNodeTree(e, data) {
    //this.get('jstreeActionReceiver').send('closeNode', data);
    data.node.original.state.opened = false;
  },

  init() {
    this._super(...arguments);
    this.set('selectedNodes', Ember.A());
    this.set('searchTerm', '');
  },

  willDestroy() {
    this._super(...arguments);
    let treeObject = this.get('jstreeObject');
    if (!Ember.isNone(treeObject)) {
      treeObject.off('open_node.jstree', this._openNodeTree.bind(this));
      treeObject.off('after_close.jstree',  this._afterCloseNodeTree.bind(this));
    }
  }
});
