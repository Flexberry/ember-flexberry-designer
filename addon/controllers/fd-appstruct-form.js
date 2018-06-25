import Ember from 'ember';
import FdViewAttributesTree from '../objects/fd-view-attributes-tree';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import { translationMacro as t } from 'ember-i18n';

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
   Service that triggers objectlistview events.

   @property objectlistviewEventsService
   @type {Class}
   @default Ember.inject.service()
   */
  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

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
    Nodes in right jsTree for edit propertys.

    @property selectedElementForEdit
    @type Object
   */
  selectedElementForEdit: undefined,

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
      icon: 'folder icon'
    },
    '#': {
      max_children: 1
    }
  })),

  _modelObserver: Ember.on('init', Ember.observer('model', function() {
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
      this.set('selectedElementForEdit', selectedNode.original);
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
    if (jstreeSelectedNodesRight.length === 0 || jstreeSelectedNodesRight[0].type === 'desk') {
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
      upRightNodeDisabled: upRightNodeDisabled,
      downRightNodeDisabled: downRightNodeDisabled
    };
  }),

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

  /**
    Method for update data in tree.
    @method _updateTreeData
  */
  _updateTreeData() {
    let dataTree = this.get('model.rightTreeNodes');
    this._restorationNodeTree(dataTree);

    this.get('jstreeActionReceiverRight').send('redraw');
  },

  actions: {

    /**
      Handles move node from left in right jsTree.

      @method actions.moveRightHighlighted
    */
    moveRightHighlighted() {
      let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
      let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
      if (jstreeSelectedNodesLeft.length === 0 || jstreeSelectedNodesRight.length === 0) {
        return;
      }

      // Find free id.
      let folderId = 0;
      let foundId = this.get('jstreeObjectRight').jstree(true).get_node('move' + folderId);
      while (foundId) {
        folderId++;
        foundId = this.get('jstreeObjectRight').jstree(true).get_node('move' + folderId);
      }

      let leftSelectedNodes = jstreeSelectedNodesLeft[0].original;
      let rightSelectedNodes = jstreeSelectedNodesRight[0].original.get('copyChildren');
      let newNode = FdViewAttributesTree.create({
        text: leftSelectedNodes.get('text'),
        type: leftSelectedNodes.get('type'),
        caption: leftSelectedNodes.get('caption'),
        className: leftSelectedNodes.get('name'),
        description: leftSelectedNodes.get('description'),
        a_attr: leftSelectedNodes.get('a_attr'),
        id: 'move' + folderId
      });

      rightSelectedNodes.pushObject(newNode);
      this.get('jstreeActionReceiverRight').send('createNode', jstreeSelectedNodesRight[0], newNode);
      this.get('jstreeActionReceiverRight').send('openNode', jstreeSelectedNodesRight[0]);
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

      // Delete node from parent copyChildren.
      let parentSelectedNode = this.get('jstreeObjectRight').jstree(true).get_node(jstreeSelectedNodesRight[0].parent);
      let arrayChildrensParentSelectedNode = parentSelectedNode.original.get('copyChildren');
      let selectedObject = arrayChildrensParentSelectedNode.findBy('text', jstreeSelectedNodesRight[0].text);
      arrayChildrensParentSelectedNode.removeObject(selectedObject);

      this.get('jstreeActionReceiverRight').send('deleteNode', jstreeSelectedNodesRight[0]);
      this.set('jstreeSelectedNodesRight', Ember.A());
    },

    /**
      Handles add node in right jsTree.

      @method actions.addFolderNode
    */
    addFolderNode() {
      let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
      if (jstreeSelectedNodesRight.length === 0) {
        return;
      }

      // Find free name.
      let folderName = 'NewFolder';
      let selectedNodes = jstreeSelectedNodesRight[0].original.get('copyChildren');
      let foundName = selectedNodes.findBy('text', folderName);
      let folderIndex = '';
      while (!Ember.isNone(foundName)) {
        folderIndex++;
        foundName = selectedNodes.findBy('text', folderName + folderIndex);
      }

      // Find free id.
      let folderId = 0;
      let foundId = this.get('jstreeObjectRight').jstree(true).get_node('NF' + folderId);
      while (foundId) {
        folderId++;
        foundId = this.get('jstreeObjectRight').jstree(true).get_node('NF' + folderId);
      }

      let folder = FdViewAttributesTree.create({
        text: folderName + folderIndex,
        type: 'master',
        children: Ember.A(),
        copyChildren: Ember.A(),
        id: 'NF' + folderId
      });

      selectedNodes.pushObject(folder);

      // Restoration tree.
      this._updateTreeData();
      this.get('jstreeActionReceiverRight').send('openNode', jstreeSelectedNodesRight[0]);
    },

    /**
      Handles up move tree node.

      @method actions.upRightNode
    */
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
      this._updateTreeData();
    },

    /**
      Handles down move tree node.

      @method actions.downRightNode
    */
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
      this._updateTreeData();
    },

    /**
      Handles save in right tree.

      @method actions.saveTree
    */
    saveTree() {
      let dataTree = this.get('model.rightTreeNodes')[0];
      let dataForSave = dataTree.get('copyChildren');

      let record = this.get('model.applications')[0];
      record.set('containersStr', dataForSave);

      if (Ember.isNone(record.get('caption'))) {
        record.set('caption', record.get('name'));
      }

      let _this = this;
      this.get('objectlistviewEventsService').setLoadingState('loading');
      record.save().then(() => {
        _this.get('objectlistviewEventsService').setLoadingState('');
      });
    },

    /**
      Handles open process editor form.

      @method actions.openProcessEditorForm
    */
    openProcessEditorForm() {
      // TODO ProcessEditorForm don't work.
    },

    /**
      Handles open generation form.

      @method actions.openGenerationForm
    */
    openGenerationForm() {
      this.transitionToRoute('fd-generation-process-form.new');
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
