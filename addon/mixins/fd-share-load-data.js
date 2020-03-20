import Mixin from '@ember/object/mixin';
import FdPreloadStageMetadata from '../utils/fd-preload-stage-metadata';
import Builder from 'ember-flexberry-data/query/builder';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';

import { get } from '@ember/object';
import { getOwner } from '@ember/application';
import { isNone, isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import { schedule, later } from '@ember/runloop';
import { resolve } from 'rsvp';
import $ from 'jquery';

export default Mixin.create({
  /**
    Service for managing the state of the application.
    @property appState
    @type AppStateService
  */
  appState: service(),

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Configuration hash for this route's queryParams. [More info](https://www.emberjs.com/api/ember/release/classes/Route/properties/queryParams?anchor=queryParams).

    @property queryParams
    @type Object
   */
  queryParams: {
    gotostage: { refreshModel: true, as: 'gotostage' },
    gototype: { refreshModel: true, as: 'gototype' },
    gotoobj: { refreshModel: true, as: 'gotoobj' },
  },

  /**
    Id object from queryParams.

    @property selectObjectId
    @type String
  */
  selectObjectId: undefined,

  /**
   This hook is the first of the route entry validation hooks called when an attempt is made to transition into a route or one of its children.
   [More info](http://emberjs.com/api/classes/Ember.Route.html#method_beforeModel).

   @method beforeModel
   @param {Transition} transition
   @return {Promise}
 */
  beforeModel: function(transition) {
    let queryParams = get(transition, 'queryParams');
    if (isNone(queryParams) || Object.keys(queryParams).length === 0) {
      return resolve();
    }

    let gotostage = get(queryParams, 'gotostage');
    if (isBlank(gotostage)) {
      return resolve();
    }

    let currentProjectContext = this.get('currentProjectContext');
    let store = this.get('store');

    let modelName = 'fd-dev-stage';
    let predicate = new SimplePredicate('id', FilterOperator.Eq, gotostage);

    let builder = new Builder(store)
    .from(modelName)
    .selectByProjection('ListFormView')
    .where(predicate);

    this.get('appState').loading();
    return store.queryRecord(modelName, builder.build()).then((stage) => {
      currentProjectContext.setCurrentConfiguration(stage.get('configuration'));
      currentProjectContext.setCurrentStage(stage);

      return FdPreloadStageMetadata.call(this, store, currentProjectContext.getCurrentStage());
    })
    .then(() => currentProjectContext.getAutogeneratedSystemPromise())
    .then(() => {
      let gotoobj = get(queryParams, 'gotoobj')
      if (get(queryParams, 'gototype') === 'fd-dev-view') {
        let view = store.peekRecord('fd-dev-view', gotoobj);
        this.set('selectObjectId', view.get('class.id'));
      } else {
        this.set('selectObjectId', gotoobj);
      }

      return resolve();
    }).finally(() => {
      this.get('appState').reset();
    });
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](https://www.emberjs.com/api/ember/release/classes/Route/methods/setupController?anchor=setupController).

    @method setupController
    @param {Ember.Controller} controller
  */
  setupController(controller) {
    this._super(...arguments);

    let gototype = controller.get('gototype');
    let gotoobj = controller.get('gotoobj');
    let sheetComponentName = this.get('sheetComponentName');
    if (isBlank(gototype) || isBlank(gotoobj) || isBlank(sheetComponentName)) {
      return;
    }

    let object = this.get('store').peekRecord(`${gototype}`, gotoobj);
    let sheetItem = { data: object };

    schedule('afterRender', controller, function() {
      if (gototype === 'fd-dev-view') {
        this.get('fdSheetService').openSheet(this.get('sheetComponentName'), { data: object.get('class') } );
        sheetComponentName = 'view-sheet';
        sheetItem = object;
      }

      this.get('fdSheetService').openSheet(sheetComponentName, sheetItem);

      if ($('.ui.sidebar.main.menu').hasClass('visible')) {
        getOwner(controller).lookup('controller:application').send('toggleSidebar');
      }

      later(this, function() {
        this.get('fdSheetService').expand(sheetComponentName);
      }, 1000);
    });
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method model
  */
  resetController(controller) {
    this._super(...arguments);
    controller.set('gotostage', undefined);
    controller.set('gototype', undefined);
    controller.set('gotoobj', undefined);
  },
});
