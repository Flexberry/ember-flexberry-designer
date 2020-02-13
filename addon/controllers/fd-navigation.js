import Controller from '@ember/controller';
import FdReadonlyProjectMixin from '../mixins/fd-readonly-project';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { isNone } from '@ember/utils';
import FdSheetCloseConfirm from '../mixins/fd-sheet-close-confirm';
import FdAppStructTree from '../objects/fd-appstruct-tree';
import { deserialize, serialize } from '../utils/transforms-utils/fd-containers-tree';
import FdPreloadStageMetadata from 'ember-flexberry-designer/utils/fd-preload-stage-metadata';

export default Controller.extend(FdSheetCloseConfirm, FdReadonlyProjectMixin, {
  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Service for managing the state of the application.

    @property appState
    @type AppStateService
  */
  appState: service(),

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Service for managing the state of the component.

    @property fdDialogService
    @type fdDialogService
  */
  fdDialogService: service('fd-dialog-service'),

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Object with flags indicates whether edit panel is readonly.

    @property readonlyMode
    @type Object
  */
  readonlyMode: undefined,

  /**
    Type settings for jsTree.

    @property typesOptions
    @type Object
  */
  typesOptions: computed(() => ({
    'folder': {
      icon: 'assets/images/folder.png'
    },
    'property': {
      icon: 'assets/images/form.png',
      max_children: 0
    },
    '#': {
      valid_children: ['folder']
    }
  })),

  /**
    Dnd settings for jsTree.

    @property typesOptions
    @type Object
  */
  dndOptions: computed(function() {
    return {
      'is_draggable': function () {
        return !this.get('readonlyMode');
      }.bind(this)
    }
  }),

  /**
    Indicates when application class is absent.

    @property applicationClassIsAbsent
    @type Boolean
  */
  applicationClassIsAbsent: computed('model.app', function() {
    return isNone(this.get('model.app'));
  }),

  /**
    Included plugins for jsTree.

    @property plugins
    @type String
    @default 'wholerow, types, search'
   */
  plugins: 'wholerow, types, search, dnd',

  actions: {

    /**
      Save 'selectedNode'.

       @method actions.save
    */
    save() {
      this._saveTree();
    },

    /**
      Off readonlyMode.

       @method actions.edit
    */
    edit() {
      this.set('readonlyMode', false);
    },

    /**
      Open sheet.

       @method actions.selectNodeAction
    */
    selectNodeAction(node) {
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'), node);
    },

    /**
      Add sub folder in tree.

       @method actions.addSubFolder
       @param {Object} node Jstree node.
    */
    addSubFolder(node) {
      let jstree = this.get('treeObject').jstree(true);
      let createData = this._findFreeNodeData(node, 'NewFolder', 'NF');
      let folder = FdAppStructTree.create({
        text: 'NewFolder' + createData.textIndex,
        type: 'folder',
        children: [],
        id: 'NF' + createData.idIndex
      });

      jstree.create_node(node, folder, 'last', null, true);
      jstree.open_node(node);
      this._saveTree();
    },

    /**
      Add sub form in tree.

       @method actions.addSubForm
       @param {Object} nodes Jstree nodes.
       @param {Object} selectedNode Selected node.
    */
    addSubForm(nodes, selectedNode) {
      let jstree = this.get('treeObject').jstree(true);
      nodes.forEach((node) => {
        let createData = this._findFreeNodeData(selectedNode, '', 'NP');
        node.set('id', 'NP' + createData.idIndex);
        jstree.create_node(selectedNode, node, 'last', null, true);
      });

      this.set('isAddMode', false);
      jstree.open_node(selectedNode);
      this._saveTree();
    },

    /**
      Add root folder in tree.

       @method actions.addRootFolder
    */
    addRootFolder() {
      let jstree = this.get('treeObject').jstree(true);
      let root = jstree.get_node('#');
      let createData = this._findFreeNodeData(root, 'NewFolder', 'NF');
      let folder = FdAppStructTree.create({
        text: 'NewFolder' + createData.textIndex,
        type: 'folder',
        children: [],
        id: 'NF' + createData.idIndex
      });

      jstree.create_node('#', folder, 'last', null, true);
      this._saveTree();
    },

    /**
      Handles moveNode jsTree.

       @method actions.moveNodeAction
    */
    moveNodeAction() {
      this._saveTree();
      this.get('fdSheetService').closeSheet(this.get('sheetComponentName'));
    },

    /**
      Handles create prototype button click.

       @method actions.createPrototype
    */
    createPrototype() {
      const stage = this.get('currentProjectContext').getCurrentStageModel();
      const adapter = getOwner(this).lookup('adapter:application');
      const data = { project: stage.get('id') };

      this.get('appState').loading();
      adapter.callFunction('Prototype', data, null, { withCredentials: true }).then((result) => {
        if (result.value) {
          FdPreloadStageMetadata.call(this, this.get('store'), this.get('currentProjectContext').getCurrentStage()).then(() =>
            this.get('currentProjectContext').getAutogeneratedSystemPromise()).then(() => {
              this.set('model', this.get('modelFunction')());
            }).finally(() => {
              this.get('appState').reset();
            });
        } else {
          this.get('appState').reset();
          this.get('fdDialogService').showErrorMessage({ message: this.get('i18n').t('forms.fd-navigation.create-prototype-error') });
        }
      }).catch(() => {
        this.get('appState').reset();
        this.get('fdDialogService').showErrorMessage({ message: this.get('i18n').t('forms.fd-navigation.create-prototype-error') });
      });
    },
  },

  /**
    Save navigation tree.

     @method _saveTree
  */
  _saveTree() {
    let app = this.get('model.app');
    if (isNone(app.get('caption'))) {
      app.set('caption', app.get('name'));
    }

    let jstree = this.get('treeObject').jstree(true);
    let root = jstree.get_node('#');
    let children = get(root, 'children').map((item) => {
      return jstree.get_node(item);
    });

    app.set('containersStr', serialize(children, get(jstree, '_model.data')));

    let _this = this;
    this.get('appState').loading();
    app.save().then((newApp) => {
      _this.set('model.tree', deserialize(newApp.get('containersStr')));
    }).catch((error) => {
      _this.get('fdDialogService').showErrorMessage(error.message);
    }).finally(() => {
      _this.get('appState').reset();
    });
  },

  /**
    Find free id and text in tree.

     @method _findFreeNodeData
     @param {String} node Tree node.
     @param {String} text Text part.
     @param {String} id Text part.
  */
  _findFreeNodeData(node, text, id) {
    let jstree = this.get('treeObject').jstree(true);
    let textChildren = get(node, 'children').map((item) => {
      return jstree.get_node(item).text;
    });

    let idIndex = 1;
    let foundId = jstree.get_node(id + idIndex)
    while (foundId) {
      idIndex++;
      foundId = jstree.get_node(id + idIndex)
    }

    let textIndex = 1;
    let foundText = textChildren.includes(text + textIndex);
    while (foundText) {
      textIndex++;
      foundText = textChildren.includes(text + textIndex);
    }

    return {
      textIndex: textIndex,
      idIndex: idIndex
    }
  }
});
