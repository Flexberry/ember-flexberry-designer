import Ember from 'ember';
import ModalApplicationRouteMixin from 'ember-flexberry/mixins/modal-application-route';
import { Query } from 'ember-flexberry-data';

const {
  Builder,
  FilterOperator,
  SimplePredicate,
} = Query;

export default Ember.Route.extend(ModalApplicationRouteMixin, {

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  activate: function() {
    let context = this.get('currentProjectContext');

    if (context.singleStageMode) {
      let store = this.get('store');
      let modelName = 'fd-dev-stage';
      let projectionName = 'Generator';

      let predicate = new SimplePredicate('id', FilterOperator.Eq, context.context.stage);

      let builder = new Builder(store)
      .from(modelName)
      .selectByProjection(projectionName)
      .where(predicate);

      store.query(modelName, builder.build()).then((result) => {
        if (result && result.get('length') !== undefined && result.get('length') === 1) {
          let stage = result.objectAt(0);
          context.setCurrentStage(stage);
          this.transitionTo('fd-appstruct-form');
        }
      });
    } else {
      this.transitionTo('fd-configuration-list-form');
    }
  }
});
