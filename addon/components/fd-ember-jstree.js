import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import layout from '../templates/components/fd-ember-jstree';

export default Component.extend({
  layout,

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

  actions: {

    /**
      Handles creating jsTree.

      @method actions.handleTreeDidBecomeReady
    */
    handleTreeDidBecomeReady() {
      this.get('treeObject').on('load_node.jstree', this._loadNodeTree.bind(this));
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
      childrenNode.forEach((node) => {
        jstree.create_node(data.node, node, 'last', null, true);
      });

      data.node.state.loaded = true;
      jstree.open_node(data.node);
    }
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
    }
  }
});
