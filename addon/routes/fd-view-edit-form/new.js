import Ember from 'ember';
import { getTreeNode } from '../../utils/fd-get-view-tree-node';

export default Ember.Route.extend({
  modelProjection: 'EditFormView',
  modelName: 'fd-dev-view',
  templateName: 'fd-view-edit-form',

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

  model: function() {
    var data = this.store.createRecord(this.modelName);
    data.set('definition', Ember.A());

    let store = this.get('store');
    let recordsDevClass = store.peekAll('fd-dev-class');

    let classPk = this.get('currentProjectContext').getCurrentClass();
    let devClass = recordsDevClass.findBy('id', classPk);
    data.set('class', devClass);

    // Get attributes tree current class.
    let tree = getTreeNode(store, classPk, 'node_', data);

    this.get('objectlistviewEventsService').setLoadingState('');

    return {
      view: data,
      tree: tree
    };
  }
});
