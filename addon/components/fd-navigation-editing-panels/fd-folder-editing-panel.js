import Component from '@ember/component';
import layout from '../../templates/components/fd-navigation-editing-panels/fd-folder-editing-panel';

export default Component.extend({
  layout,

  /**
    Node data.

    @property node
    @type Object
    @default undefined
  */
  node: undefined,

  actions: {

    /**
      Open create sub form panel.

      @method actions.addSubForm
    */
    addSubForm() {
      this.get('openPanelCreateSubFormAction')();
    },

    /**
      Create sub folder node.

      @method actions.addSubFolder
    */
    addSubFolder() {
      let node = this.get('node');
      this.get('addSubFolderAction')(node);
    }
  }
});
