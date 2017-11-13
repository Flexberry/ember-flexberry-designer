import Ember from 'ember';
import FlexberryTreenodeActionsHandlerMixin from 'ember-flexberry/mixins/flexberry-treenode-actions-handler';
import TreeNodeObject from 'ember-flexberry/objects/tree-node';
import { Query } from 'ember-flexberry-data';
/*const { Builder, FilterOperator } = Query;*/

export default Ember.Controller.extend(FlexberryTreenodeActionsHandlerMixin, {

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  approveButtonCaption: 'OK',

  cancelButtonCaption: 'Cancel',

  treeChanged: false,

  removeLeftNodeDisabled: 'disabled',
  addLeftNodeDisabled: 'disabled',
  editLeftNodeDisabled: 'disabled',
  listLeftDisabled: '',

  moveRightDisabled: 'disabled',

  addRightNodeDisabled: 'disabled',
  editRightNodeDisabled: 'disabled',
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

  /*
  jsonLeftTreeNodes: Ember.computed('model.jsonLeftTreeNodes', function() {
    return this._jsTreeToFlexberryTree(this.model.jsonLeftTreeNodes);
  }),

  jsonRightTreeNodes: Ember.computed('model.jsonRightTreeNodes', function() {
    return this._jsTreeToFlexberryTree(this.model.jsonRightTreeNodes);
  }),
  */
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

  _jsTreeToFlexberryTree: function(jsTree) {
    if (!jsTree) {
      return null;
    }

    let ret = Ember.A([]);
    for (let i = 0; i < jsTree.length; i++) {
      let node = jsTree[i];
      let nodes = null;
      if (node.nodes) {
        nodes = this._jsTreeToFlexberryTree(node.nodes);
      }

      let treeNode = { id: node.id, stereotype: node.stereotype, caption: node.caption, description: node.description };
      if (nodes) {
        treeNode.nodes = nodes;
      }

      let treeNodeObject = TreeNodeObject.create(treeNode);
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
      let nodes = null;
      if (node.nodes) {
        nodes = this._jsFlexberryTreeToTree(node.nodes);
      }

      let treeNode = { id: node.id, stereotype: node.stereotype, caption: node.caption, description: node.description || '' };
      if (nodes) {
        treeNode.nodes = nodes;
      }

      ret.push(treeNode);
    }

    return ret;
  },

  _findNodeByPath: function(jsonTree, path) {
    let ret = jsonTree;
    let steps = path ? path.split('.') : [];
    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      ret = ret[step];
    }

    return ret;
  },

  _findParentNodeByPath: function(jsonTree, path) {
    let steps = path.split('.');
    steps.pop();
    steps.pop();
    let parentPath = steps.join('.');
    let ret = this._findNodeByPath(jsonTree, parentPath);
    return ret;
  },

  _findParentNodesByPath: function(jsonTree, path) {
    let ret = jsonTree;
    let steps = path.split('.');
    let index = steps.pop();
    let nodesPath = steps.join('.');
    let parentNodes = this._findNodeByPath(jsonTree, nodesPath);
    ret = { parentNodes: parentNodes, index: parseInt(index) };
    return ret;
  },

  _setRightIconState: function(path) {
    let node = this._findNodeByPath(this, path);
    let { parentNodes, index } = this._findParentNodesByPath(this, path);
    let parentNodeChilds = parentNodes.length;
    Ember.set(this, 'removeRightNodeDisabled', path.split('.').length > 2 ? '' : 'disabled');
    Ember.set(this, 'editRightNodeDisabled', '');
    Ember.set(this, 'addFolderNodeDisabled', node.nodes ? '' : 'disabled');
    Ember.set(this, 'upRightNodeDisabled', index > 0 ? '' : 'disabled');
    Ember.set(this, 'downRightNodeDisabled', index < parentNodeChilds - 1 ? '' : 'disabled');
  },

  _setLeftIconState: function(/*path*/) {
    Ember.set(this, 'removeLeftNodeDisabled', '');
    Ember.set(this, 'addLeftNodeDisabled', '');
    Ember.set(this, 'editLeftNodeDisabled', '');
    Ember.set(this, 'moveRightDisabled', '');
    Ember.set(this, 'addRightNodeDisabled', '');
  },

  _findPathOfNode(path, root, node) {
    if (node === root) {
      return path;
    }

    if (!root.nodes) {
      return false;
    }

    for (let i in root.nodes) {
      let subNode = root.nodes[i];
      let subPath = this._findPathOfNode(path + '.nodes.' + i.toString(), subNode, node);
      if (subPath !== false) {
        return subPath;
      }
    }

    return false;
  },

  _findRighTreetPathOfNode(node) {
    let ret = this._findPathOfNode('jsonRightTreeNodes.nodes.0', this.jsonRightTreeNodes[0], node);
    return ret;
  },

  _findLeftTreePathOfNode(node) {
    let ret = this._findPathOfNode('jsonLeftTreeNodes.nodes.0', this.jsonLeftTreeNodes[0], node);
    return ret;
  },

  _isLeaf: function(element) {
    let ret = element.children.length > 0 && element.children[0].style.visibility === 'hidden';
    return ret;
  },

  _getTopId: function(path) {
    if (typeof path !== 'string') {
      return;
    }

    let steps = path.split('.');
    if (steps.length < 2) {
      return;
    }

    let node = this._findNodeByPath(this, steps.join('.'));
    let ret = node.get('id');
    return ret;
  },

  actions: {

    onTreenodeHeaderClick(...args) {
      let actionEventObject = args[args.length - 1];
      let clickedPath = args[0];
      /*let clickedNodeSettingsPrefix = Ember.$(actionEventObject.originalEvent.currentTarget)
        .closest('.tab.segment')
        .attr('data-tab');*/

      let lastClicked = null;
      let clickedElement = actionEventObject.originalEvent.target;
      if (clickedElement.tagName === 'DIV') {
        if (clickedPath.substr(0, 8) === 'jsonLeft') {
          if (!this._isLeaf(clickedElement)) {
            return;
          }

          lastClicked = this.lastClicked.left;
          this._setLeftIconState(/*clickedPath*/);
        } else if (clickedPath.substr(0, 9) === 'jsonRight') {
          lastClicked = this.lastClicked.right;
          this._setRightIconState(clickedPath);
        }

        if (lastClicked) {
          if (lastClicked.element) {
            lastClicked.element.style.backgroundColor = '';
          }

          lastClicked.element = clickedElement;
          lastClicked.element.style.backgroundColor = '#cccccc';
          lastClicked.path = clickedPath;
        }
      }
    },

    moveRightHighlighted() {
      let lastClickedPath = this.lastClicked.left.path;
      let node = this._findNodeByPath(this, lastClickedPath);
      let toPath = this.lastClicked.right.path ? this.lastClicked.right.path : 'jsonRightTreeNodes.0';
      let toNode = this._findNodeByPath(this, toPath);
      if (!toNode.nodes) {
        toNode = this._findParentNodeByPath(this, toPath);
      }

      toNode.nodes.pushObject(node);
    },

    removeLeftNode() {
    },

    addLeftClass() {
      let url = '/fd-class-edit-form/new';
      this.transitionToRoute(url);
    },

    addLeftEditForm() {
      let classId = this._getTopId(this.lastClicked.left.path);
      if (classId) {
        let url = '/fd-visual-edit-form?classId=' + classId;
        this.transitionToRoute(url);
      }

    },

    addLeftListForm() {
      let classId = this._getTopId(this.lastClicked.left.path);
      if (classId) {
        let url = '/fd-visual-edit-list-form?classId=' + classId;
        this.transitionToRoute(url);
      }

    },

    editLeftNode() {
      let lastClickedPath = this.lastClicked.left.path;
      let node = this._findNodeByPath(this, lastClickedPath);
      let nodeId = node.get('id');
      let url;
      switch (node.get('stereotype')) {
        case '«listform»':
          url = '/fd-visual-edit-list-form?formId=' + nodeId;
          this.transitionToRoute(url);
          break;
        case '«editform»':
          url = '/fd-visual-edit-form?formId=' + nodeId;
          this.transitionToRoute(url);
          break;
        case '«implementation»':
        case undefined:
          url = 'fd-class-edit-form';
          this.transitionToRoute(url, nodeId);
          break;
      }
    },

    listLeft() {
    },

    editRightNode() {
      let lastClickedPath = this.lastClicked.right.path;
      let lastClickedElement = this.lastClicked.right.element;
      let textElement = null;
      let caption = lastClickedElement.innerText.trim();
      for (let element = lastClickedElement.firstChild; element; element = element.nextSibling) {
        if (element.nodeType === 3 && element.textContent.trim() === caption) {
          textElement = element;
          break;
        }
      }

      let inputElement = document.createElement('input');
      inputElement._this = this;
      inputElement.lastClickedPath = lastClickedPath;
      inputElement.setAttribute('value', caption);
      inputElement.style.display = 'inline-block';
      inputElement.style.position = 'absolute';
      inputElement.style.padding = '6px 0px 0px 2px';
      inputElement.onblur = function (event) {
        let inputElement = event.target;
        let caption = inputElement.value;
        let textElement = document.createTextNode(caption);
        inputElement.parentNode.replaceChild(textElement, inputElement);
        let _this = inputElement._this;
        let node = _this._findNodeByPath(_this, inputElement.lastClickedPath);
        Ember.set(node, 'caption', caption);
      };

      textElement.parentNode.replaceChild(inputElement, textElement);
      inputElement.select();
      inputElement.focus();
    },

    removeRightNode() {
      alert('removeRightNode');
      let lastClickedPath = this.lastClicked.right.path;
      if (lastClickedPath.split('.').length < 3) {
        return false;
      }

      let { parentNodes, index } = this._findParentNodesByPath(this, lastClickedPath);
      /*let removedNode = parentNodes[index];
      parentNodes.removeObject(removedNode);*/
      Ember.set(parentNodes, index.toString(), undefined);
    },

    addFolderNode() {
      /*let toPath = this.lastClicked.right.path ? this.lastClicked.right.path : 'jsonRightTreeNodes.0';*/
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

      /*Ember.set(this, 'jsonRightTreeNodes', this._jsTreeToFlexberryTree(this.model.jsonRightTreeNodes));*/
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

      let builder = new Query.Builder(this.store)
      .from('fd-dev-class')
      .selectByProjection('SearchFormClassView')
      .byId(this.model.id);
      this.store.query('fd-dev-class', builder.build()).
      /*this.get('store').findRecord('fd-dev-class', this.model.id).*/
      then(function(record) {
        /*let stagePk = _this.get('currentProjectContext').getCurrentStagePk();*/
        record.set('containersStr', rightTree);
        /*record.set('stage', stagePk);*/
        record.save().then(
          function(data) {
            alert('Success' + data);
          },
          function(data) {
            alert('Error' + data);
          }
        );
      });
      /*alert('Save');*/
    }

  }

});
