import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ModalApplicationRouteMixin from 'ember-flexberry/mixins/modal-application-route';
import FdPreloadStageMetadata from 'ember-flexberry-designer/utils/fd-preload-stage-metadata';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import Builder from 'ember-flexberry-data/query/builder';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import { getOwner } from '@ember/application';
import { isNone, isEmpty } from '@ember/utils';
import { getExistingRecord } from 'ember-flexberry-designer/utils/get-user-setting';

export default Route.extend(ModalApplicationRouteMixin, {

  /**
    Service for managing the state of the application.
    @property appState
    @type AppStateService
  */
  appState: service(),

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Router service of current application.
    @property router
    @type RouterService
  */
  router: service(),

  activate: function() {
    let context = this.get('currentProjectContext');

    if (context.singleStageMode) {
      let store = this.get('store');
      let modelName = 'fd-dev-stage';

      let predicate = new SimplePredicate('id', FilterOperator.Eq, context.context.stage);

      let builder = new Builder(store)
      .from(modelName)
      .select('id,name,configuration.id')
      .where(predicate);

      this.get('appState').loading();
      store.query(modelName, builder.build()).then((result) => {
        if (result && result.get('length') !== undefined && result.get('length') === 1) {
          let stage = result.objectAt(0);
          context.setCurrentConfiguration(stage.get('configuration'));
          context.setCurrentStage(stage);
          FdPreloadStageMetadata.call(this, store, context.getCurrentStage()).then(() =>
            context.getAutogeneratedSystemPromise()).then(() => {
              if (this.get('controller.currentRouteName') === 'fd-appstruct-form') {
                this.refresh();
              } else {
                this.transitionTo('fd-appstruct-form');
              }

              this.get('appState').reset();
            });
        }
      });
    } else if (this.get('router.location.location.href') != null && this.get('router.location.location.href').split('?').length < 2) {
      this.transitionTo('index');
    }
  },

  actions: {
    /**
      @method actions.refreshRoute
    */
    refreshRoute() {
      this.refresh();
    },

    /**
      @method actions._exitProject
    */
    _exitProject() {
      this.transitionTo('fd-all-projects');
      let currentProjectContext = this.get('currentProjectContext');
      currentProjectContext.resetCurrentStage();
      const userService = getOwner(this).lookup('service:user');
      const store = this.get('store');

      let name = userService.getCurrentUserName();
      if (!isEmpty(name)) {
        return getExistingRecord(store, name).then(foundRecord => {
          if (!isNone(foundRecord)) {
            foundRecord.destroyRecord();
          }
        });
      }
    }
  }
});
