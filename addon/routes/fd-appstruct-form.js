import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Route.extend({

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  model: function() {
    let stagePk = this.get('currentProjectContext').getCurrentStage();
    let _this = this;
    let modelHash = {
      implementations: undefined,
      forms: undefined,
      applications: undefined
    };

    // TODO: сразу вычитывать нужные структуры без необходимости переделки их на клиенте. Пусть будет несколько параллельных запросов на сервер.
    return new Ember.RSVP.Promise(function (resolve) {
      // null or «implementation»
      let stagePkPredicate = new Query.SimplePredicate('stage.id', FilterOperator.Eq, stagePk);
      let implementationStereorypePredicate = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«implementation»');
      let emptyStereorypePredicate = new Query.SimplePredicate('stereotype', FilterOperator.Eq, null);
      let stereotypePredicate = new Query.ComplexPredicate(Query.Condition.Or, implementationStereorypePredicate, emptyStereorypePredicate);
      let implementationPredicate = new Query.ComplexPredicate(Query.Condition.And, stagePkPredicate, stereotypePredicate);

      let builderImplementation = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,stage.id').
      where(implementationPredicate);

      let promiseImplementation = _this.store.query('fd-dev-class', builderImplementation.build()).then((result) => {
        modelHash.implementations = result;
      });

      // «listform», «editform»
      let listformStereorypePredicate = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«listform»');
      let editformStereorypePredicate = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«editform»');
      let formsStereotypePredicate = new Query.ComplexPredicate(Query.Condition.Or, listformStereorypePredicate, editformStereorypePredicate);
      let formsPredicate = new Query.ComplexPredicate(Query.Condition.And, stagePkPredicate, formsStereotypePredicate);
      let builderForms = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,formViews,formViews.view,formViews.view.class.id,stage.id').
      where(formsPredicate);

      let promiseForms = _this.store.query('fd-dev-class', builderForms.build()).then((result) => {
        modelHash.forms = result;
      });

      // «application»
      let applicationStereorypePredicate = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«application»');
      let applicationPredicate = new Query.ComplexPredicate(Query.Condition.And, stagePkPredicate, applicationStereorypePredicate);

      let builderApplication = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,containersStr,stage.id').
      where(applicationPredicate);

      let promiseApplication = _this.store.query('fd-dev-class', builderApplication.build()).then((result) => {
        modelHash.applications = result;
      });

      Ember.RSVP.all([promiseImplementation, promiseForms, promiseApplication]).then(() => {
        resolve(modelHash);
      });
    });
  },
});
