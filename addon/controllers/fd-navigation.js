import Controller from '@ember/controller';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import FdAppStructTree from '../objects/fd-appstruct-tree';
import { deserialize, serialize } from '../utils/transforms-utils/fd-containers-tree';
import FdPreloadStageMetadata from 'ember-flexberry-designer/utils/fd-preload-stage-metadata';

export default Controller.extend({
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
    Value selected nodes.

    @property selectedNodes
    @type Object
  */
  selectedNodes: A(),

  /**
    Value selected node.

    @property selectedNode
    @type Object
  */
  selectedNode: computed.alias('selectedNodes.firstObject'),

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Flag: indicates whether to show create editing panel.

    @property isAddMode
    @type Bool
    @default false
  */
  isAddMode: false,

  /**
    Custom button title.

    @property customButtonTitle
    @type String
    @default 'forms.fd-navigation.cancel'
  */
  customButtonTitle: 'forms.fd-navigation.cancel',

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
      Delete 'selectedNode'.

       @method actions.deleteNode
    */
    deleteNode() {
      let jstree = this.get('treeObject').jstree(true);
      let selectedNode = this.get('selectedNode');
      jstree.delete_node(selectedNode);

      this._saveTree();
      this.get('fdSheetService').closeSheet(this.get('sheetComponentName'));
    },

    /**
      Open sheet.

       @method actions.selectNodeAction
    */
    selectNodeAction() {
      this.set('isAddMode', false);
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'));
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
      Add sub folder in tree.

       @method actions.addSubFolder
       @param {Object} node jstree node
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
       @param {Object} nodes jstree nodes
    */
    addSubForm(nodes) {
      let jstree = this.get('treeObject').jstree(true);
      let selectedNode = this.get('selectedNode');
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
          throw new Error(this.get('i18n').t('forms.fd-navigation.create-prototype-error'));
        }
      }).catch(() => {
        this.get('appState').reset();
        throw new Error(this.get('i18n').t('forms.fd-navigation.create-prototype-error'));
      });
    },
  },

  init() {
    this._super(...arguments);

    this.get('fdSheetService').on('closeSheetTriggered', this, this.closeSheet);
  },

  /**
    Closing sheet.

     @method closeSheet
     @param {String} sheetName Sheet's dbName
  */
  closeSheet(sheetName) {
    let sheetComponentName = this.get('sheetComponentName');
    if (sheetComponentName === sheetName) {
      const treeObject = this.get('treeObject');
      if (treeObject) {
        let jstree = treeObject.jstree(true);
        jstree.deselect_node(this.get('selectedNode'));
        this.get('actionReceiver').send('redraw');
      }
    }
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
      _this.set('error', error);
    }).finally(() => {
      _this.get('appState').reset();
    });
  },

  /**
    Find free id and text in tree.

     @method _findFreeNodeData
     @param {String} node tree node
     @param {String} text text part
     @param {String} id text part
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
