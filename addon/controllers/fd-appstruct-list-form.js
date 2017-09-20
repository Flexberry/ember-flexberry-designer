import Ember from 'ember';
import FlexberryTreenodeActionsHandlerMixin from 'ember-flexberry/mixins/flexberry-treenode-actions-handler';
import TreeNodeObject from 'ember-flexberry/objects/tree-node';

export default Ember.Controller.extend(FlexberryTreenodeActionsHandlerMixin, {

  approveButtonCaption: 'OK',

  cancelButtonCaption: 'Cancel',

  treeChanged: false,

  removeLeftNodeDisabled: 'disabled',
  addLeftNodeDisabled: '',
  editLeftNodeDisabled: 'disabled',
  listLeftDisabled: '',

  moveRightDisabled: 'disabled',

  addRightNodeDisabled: 'disabled',
  removeRightNodeDisabled: 'disabled',
  addFolderNodeDisabled: 'disabled',
  upRightNodeDisabled: 'disabled',
  downRightNodeDisabled: 'disabled',

  leftClickedElement: null,
  leftClickedPath: null,

  jsonLeftTreeCollapsible: true,
  jsonLeftTreeClass: 'styled',

  rightClickedElement: null,
  rightClickedPath: null,

  jsonRightTreeCollapsible: true,
  jsonRightTreeClass: 'styled',

  lastClicked: {
    left: {
      path: null,
      element: null
    },
    right: {
      path: null,
      element: null
    }
  },

  jsonLeftTreeNodes:null,

  jsonRightTreeNodes: null,

//   jsonLeftTreeNodes: Ember.computed('model.jsonLeftTreeNodes', function() {
//     return this._jsTreeToFlexberryTree(this.model.jsonLeftTreeNodes);
//   }),
//
//   jsonRightTreeNodes: Ember.computed('model.jsonRightTreeNodes', function() {
//     return this._jsTreeToFlexberryTree(this.model.jsonRightTreeNodes);
//   }),

  /*
  init: function() {
   },
  */

  initLeftTree: function(jsTree) {
    Ember.set(this, 'jsonLeftTreeNodes', this._jsTreeToFlexberryTree(jsTree));
  },

  initRightTree: function(jsTree) {
    Ember.set(this, 'jsonRightTreeNodes', this._jsTreeToFlexberryTree(jsTree));
  },

  _jsTreeToFlexberryTree: function (jsTree) {
    if (!jsTree) {
      return null;
    }

    let ret = Ember.A([]);
    for (let i = 0; i < jsTree.length; i++) {
      let node = jsTree[i];
      let caption = node.caption;
      let nodes = node.nodes;
      if (nodes && nodes.length > 0) {
        nodes = this._jsTreeToFlexberryTree(nodes);
      } else {
        nodes = Ember.A([]);
      }

      let treeNodeObject = TreeNodeObject.create({ caption: caption, nodes: nodes });
      ret.addObject(treeNodeObject);
    }

    return ret;
  },

  _jsFlexberryTreeToTree: function (jsFlexberryTree) {
    if (!jsFlexberryTree) {
      return null;
    }

    let ret = [];
    for (let i = 0; i < jsFlexberryTree.length; i++) {
      let node = jsFlexberryTree[i];
      let caption = node.caption;
      let nodes = node.nodes;
      if (nodes && nodes.length > 0) {
        nodes = this._jsFlexberryTreeToTree(nodes);
      } else {
        nodes = [];
      }

      let treeNodeObject = { caption: caption, nodes: nodes };
      ret.push(treeNodeObject);
    }

    return ret;
  },

  _findNodeByPath: function(jsonTree, path) {
    let ret = jsonTree;
    let steps = path.split('.');
    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      ret = ret[step];
    }

    return ret;
  },

  _findParentNodesByPath: function(jsonTree, path) {
    let ret = jsonTree;
    let steps = path.split('.');
    for (let i = 0; i < steps.length - 1; i++) {
      let step = steps[i];
      ret = ret[step];
    }

    ret = { parentNodes: ret, index: parseInt(steps[steps.length - 1]) };
    return ret;
  },

  _isLeaf: function(element) {
    let ret = element.children.length > 0 && element.children[0].style.visibility == 'hidden';
    return ret;
  },

  actions: {

    onTreenodeHeaderClick(...args) {
      let actionEventObject = args[args.length - 1];
      let clickedNodePropertiesPath = args[0];
      let clickedNodeSettingsPrefix = Ember.$(actionEventObject.originalEvent.currentTarget)
        .closest('.tab.segment')
        .attr('data-tab');

      let lastClicked = null;
      let clickedElement = actionEventObject.originalEvent.toElement;
      if (clickedElement.tagName === 'DIV') {
        if (clickedNodePropertiesPath.substr(0, 8) === 'jsonLeft') {
          if (!this._isLeaf(clickedElement)) {
            return;
          }
          lastClicked = this.lastClicked.left;
          Ember.set(this, 'removeLeftNodeDisabled', '');
          Ember.set(this, 'editLeftNodeDisabled', '');
          Ember.set(this, 'moveRightDisabled', '');
        } else if (clickedNodePropertiesPath.substr(0, 9) === 'jsonRight') {
          lastClicked = this.lastClicked.right;
          Ember.set(this, 'addRightNodeDisabled', '');
          Ember.set(this, 'removeRightNodeDisabled', '');
          Ember.set(this, 'addFolderNodeDisabled', '');
          Ember.set(this, 'upRightNodeDisabled', '');
          Ember.set(this, 'downRightNodeDisabled', '');
        }

        if (lastClicked) {
          if (lastClicked.element) {
            lastClicked.element.style.backgroundColor = '';
          }

          lastClicked.element = clickedElement;
          lastClicked.element.style.backgroundColor = '#cccccc';
          lastClicked.path = clickedNodePropertiesPath;
        }
      }
    },

    moveRightHighlighted() {
      let lastClickedPath = this.lastClicked.left.path;
      let node = this._findNodeByPath(this, lastClickedPath);
      let toPath = this.lastClicked.right.path ? this.lastClicked.right.path : 'jsonRightTreeNodes.0';
      let toNode = this._findNodeByPath(this, toPath);
      toNode.nodes.pushObject(node);
    },

    removeLeftNode() {
    },

    addLeftNode() {
    },

    editLeftNode() {
    },

    listLeft() {
    },

    removeRightNode() {
      let lastClickedPath = this.lastClicked.right.path;
      if (lastClickedPath.split('.').length < 3) {
        return false;
      }

      let { parentNodes, index } = this._findParentNodesByPath(this, lastClickedPath);
      let removedNode = parentNodes[index];
//       parentNodes.removeObject(removedNode);
      Ember.set(parentNodes, index.toString(), undefined);
    },

    addRightNode() {
    },

    addFolderNode() {
    },

    upRightNode() {
      let lastClickedPath = this.lastClicked.right.path;
      let { parentNodes, index } = this._findParentNodesByPath(this, lastClickedPath);
      if (index === 0) {
        return false;
      }

      let prev = index - 1;
      let node = parentNodes[index];
      let prevNode = parentNodes[prev];
      Ember.set(parentNodes, prev.toString(), node);
      Ember.set(parentNodes, index.toString(), prevNode);

      //Ember.set(this, 'jsonRightTreeNodes', this._jsTreeToFlexberryTree(this.model.jsonRightTreeNodes));
    },

    downRightNode() {
      let lastClickedPath = this.lastClicked.right.path;
      let { parentNodes, index } = this._findParentNodesByPath(this.model, lastClickedPath);
      if (index >= parentNodes.length - 1) {
        return false;
      }

      let node = parentNodes[index];
      let nextNode = parentNodes[index + 1];
      parentNodes[index + 1] = node;
      parentNodes[index] = nextNode;
      Ember.set(this, 'jsonRightTreeNodes', this._jsTreeToFlexberryTree(this.model.jsonRightTreeNodes));
    },

    saveTree() {
      let rightTree = this._jsFlexberryTreeToTree(this.jsonRightTreeNodes[0].nodes);
      this.get('store').findRecord('fd-dev-class', this.model.id).then(function(record) {
        record.set('containersStr',rightTree);
      });
      alert('Save');
    }

  }

});
