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
    let store = this.get('store');
    let classPk = this.get('currentProjectContext').getCurrentClass();

    // Get attributes tree current class.
    let tree = getTreeNode(store, classPk, 'node_', data);

    data.set('data.attributesTree', tree);
    this.get('objectlistviewEventsService').setLoadingState('');

    return data;
  }
});
