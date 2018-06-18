import Ember from 'ember';
import FlexberryTreenodeActionsHandlerMixin from 'ember-flexberry/mixins/flexberry-treenode-actions-handler';
import TreeNodeObject from 'ember-flexberry/objects/tree-node';
import FdViewAttributesTree from '../objects/fd-view-attributes-tree';
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

  jsonLeftTreeClass: 'styled',
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

  /*
  jsonLeftTreeNodes: Ember.computed('model.jsonLeftTreeNodes', function() {
    return this._jsTreeToFlexberryTree(this.model.jsonLeftTreeNodes);
  }),

  jsonRightTreeNodes: Ember.computed('model.jsonRightTreeNodes', function() {
    return this._jsTreeToFlexberryTree(this.model.jsonRightTreeNodes);
  }),
  */

  _modelObserver: Ember.on('init', Ember.observer('model', function() {
    if (!this.get('model')) {
      return;
    }

    /*
      Create left tree.
    */

    // Model.form in tree data.
    let treeNodeForms = Ember.A();
    let forms = this.get('model.forms');
    forms.forEach((form, index) => {
      let idParent = form.get('formViews').mapBy('view.class.id');
      treeNodeForms.pushObject(
        FdViewAttributesTree.create({
          text: form.get('name'), //  form.get('caption') form.get('description')
          type: form.get('stereotype'),
          id: 'node_form_' + index,
          idNode: form.get('id'),
          idParent: idParent[0]
        }));
    });

    // Model.implementations in tree data.
    let treeLeft = Ember.A();
    let implementations = this.get('model.implementations');
    implementations.forEach((implementation, index) => {
      let implementationsChildren = treeNodeForms.filterBy('idParent', implementation.id);
      treeLeft.pushObject(
        FdViewAttributesTree.create({
          text: implementation.get('name'),
          type: 'master',
          id: 'node_impl_' + index,
          idNode: implementation.get('id'),
          children: implementationsChildren,
          copyChildren: implementationsChildren
        }));
    });

    Ember.set(this, 'jsonLeftTreeNodes', treeLeft);

    /*
      Create right tree.
    */

    //let treeRight = Ember.A();
    let applications = this.get('model.applications');


    let applicationRecordId = null;
    let itemList = [];

    if (applications) {
      let applicationsCount = applications.get('length');
      for (let i = 0; i < applicationsCount; i++) {
        let record = applications.nextObject(i);
        let recordId = record.get('id');
        applicationRecordId = recordId;
        itemList = record.get('containersStr');
        break; // TODO: Support multiple applications.
      }
    }


    while (itemList && itemList.length === 1 && itemList[0].caption === 'Рабочий стол') {
      itemList = itemList[0].nodes;
    }

    let rightTreeNodes = [{
      caption:'Рабочий стол',
      nodes: itemList
    }];

    Ember.set(this, 'jsonRightTreeNodes', this._jsTreeToFlexberryTree(rightTreeNodes));
  })),

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

      let treeNode = {
        id: node.id,
        caption: node.caption,
        description: node.description,
        className: node.className,
        stereotype: node.stereotype,
      };
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

      let treeNode = {
        id: node.id,
        caption: node.caption,
        description: node.description || '',
        className: node.className,
        stereotype: node.stereotype,
      };
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

    /**
      Handles creating jsTree.

      @method actions.handleTreeDidBecomeReady
    */
    handleTreeDidBecomeReady() {
      let treeObject = this.get('jstreeObject');
      //treeObject.on('open_node.jstree', this._openNodeTree.bind(this));
      //treeObject.on('after_close.jstree', this._afterCloseNodeTree.bind(this));
    },

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

      if (clickedElement.tagName !== 'I') {
        args[1].originalEvent.stopPropagation();
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
        let url = '/fd-editform-constructor/new?classId=' + classId;
        this.transitionToRoute(url);
      }

    },

    addLeftListForm() {
      let pathToObject = this.lastClicked.left.path.split('.', 2).join('.');
      let classId = this._getTopId(pathToObject);
      if (classId) {
        this.transitionToRoute('fd-visual-listform', {
          queryParams: {
            form: undefined,
            class: classId,
          },
        });
      }
    },

    editLeftNode() {
      let lastClickedPath = this.lastClicked.left.path;
      let node = this._findNodeByPath(this, lastClickedPath);
      let nodeId = node.get('id');
      let url;
      switch (node.get('stereotype')) {
        case '«listform»':
          this.transitionToRoute('fd-visual-listform', {
            queryParams: {
              form: nodeId,
              class: undefined,
            },
          });
          break;
        case '«editform»':
          url = '/fd-editform-constructor/' + nodeId;
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
      inputElement.onkeypress = (event) => {
        if (event.keyCode === 13) {
          event.target.blur();
        }
      };

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
      let lastClickedPath = this.lastClicked.right.path;
      if (lastClickedPath.split('.').length < 3) {
        return false;
      }

      let { parentNodes, index } = this._findParentNodesByPath(this, lastClickedPath);
      let removedNode = parentNodes[index];
      parentNodes.removeObject(removedNode);
    },

    addFolderNode() {
      let toPath = this.lastClicked.right.path ? this.lastClicked.right.path : 'jsonRightTreeNodes.0';
      let node = this._findNodeByPath(this, toPath);
      Ember.get(node, 'nodes').pushObject(TreeNodeObject.create({ caption: 'New folder', nodes: Ember.A() }));
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

      parentNodes.arrayContentWillChange(prev, 0,  null);

      Ember.set(parentNodes, prev.toString(), node);
      Ember.set(parentNodes, index.toString(), prevNode);

      parentNodes.arrayContentDidChange(prev, null, null);

      let arrayClickedPath = lastClickedPath.split('.');
      arrayClickedPath[arrayClickedPath.length - 1] = prev.toString();
      let prevPath = arrayClickedPath.join('.');
      this._setRightIconState(prevPath);
      this.lastClicked.right.path = prevPath;
    },

    downRightNode() {
      let lastClickedPath = this.lastClicked.right.path;
      let { parentNodes, index } = this._findParentNodesByPath(this, lastClickedPath);
      if (index >= parentNodes.length - 1) {
        return false;
      }

      let next = index + 1;
      let node = parentNodes[next];
      let nextNode = parentNodes[index];

      parentNodes.arrayContentWillChange(index, 0, null);

      Ember.set(parentNodes, index.toString(), node);
      Ember.set(parentNodes, next.toString(), nextNode);

      parentNodes.arrayContentDidChange(index, null, null);

      let arrayClickedPath = lastClickedPath.split('.');
      arrayClickedPath[arrayClickedPath.length - 1] = next.toString();
      let nextPath = arrayClickedPath.join('.');
      this._setRightIconState(nextPath);
      this.lastClicked.right.path = nextPath;
    },

    saveTree() {
      let rightTree = this._jsFlexberryTreeToTree(this.jsonRightTreeNodes[0].nodes);
      while (rightTree && rightTree.length === 1 && rightTree[0].caption === 'Рабочий стол') {
        rightTree = rightTree[0].nodes;
      }

      let builder = new Query.Builder(this.store)
      .from('fd-dev-class')
      .select('name,stereotype,containersStr,caption,stage.id')
      .byId(this.model.id);
      this.store.queryRecord('fd-dev-class', builder.build()).
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
    },

    openProcessEditorForm() {

    },

    openGenerationForm() {

    }

  }

});
