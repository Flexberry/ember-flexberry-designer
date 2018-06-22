import Ember from 'ember';
import FdViewAttributesTree from '../objects/fd-view-attributes-tree';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import { translationMacro as t } from 'ember-i18n';
/*import { Query } from 'ember-flexberry-data';*/

export default EditFormController.extend({

  /*
    Setting off for buttons of the left tree.
  */
  removeLeftNodeDisabled: 'disabled',
  addLeftNodeDisabled: 'disabled',
  editLeftNodeDisabled: 'disabled',

  /*
    Setting off for 'moveRight' buttons.
  */
  moveRightDisabled: 'disabled',

  /*
    Setting off for buttons of the right tree.
  */
  addRightNodeDisabled: 'disabled',
  editRightNodeDisabled: 'disabled',
  removeRightNodeDisabled: 'disabled',
  addFolderNodeDisabled: 'disabled',

  /**
    Data left jsTree.

    @property jsonLeftTreeNodes
    @type Array
    @default null
   */
  jsonLeftTreeNodes:null,

  /**
    Data right jsTree.

    @property jsonRightTreeNodes
    @type Array
    @default null
   */
  jsonRightTreeNodes: null,

  allAttrsHidedn: false,

  /**
    Included plugins for left jsTree.

    @property pluginsLeft
    @type String
    @default 'wholerow, types, sort'
   */
  pluginsLeft: 'wholerow, types, sort',

  /**
    Included plugins for right jsTree.

    @property pluginsRight
    @type String
    @default 'wholerow, types'
   */
  pluginsRight: 'wholerow, types',

  /**
    Selected nodes in left jsTree.

    @property jstreeSelectedNodesLeft
    @type Array
    @default []
   */
  jstreeSelectedNodesLeft: Ember.A(),

  /**
    Selected nodes in right jsTree.

    @property jstreeSelectedNodesRight
    @type Array
    @default []
   */
  jstreeSelectedNodesRight: Ember.A(),

  /**
    Type settings for jsTree.

    @property typesOptions
    @type Object
  */
  typesOptions: Ember.computed(() => ({
    '«listform»': {
      icon: 'assets/images/listform.png',
      max_children: 0
    },
    '«editform»': {
      icon: 'assets/images/editform.png',
      max_children: 0
    },
    'implementations': {
      icon: 'assets/images/implementations.png'
    },
    'desk': {
      icon: 'assets/images/class.bmp'
    },
    'notStored': {
      icon: 'assets/images/notStored.png'
    },
    'master': {
      icon: 'assets/images/master.bmp'
    },
    '#': {
      max_children: 1
    }
  })),

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
          text: form.get('caption') || form.get('name'),
          name: form.get('name'),
          type: form.get('stereotype'),
          id: 'node_form_' + index,
          idNode: form.get('id'),
          idParent: idParent[0],
          a_attr: {
            title: form.get('stereotype') + ' ' + form.get('name')
          }
        }));
    });

    // Model.implementations in tree data.
    let treeLeft = Ember.A();
    let implementations = this.get('model.implementations');
    implementations.forEach((implementation, index) => {
      let implementationsChildren = treeNodeForms.filterBy('idParent', implementation.id);
      let typeImplementation = implementation.get('stored') ? 'implementations' : 'notStored';
      treeLeft.pushObject(
        FdViewAttributesTree.create({
          text: implementation.get('caption') || implementation.get('name'),
          name: implementation.get('name'),
          type: typeImplementation,
          id: 'node_impl_' + index,
          idNode: implementation.get('id'),
          children: implementationsChildren,
          copyChildren: implementationsChildren,
          a_attr: {
            title: implementation.get('name')
          }
        }));
    });

    Ember.set(this, 'jsonLeftTreeNodes', treeLeft);

    /*
      Create right tree.
    */

    let rightTreeNodes = Ember.A();
    let applications = this.get('model.applications');

    applications.forEach((application) => {
      rightTreeNodes.pushObjects(application.get('containersStr'));
    });

    // Update stereotype.
    let recordsDevClass = this.get('store').peekAll('fd-dev-class');
    this._updateTypeRightTree(rightTreeNodes, recordsDevClass);

    let treeRight = FdViewAttributesTree.create({
      text: 'Рабочий стол',
      type: 'desk',
      id: 'node_app',
      children: rightTreeNodes,
      copyChildren: rightTreeNodes,
      state: {
        opened: true
      }
    });

    Ember.set(this, 'jsonRightTreeNodes', treeRight);

    // Reset selection.
    this.set('jstreeSelectedNodesLeft', Ember.A());
    this.set('jstreeSelectedNodesRight', Ember.A());
  })),

  /**
    Handles changes in jstreeSelectedNodesLeft.

    @method jstreeSelectedNodesLeftObserver
  */
  _jstreeSelectedNodesLeftObserver: Ember.observer('jstreeSelectedNodesLeft', function() {
    let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
    if (jstreeSelectedNodesLeft.length === 0) {
      this.set('removeLeftNodeDisabled', 'disabled');
      this.set('addLeftNodeDisabled', 'disabled');
      this.set('editLeftNodeDisabled', 'disabled');
    } else {
      this.set('removeLeftNodeDisabled', '');
      this.set('editLeftNodeDisabled', '');
      let selectedNode = jstreeSelectedNodesLeft[0];
      let typeNode = selectedNode.original.type;
      if (typeNode === 'implementations' || typeNode === 'notStored') {
        this.set('addLeftNodeDisabled', '');
      } else {
        this.set('addLeftNodeDisabled', 'disabled');
      }
    }
  }),

  /**
    Handles changes in jstreeSelectedNodesRight.

    @method jstreeSelectedNodesRightObserver
  */
  _jstreeSelectedNodesRightObserver: Ember.observer('jstreeSelectedNodesRight', function() {
    let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
    if (jstreeSelectedNodesRight.length === 0) {
      this.set('editRightNodeDisabled', 'disabled');
      this.set('removeRightNodeDisabled', 'disabled');
      this.set('addFolderNodeDisabled', 'disabled');
    } else {
      let selectedNode = jstreeSelectedNodesRight[0];
      let typeNode = selectedNode.original.type;

      if (typeNode === 'desk') {
        this.set('removeRightNodeDisabled', 'disabled');
        this.set('editRightNodeDisabled', 'disabled');
      } else {
        this.set('removeRightNodeDisabled', '');
        this.set('editRightNodeDisabled', '');
      }

      if (typeNode === '«listform»' || typeNode === '«editform»') {
        this.set('addFolderNodeDisabled', 'disabled');
      } else {
        this.set('addFolderNodeDisabled', '');
      }
    }
  }),

  /**
    Handles changes in jstreeSelectedNodesRight and jstreeSelectedNodesLeft.

    @method _jstreeSelectedNodesObserver
  */
  _jstreeSelectedNodesObserver: Ember.observer('jstreeSelectedNodesLeft', 'jstreeSelectedNodesRight', function() {
    let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
    let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
    if (jstreeSelectedNodesRight.length === 0 || jstreeSelectedNodesLeft.length === 0) {
      return;
    }

    let jstreeSelectedNodesRightType = jstreeSelectedNodesRight[0].original.type;
    let jstreeSelectedNodesLeftType = jstreeSelectedNodesLeft[0].original.type;
    if ((jstreeSelectedNodesLeftType !== '«listform»' && jstreeSelectedNodesLeftType !== '«editform»') ||
      jstreeSelectedNodesRightType === '«listform»' || jstreeSelectedNodesRightType === '«editform»') {
      this.set('moveRightDisabled', 'disabled');
    } else {
      this.set('moveRightDisabled', '');
    }
  }),

  /**
    Index selected attribute in right tree.

    @property indexSelectedRight
    @type Number
  */
  indexSelectedRight: Ember.computed('jstreeSelectedNodesRight', function() {
    let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
    if (jstreeSelectedNodesRight.length === 0) {
      return {
        upRightNodeDisabled: 'disabled',
        downRightNodeDisabled: 'disabled'
      };
    }

    let parentSelectedNode = this.get('jstreeObjectRight').jstree(true).get_node(jstreeSelectedNodesRight[0].parent);
    let arrayChildrensParentSelectedNode = parentSelectedNode.original.get('copyChildren');
    let selectedObject = arrayChildrensParentSelectedNode.findBy('text', jstreeSelectedNodesRight[0].text);
    let indexSelectedNode = arrayChildrensParentSelectedNode.indexOf(selectedObject);

    let upRightNodeDisabled = 'disabled';
    let downRightNodeDisabled = 'disabled';

    if (indexSelectedNode !== 0) {
      upRightNodeDisabled = '';
    }

    if (indexSelectedNode !== arrayChildrensParentSelectedNode.length - 1) {
      downRightNodeDisabled = '';
    }

    return {
      index: indexSelectedNode,
      array: arrayChildrensParentSelectedNode,
      arrayId: parentSelectedNode.children,
      upRightNodeDisabled: upRightNodeDisabled,
      downRightNodeDisabled: downRightNodeDisabled
    };
  }),

  /**
    Method for update type right tree.
    @method _updateTypeRightTree
  */
  _updateTypeRightTree(rightTreeNodes, recordsDevClass) {
    let _this = this;
    rightTreeNodes.forEach(function(node) {
      if (node.type === 'master') {
        _this._updateTypeRightTree(node.get('children'), recordsDevClass);
        node.set('copyChildren', node.get('children'));
      } else {
        let classData = recordsDevClass.findBy('name', node.className);
        node.set('type', classData.get('stereotype'));
        node.set('a_attr', { title: classData.get('stereotype') + ' ' + classData.get('name') });
      }
    });
  },

  /**
    Method for restoring tree nodes.
    @method _restorationNodeTree
  */
  _restorationNodeTree(nodeArray) {
    let _this = this;
    nodeArray.forEach(function(node) {
      if (node.type === 'master' || node.type === 'desk') {
        node.set('children', node.get('copyChildren'));
        _this._restorationNodeTree(node.get('children'));
      }
    });
  },

  actions: {

    /**
      Handles move node from left in right jsTree.

      @method actions.removeLeftNode
    */
    moveRightHighlighted() {
      let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
      let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
      if (jstreeSelectedNodesLeft.length === 0 || jstreeSelectedNodesRight.length === 0) {
        return;
      }

      let leftNode = jstreeSelectedNodesLeft[0].original;
      this.get('jstreeActionReceiverRight').send('createNode', jstreeSelectedNodesRight[0], FdViewAttributesTree.create({
        text: leftNode.get('text'),
        type: leftNode.get('type'),
        name: leftNode.get('name'),
        idNode: leftNode.get('idNode'),
        a_attr: leftNode.get('a_attr')
      }));
    },

    /**
      Handles remove node from left jsTree.

      @method actions.removeLeftNode
    */
    removeLeftNode() {
      let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
      if (jstreeSelectedNodesLeft.length === 0) {
        return;
      }

      // TODO remove from BD.
      this.get('jstreeActionReceiverLeft').send('deleteNode', jstreeSelectedNodesLeft[0]);
      this.set('jstreeSelectedNodesLeft', Ember.A());
    },

    /**
      Handles create new class left jsTree.

      @method actions.addLeftClass
    */
    addLeftClass() {
      this.transitionToRoute('fd-class-edit-form.new');
    },

    /**
      Handles add edit form for class in left jsTree.

      @method actions.addLeftListForm
    */
    addLeftEditForm() {
      let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
      if (jstreeSelectedNodesLeft.length === 0) {
        return;
      }

      let selectedNode = jstreeSelectedNodesLeft[0];
      let classId = selectedNode.original.get('idNode');

      // TODO fd-editform-constructor don't work. Need update queryParams.
      this.transitionToRoute('fd-editform-constructor', {
        queryParams: {
          classId: classId,
        }
      });
    },

    /**
      Handles add list form for class in left jsTree.

      @method actions.addLeftListForm
    */
    addLeftListForm() {
      let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
      if (jstreeSelectedNodesLeft.length === 0) {
        return;
      }

      let selectedNode = jstreeSelectedNodesLeft[0];
      let classId = selectedNode.original.get('idNode');

      this.transitionToRoute('fd-visual-listform', {
        queryParams: {
          form: undefined,
          class: classId,
        }
      });
    },

    /**
      Handles edit node left jsTree.

      @method actions.editLeftNode
    */
    editLeftNode() {
      let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
      if (jstreeSelectedNodesLeft.length === 0) {
        return;
      }

      let selectedNode = jstreeSelectedNodesLeft[0];
      let nodeId = selectedNode.original.get('idNode');

      switch (selectedNode.original.get('type')) {
        case '«listform»':
          this.transitionToRoute('fd-visual-listform', {
            queryParams: {
              form: nodeId,
              class: undefined,
            },
          });
          break;
        case '«editform»':
          this.transitionToRoute('fd-editform-constructor', nodeId);
          break;
        case 'implementations':
        case 'notStored':
          this.transitionToRoute('fd-class-edit-form', nodeId);
          break;
      }
    },

    /**
      Handles open class list form.

      @method actions.listLeft
    */
    listLeft() {
      this.transitionToRoute('fd-class-list-form');
    },

    /**
      Handles edit node left jsTree.

      @method actions.editRightNode
    */
    editRightNode() {
      //TODO filling out tabs.
    },

    /**
      Handles remove node from right jsTree.

      @method actions.removeRightNode
    */
    removeRightNode() {
      let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
      if (jstreeSelectedNodesRight.length === 0) {
        return;
      }

      this.get('jstreeActionReceiverRight').send('deleteNode', jstreeSelectedNodesRight[0]);
      this.set('jstreeSelectedNodesRight', Ember.A());
    },

    /**
      Handles add node in right jsTree.

      @method actions.removeRightNode
    */
    addFolderNode() {
      let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
      if (jstreeSelectedNodesRight.length === 0) {
        return;
      }

      let folderName = 'NewFolder';
      let selectedNodes = jstreeSelectedNodesRight[0].original.get('copyChildren');
      let foundName = selectedNodes.findBy('text', folderName);
      let folderIndex = '';
      while (!Ember.isNone(foundName)) {
        folderIndex++;
        foundName = selectedNodes.findBy('text', folderName + folderIndex);
      }

      let folder = FdViewAttributesTree.create({
        text: folderName + folderIndex,
        type: 'master',
        children: Ember.A(),
        copyChildren: Ember.A()
      });

      selectedNodes.pushObject(folder);
      this.get('jstreeActionReceiverRight').send('createNode', jstreeSelectedNodesRight[0], folder);
    },

    upRightNode() {
      let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
      if (jstreeSelectedNodesRight.length === 0) {
        return;
      }

      let indexSelectedRight = this.get('indexSelectedRight');
      let index = indexSelectedRight.index;
      let array = indexSelectedRight.array;
      let prev = index - 1;
      let node = array[index];
      let prevNode = array[prev];

      array.replace(prev, 1, node);
      array.replace(index, 1, prevNode);

      // Restoration tree.
      let dataTree = this.get('jsonRightTreeNodes');
      dataTree.set('children', dataTree.get('copyChildren'));
      this._restorationNodeTree(this.get('jsonRightTreeNodes.copyChildren'));
      Ember.set(this, 'jsonRightTreeNodes', dataTree);

      this.get('jstreeActionReceiverRight').send('redraw');
      this.get('jstreeActionReceiverRight').send('deselectNode', indexSelectedRight.arrayId[index]);
      this.get('jstreeActionReceiverRight').send('selectNode', indexSelectedRight.arrayId[prev]);
    },

    downRightNode() {
      let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
      if (jstreeSelectedNodesRight.length === 0) {
        return;
      }

      let indexSelectedRight = this.get('indexSelectedRight');
      let index = indexSelectedRight.index;
      let array = indexSelectedRight.array;
      let next = index + 1;
      let node = array[next];
      let nextNode = array[index];

      array.replace(index, 1, node);
      array.replace(next, 1, nextNode);

      // Restoration tree.
      let dataTree = this.get('jsonRightTreeNodes');
      dataTree.set('children', dataTree.get('copyChildren'));
      this._restorationNodeTree(this.get('jsonRightTreeNodes.copyChildren'));
      Ember.set(this, 'jsonRightTreeNodes', dataTree);

      this.get('jstreeActionReceiverRight').send('redraw');
      this.get('jstreeActionReceiverRight').send('deselectNode', indexSelectedRight.arrayId[index]);
      this.get('jstreeActionReceiverRight').send('selectNode', indexSelectedRight.arrayId[next]);
    },

    saveTree() {
      /*let rightTree = this.jsonRightTreeNodes[0].nodes;
      while (rightTree && rightTree.length === 1 && rightTree[0].caption === 'Рабочий стол') {
        rightTree = rightTree[0].nodes;
      }

      let builder = new Query.Builder(this.store)
      .from('fd-dev-class')
      .select('name,stereotype,containersStr,caption,stage.id')
      .byId(this.model.id);
      this.store.queryRecord('fd-dev-class', builder.build()).
      //this.get('store').findRecord('fd-dev-class', this.model.id).
      then(function(record) {
        //let stagePk = _this.get('currentProjectContext').getCurrentStagePk();
        record.set('containersStr', rightTree);
        //record.set('stage', stagePk);
        record.save().then(
          function(data) {
            alert('Success' + data);
          },
          function(data) {
            alert('Error' + data);
          }
        );
      });*/
      /*alert('Save');*/
    },

    openProcessEditorForm() {

    },

    openGenerationForm() {

    },

    closeRightpanel() {
      Ember.$('.closable.panel-left').toggle(500);

      if (this.allAttrsHidedn) {
        this.set('popupMessage', t('forms.fd-appstruct-form.close-panel-btn-caption'));
        Ember.$('.panel-wrapper .panel-right').css('width', '50%');
      } else {
        this.set('popupMessage', t('forms.fd-appstruct-form.show-panel-btn-caption'));
        Ember.$('.panel-wrapper .panel-right').css('width', '100%');
      }

      this.toggleProperty('allAttrsHidedn');
    }

  }

});
