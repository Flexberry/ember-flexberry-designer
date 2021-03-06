import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import { isEqual } from '@ember/utils';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import $ from 'jquery'
import FdAppStructTree from '../objects/fd-appstruct-tree';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import { translationMacro as t } from 'ember-i18n';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';
import { restorationNodeTree, findFreeNodeTreeID, findFreeNodeTreeNameIndex } from '../utils/fd-metods-for-tree';
import { getNewFormCaption, getNewFormDescription } from '../utils/fd-create-form-properties';
import { updateClassOnDiagram } from '../utils/fd-update-class-diagram';

export default EditFormController.extend(
FdWorkPanelToggler,
FdFormUnsavedData, {
  /**
    @private
    @property _originalData
    @type String
    @default ''
  */
  _originalData: '',

  /**
    @property store
    @type Service
  */
  store: service(),

  /**
    @property currentProjectContext
    @type Service
  */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Setting off for 'openProcessEditorForm' buttons.

    @property processMethodologyValue
    @type Boolean
    @default false
  */
  processMethodologyValue: false,

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
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: service(),

  allAttrsHidedn: false,

  /**
    Show question of removal.

    @private
    @property _showModalDialog
    @type Boolean
    @default false
  */
  _showModalDialog: false,

  /**
    Included plugins for left jsTree.

    @property pluginsLeft
    @type String
    @default 'wholerow, types, sort, search'
   */
  pluginsLeft: 'wholerow, types, sort, search',

  /**
    Included plugins for right jsTree.

    @property pluginsRight
    @type String
    @default 'wholerow, types, search'
   */
  pluginsRight: 'wholerow, types, search',

  /**
    Selected nodes in left jsTree.

    @property jstreeSelectedNodesLeft
    @type Array
    @default []
   */
  jstreeSelectedNodesLeft: A(),

  /**
    Selected nodes in right jsTree.

    @property jstreeSelectedNodesRight
    @type Array
    @default []
   */
  jstreeSelectedNodesRight: A(),

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
  typesOptions: computed(() => ({
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
    'folder': {
      icon: 'folder icon'
    },
    '#': {
      max_children: 1
    },
    'url': {
      icon: 'globe icon'
    }
  })),

  /**
    Data for search tree node.

    @property searchTermLeft
    @type String
    @default ''
   */
  searchTermLeft: '',

  /**
    Data for search tree node.

    @property searchTermRight
    @type String
    @default ''
   */
  searchTermRight: '',

  /**
    Search settings for jsTree.

    @property searchOptions
    @type Object
  */
  searchOptions: computed(() => ({
    show_only_matches: true
  })),

  /**
    Flag: indicates whether to show close button.

    @property singleModeStage
    @type Boolean
    @default false
   */
  singleModeStage: false,

  _modelObserver: on('init', observer('model', function () {
    // Reset selection.
    this.set('jstreeSelectedNodesLeft', A());
    this.set('jstreeSelectedNodesRight', A());
    this.set('selectedElementForEdit', undefined);
  })),

  /**
    Update text in node.

    @method selectedElementCaptionObserver
  */
  selectedElementCaptionObserver: observer('selectedElementForEdit.caption', function() {
    let selectedElement = this.get('selectedElementForEdit');
    if (isNone(selectedElement)) {
      return;
    }

    if (selectedElement.get('type') !== 'folder' && selectedElement.get('type') !== 'desk') {
      let caption = selectedElement.get('caption');
      if (caption !== '' && !isNone(caption)) {
        selectedElement.set('text', caption);
      } else {
        selectedElement.set('text', selectedElement.get('className'));
      }
    }
  }),

  /**
    Redraw text in node.

    @method selectedElementTextObserver
  */
  selectedElementTextObserver: observer('selectedElementForEdit.text', function() {
    let selectedElement = this.get('selectedElementForEdit');
    if (isNone(selectedElement)) {
      return;
    }

    this.get('jstreeActionReceiverRight').send('renameNode', selectedElement.get('id'), selectedElement.get('text'));
  }),

  /**
    Handles changes in jstreeSelectedNodesLeft.

    @method jstreeSelectedNodesLeftObserver
  */
  _jstreeSelectedNodesLeftObserver: observer('jstreeSelectedNodesLeft', function() {
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
  _jstreeSelectedNodesRightObserver: observer('jstreeSelectedNodesRight', function() {
    let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
    if (jstreeSelectedNodesRight.length === 0) {
      this.set('addRightNodeDisabled', 'disabled');
      this.set('editRightNodeDisabled', 'disabled');
      this.set('removeRightNodeDisabled', 'disabled');
      this.set('addFolderNodeDisabled', 'disabled');
    } else {
      let selectedNode = jstreeSelectedNodesRight[0];
      this.set('selectedElementForEdit', selectedNode.original);
      let typeNode = selectedNode.original.type;

      if (typeNode === '«listform»' || typeNode === '«editform»' || typeNode === 'url') {
        this.set('addRightNodeDisabled', 'disabled');
        this.set('addFolderNodeDisabled', 'disabled');
        this.set('removeRightNodeDisabled', '');
        this.set('editRightNodeDisabled', '');
      } else {
        this.set('addFolderNodeDisabled', '');
        if (typeNode === 'desk') {
          this.set('removeRightNodeDisabled', 'disabled');
          this.set('editRightNodeDisabled', 'disabled');
          this.set('addRightNodeDisabled', '');
        } else {
          this.set('addRightNodeDisabled', '');
          this.set('removeRightNodeDisabled', '');
          this.set('editRightNodeDisabled', '');
        }
      }
    }
  }),

  /**
    Handles changes in jstreeSelectedNodesRight and jstreeSelectedNodesLeft.

    @method _jstreeSelectedNodesObserver
  */
  _jstreeSelectedNodesObserver: observer('jstreeSelectedNodesLeft', 'jstreeSelectedNodesRight', function() {
    let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
    let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
    if (jstreeSelectedNodesRight.length === 0 || jstreeSelectedNodesLeft.length === 0) {
      return;
    }

    let jstreeSelectedNodesRightType = jstreeSelectedNodesRight[0].original.type;
    let jstreeSelectedNodesLeftType = jstreeSelectedNodesLeft[0].original.type;
    if ((jstreeSelectedNodesLeftType !== '«listform»' && jstreeSelectedNodesLeftType !== '«editform»') ||
      jstreeSelectedNodesRightType === '«listform»' || jstreeSelectedNodesRightType === '«editform»' ||
      jstreeSelectedNodesRightType === 'url' || jstreeSelectedNodesRightType === 'desk') {
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
  indexSelectedRight: computed('jstreeSelectedNodesRight', function() {
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

  closeRightPanelBtnSelector: 'div.panel-toolbar > div > button.close-panel-btn',

  setCloseRightPanelBtnMessage() {
    if (this.allAttrsHidedn) {
      this.set('closeRightPanelBtnMessage', t('forms.fd-appstruct-form.show-panel-btn-caption'));
    } else {
      this.set('closeRightPanelBtnMessage', t('forms.fd-appstruct-form.close-panel-btn-caption'));
    }
  },

  actions: {
    /**
      Close current form, go back.

      @method actions.close
    */
    close() {
      history.back();
    },

    /**
      Save changes and close form

      @method actions.closeWithSaving
    */
    closeWithSaving() {
      this.send('saveTree', true);
    },

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

      let nodeId = findFreeNodeTreeID('move', 0, this.get('jstreeObjectRight'));
      let leftSelectedNodes = jstreeSelectedNodesLeft[0].original;
      let rightSelectedNodes = jstreeSelectedNodesRight[0].original.get('copyChildren');
      let newNode = FdAppStructTree.create({
        text: leftSelectedNodes.get('text'),
        type: leftSelectedNodes.get('type'),
        caption: leftSelectedNodes.get('caption'),
        className: leftSelectedNodes.get('name'),
        description: leftSelectedNodes.get('description'),
        a_attr: leftSelectedNodes.get('a_attr'),
        id: 'move' + nodeId
      });

      rightSelectedNodes.pushObject(newNode);
      this.get('jstreeActionReceiverRight').send('createNode', jstreeSelectedNodesRight[0], newNode);
      this.get('jstreeActionReceiverRight').send('openNode', jstreeSelectedNodesRight[0]);
    },

    /**
      Handles remove node from left jsTree.

      @method actions.removeLeftNode
    */
    removeLeftNode(approve) {
      if (approve) {
        let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
        let classId = jstreeSelectedNodesLeft[0].original.idNode;
        let store = this.get('store');
        let allClasses = store.peekAll('fd-dev-class');
        let forms = allClasses.filterBy('formViews.firstObject.view.class.id', classId);
        if (forms.length === 0) {
          this.get('jstreeActionReceiverLeft').send('deleteNode', jstreeSelectedNodesLeft[0]);
          this.set('jstreeSelectedNodesLeft', A());
          let deletedClass = allClasses.findBy('id', classId);
          deletedClass.destroyRecord();
        } else {
          this.set('error', new Error(this.get('i18n').t('forms.fd-appstruct-form.delete-error')));
        }
      } else {
        this.set('_showModalDialog', true);
      }
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
      this.get('appState').loading();

      let jstreeSelectedNodesLeft = this.get('jstreeSelectedNodesLeft');
      if (jstreeSelectedNodesLeft.length === 0) {
        return;
      }

      let _this = this;
      run.next(_this, () => {
        let selectedNode = jstreeSelectedNodesLeft[0];
        let classId = selectedNode.original.get('idNode');

        let store = this.get('store');
        let currentStage = this.get('currentProjectContext').getCurrentStageModel();

        let devClass = store.peekRecord('fd-dev-class', classId);
        let baseCaption = devClass.get('name') || devClass.get('nameStr');
        let newCaption = getNewFormCaption(store, baseCaption, 'E');
        let newDescription = getNewFormDescription(newCaption);

        store.createRecord('fd-dev-class', {
          stage: currentStage,
          caption: newCaption,
          description: newDescription,
          name: newCaption,
          nameStr: newCaption,
          stereotype: '«editform»'
        }).save().then(savedDevClass => {
          store.createRecord('fd-dev-view', {
            class: devClass,
            name: newCaption,
            definition: A()
          }).save().then(savedDevView => {
            store.createRecord('fd-dev-form-view', {
              class: savedDevClass,
              view: savedDevView,
              orderNum: 1
            }).save().then(() => {
              updateClassOnDiagram.call(_this, store, savedDevClass);
              this.get('appState').reset();
              this.transitionToRoute('fd-editform-constructor', savedDevClass.get('id'));
            }, (error) => {
              this.get('appState').reset();
              this.set('error', error);
            });
          }, (error) => {
            this.get('appState').reset();
            this.set('error', error);
          });
        }, (error) => {
          this.get('appState').reset();
          this.set('error', error);
        });
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

      this.transitionToRoute('fd-listform-constructor', {
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
          this.transitionToRoute('fd-listform-constructor', {
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
      Handles add url node.

      @method actions.addUrlNode
    */
    addUrlNode() {
      let jstreeSelectedNodesRight = this.get('jstreeSelectedNodesRight');
      if (jstreeSelectedNodesRight.length === 0) {
        return;
      }

      let selectedNodes = jstreeSelectedNodesRight[0].original.get('copyChildren');
      let urlIndex = findFreeNodeTreeNameIndex('NewUrl', '', selectedNodes, 'text');
      let urlId = findFreeNodeTreeID('NU', 0, this.get('jstreeObjectRight'));

      let urlValue = FdAppStructTree.create({
        text: 'NewUrl' + urlIndex,
        type: 'url',
        id: 'NU' + urlId,
        caption: 'NewUrl' + urlIndex,
        description: '',
        url: '',
        a_attr: { title: 'url' }
      });

      selectedNodes.pushObject(urlValue);

      // Restoration tree.
      this._updateTreeData();
      this.get('jstreeActionReceiverRight').send('openNode', jstreeSelectedNodesRight[0]);
    },

    /**
      Handles edit node right jsTree.

      @method actions.editRightNode
    */
    editRightNode() {
      this.send('toggleConfigPanel', { dataTab: 'second' }, 1);
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
      this.set('jstreeSelectedNodesRight', A());
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

      let selectedNodes = jstreeSelectedNodesRight[0].original.get('copyChildren');
      let folderIndex = findFreeNodeTreeNameIndex('NewFolder', '', selectedNodes, 'text');
      let folderId = findFreeNodeTreeID('NF', 0, this.get('jstreeObjectRight'));

      let folder = FdAppStructTree.create({
        text: 'NewFolder' + folderIndex,
        type: 'folder',
        children: A(),
        copyChildren: A(),
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
      @param {Boolean} close If `true`, the `close` action will be run after saving.
    */
    saveTree(close) {
      let dataTree = this.get('model.rightTreeNodes')[0];
      let dataForSave = dataTree.get('copyChildren');

      let record = this.get('model.applications')[0];
      record.set('containersStr', dataForSave);

      if (isNone(record.get('caption'))) {
        record.set('caption', record.get('name'));
      }

      let _this = this;
      this.get('appState').loading();
      record.save().then(() => {
        _this.get('objectlistviewEventsService').setLoadingState('');
        this.saveDataToOriginal();
        if (close) {
          this.send('close');
        }
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

    closeRightPanel() {
      $('.closable.panel-left').toggle(500);

      this.toggleProperty('allAttrsHidedn');

      this.setCloseRightPanelBtnMessage();

      if (this.allAttrsHidedn) {
        $('.panel-wrapper .panel-right').css('width', '100%');
      } else {
        $('.panel-wrapper .panel-right').css('width', '50%');
      }
    }
  },

  /**
    This method run non ember data saved when model is loaded

    @method saveOriginalData
  */
  originalDataInit: function () {
    run.next(this, () => {
      this.saveDataToOriginal();
    });
  },

  /**
    Save fields before changes

    @method saveOriginalData
  */
  saveDataToOriginal: function () {
    let originalDataString = this._getStringifyModel();
    this.set('_originalData', originalDataString);
  },

  /**
    Cancel form data changes for unsaved data check pass

    @method clearDirtyAttributes
  */
  clearDirtyAttributes: function () {
    this._applyDirtyAttributesAsOrigin();
  },

  /**
    Check if fields changed, but unsaved

    @method findUnsavedFormData
  */
  findUnsavedFormData: function () {
    let checkResult = false;
    let originalDataString = this.get('_originalData');
    let currentDataString = this._getStringifyModel();
    if (!isEqual(originalDataString, currentDataString)) {
      checkResult = true;
    }

    return checkResult;
  },

  /**
    Method for update data in tree.
    @method _updateTreeData
    @private
  */
  _updateTreeData() {
    let dataTree = this.get('model.rightTreeNodes');
    restorationNodeTree(dataTree, {}, A(['folder', 'desk']), true);

    this.get('jstreeActionReceiverRight').send('redraw');
  },

  /**
    Save current dirty data as origin for next equal check origin and current data

    @method _applyDirtyAttributesAsOrigin
    @private
  */
  _applyDirtyAttributesAsOrigin() {
    this.saveDataToOriginal();
  },

  /**
    Get model data in string

    @method _getStringifyModel
  */
  _getStringifyModel() {
    let rightTreeNodes = this.get('model.rightTreeNodes')[0];
    let rightTreeNodesString = JSON.stringify(rightTreeNodes);

    let applications = this.get('model.applications')[0];
    let applicationsString = JSON.stringify(applications);

    let allDataString = rightTreeNodesString + applicationsString;

    return allDataString;
  },
});
