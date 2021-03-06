import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import $ from 'jquery';
import { get } from '@ember/object';
import FdAttributesTree from '../objects/fd-attributes-tree';
import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode, getDetailView } from '../utils/fd-attributes-for-tree';

export default Route.extend(FdFormCheckTransitionMixin, {

  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: service(),

  model: function(arg) {
    let store = this.get('store');

    // Get attribute view.
    var recordsView = store.peekAll('fd-dev-view');
    let data = recordsView.findBy('id', arg.id);

    // Get current class.
    let devClass = data.get('class');
    let idDevClass = devClass.get('id');

    // Get attributes tree current class.
    let dataForBuildTree = getDataForBuildTree(store, idDevClass);

    // Set attributes tree.
    let treeEmpty = A([

      // Attribute - choose all.
      FdAttributesTree.create({
        text: '*',
        type: 'property',
      })
    ]);

    let treeAttributes = getClassTreeNode(treeEmpty, dataForBuildTree.classes);
    let treeMasters = getAssociationTreeNode(treeAttributes, dataForBuildTree.associations, 'node_');
    let treeDetails = getAggregationTreeNode(treeMasters, dataForBuildTree.aggregations);
    let detailView = getDetailView(dataForBuildTree.aggregations);
    let tree = A([
      FdAttributesTree.create({
        text: devClass.get('name'),
        type: 'class',
        id: 'class',
        idNode: idDevClass,
        children: treeDetails,
        copyChildren: treeDetails,
        state: {
          opened: true
        }
      })
    ]);

    this.get('appState').reset();

    return {
      view: data,
      tree: tree,
      detailsView: detailView
    };
  },

  /**
    A hook you can use to reset controller values either when the model changes or the route is exiting.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_resetController).

    @method resetController
    @param {Ember.Controller} controller
    @param {Boolean} isExisting
   */
  resetController(controller, isExiting) {
    this._super(...arguments);

    if (isExiting) {
      $('.full.height').off('click.fd-view-editform-constructor');
    }
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('routeName', this.get('routeName'));
    controller.set('parentRoute', this.get('router.url'));
    controller.set('searchTerm', '');
  },

  actions: {
    didTransition() {
      $('#example .flexberry-content').css('padding-bottom', 0);
      $('.flexberry-content > .ui.main.container').css('margin-bottom', 0);

      $('.full.height').on('click.fd-view-editform-constructor', (e) => {
        let table = $('.ui.table.fd-view-properties-table')[0];
        let buttons = $('.text-center > .ui.buttons')[0];
        let path = get(e, 'originalEvent.path') || [];
        if (path.indexOf(table) === -1 && path.indexOf(buttons) === -1) {
          this.get('controller').send('onAttributesClick');
        }
      });
    }
  }
});
