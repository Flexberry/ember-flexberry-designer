import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import { resolve } from 'rsvp';
import layout from '../templates/components/fd-ember-jstree';
import { next } from "@ember/runloop";

export default Component.extend({
  layout,

  classNames: ['fd-ember-jstree'],

  /**
    @property store
    @type Service
  */
  store: service(),

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
    Placeholder for search tree nodes input.

    @property searchTermPlaceholder
    @type String
    @default ''
   */
  searchTermPlaceholder: '',

  /**
    Search settings for jsTree.

    @property searchOptions
    @type Object
  */
  searchOptions: computed(() => ({
    show_only_matches: true
  })),

  /**
    Property for add event listeners.

    @property treeObject
    @type Object
  */
  treeObject: undefined,

  /**
    Method for load tree nodes.

    @method loadDataNode
  */
  loadDataNode: undefined,

  /**
    Flag: indicates whether reload data with close node.

    @property reloadDataAtClose
    @type Bool
    @default false
  */
  reloadDataAtClose: false,

  /**
    Method for secect tree nodes.

    @method selectNodeAction
  */
  selectNodeAction: undefined,

  /**
    Method for move tree nodes.

    @method moveNodeAction
  */
  moveNodeAction: undefined,

  /**
    Handles click button in jsTree node.

    @method handleButtonInNode
  */
  handleButtonInNode: undefined,

  actions: {

    /**
      Handles creating jsTree.

      @method actions.handleTreeDidBecomeReady
    */
    handleTreeDidBecomeReady() {
      this.get('treeObject').on('load_node.jstree', this._loadNodeTree.bind(this));

      if (this.get('reloadDataAtClose')) {
        this.get('treeObject').on('close_node.jstree', this._closeNodeTree.bind(this));
      }
    },

    /**
      Handles selectNode jsTree.

      @method actions.handleTreeDidSelectNode
    */
    handleTreeDidSelectNode(node) {
      let selectNodeAction = this.get('selectNodeAction');
      if (typeof selectNodeAction === 'function') {
        selectNodeAction(node, this.get('store'));
      }
    },

    /**
      Handles moveNode jsTree.

      @method actions.handleTreeDidMoveNode
    */
    handleTreeDidMoveNode(node) {
      let moveNodeAction = this.get('moveNodeAction');
      if (typeof moveNodeAction === 'function') {
        moveNodeAction(node);
      }
    },
  },

  /**
    Overridden action for jsTree 'loadNode'.

    @method _loadNodeTree
  */
  _loadNodeTree(e, data) {
    if (!data.node.state.loaded) {
      let jstree = this.get('treeObject').jstree(true);
      let childrenNode = this.get('loadDataNode')(data.node.original, this.get('store'));
      let promise = resolve(childrenNode);
      promise.then((childrenNode)=> {
        childrenNode.forEach((node) => {
          jstree.create_node(data.node, node, 'last', null, true);
        });

        data.node.state.loaded = true;
        jstree.open_node(data.node);
      });
    }

    let handleButtonInNode = this.get('handleButtonInNode');
    if (typeof handleButtonInNode === 'function')  {
      next(this, function() {
        let jstree = this.get('treeObject').jstree(true);
        data.node.children.forEach((child) => {
          let $childrenObj = jstree.get_node(child, true);
          let $node = $childrenObj.children('a.jstree-anchor');
          let $button = $node.children('button.button-in-jstree-node');
          if ($button.length !== 0) {
            $button.on('click', { id:child }, handleButtonInNode);
          }
        });
      });
    }
  },

  /**
    Overridden action for jsTree 'closeNode'.

    @method _closeNodeTree
  */
  _closeNodeTree(e, data) {
    data.node.state.loaded = false;
    let jstree = this.get('treeObject').jstree(true);
    let childrens = data.node.children.slice();
    childrens.forEach((children) => {
      let childrenObj = jstree.get_node(children);
      jstree.delete_node(childrenObj);
    });
  },

  /**
    Overridden action for jsTree 'selectNode'.

    @method _selectNodeTree
  */
  _selectNodeTree(e, data) {
    this.get('selectNodeAction')(data.node.original, this.get('store'));
  },

  init() {
    this._super(...arguments);
    this.set('selectedNodes', A());
  },

  willDestroy() {
    this._super(...arguments);
    let treeObject = this.get('jstreeObject');
    if (!isNone(treeObject)) {
      treeObject.off('load_node.jstree', this._loadNodeTree.bind(this));
      treeObject.off('close_node.jstree', this._closeNodeTree.bind(this));
      treeObject.off('select_node.jstree', this._selectNodeTree.bind(this));
    }
  }
});
