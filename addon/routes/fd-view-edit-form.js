import Ember from 'ember';
import { getTreeNode } from '../utils/fd-get-view-tree-node';

export default Ember.Route.extend({

  /**
   Service that triggers objectlistview events.

   @property objectlistviewEventsService
   @type {Class}
   @default Ember.inject.service()
   */
  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

  model: function(arg) {
    let store = this.get('store');

    // Get attribute view.
    var recordsView = store.peekAll('fd-dev-view');
    let data = recordsView.findBy('id', arg.id);

    // Get current class.
    let devClass = data.get('class');
    let idDevClass = devClass.get('id');

    // Get attributes tree current class.
    let tree = getTreeNode(store, idDevClass, 'node_', data);

    data.set('data.attributesTree', tree);
    this.get('objectlistviewEventsService').setLoadingState('');

    return data;
  }
});
