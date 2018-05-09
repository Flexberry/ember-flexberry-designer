import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Route.extend({

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  model: function(params) {
    let stageId = this.get('currentProjectContext').getCurrentStage();
    let _this = this;
    let modelHash = {
      editform: undefined,
      dataobject: undefined,
      typemap: undefined,
      enums: undefined,
      types: undefined
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      // Load «editform».
      let loadClassesPromise = new Ember.RSVP.Promise(function (resolveLoadClasses, rejectLoadClasses) {
        let predicateEditformId = new Query.SimplePredicate('id', FilterOperator.Eq, params.id);

        let builderEditform = new  Builder(_this.store, 'fd-dev-class').
        select('id,name,caption,description,formViews,formViews.view,formViews.view.class,formViews.view.class.id').
        where(predicateEditformId);

        _this.store.query('fd-dev-class', builderEditform.build()).then((result) => {
          let editform = result.objectAt(0);
          modelHash.editform = editform;
          return editform;
        }, rejectLoadClasses).then((editform) => {
          // Load dataobject «implementation».
          let dataobjectId = editform.get('formViews').objectAt(0).get('view.class.id'); // TODO: Check array.
          let predicateDataobjectId = new Query.SimplePredicate('id', FilterOperator.Eq, dataobjectId);

          let builderDataobject = new  Builder(_this.store, 'fd-dev-class').
          select('id,name,caption,description').
          where(predicateDataobjectId);

          _this.store.query('fd-dev-class', builderDataobject.build()).then((resultDataobject) => {
            modelHash.dataobject = resultDataobject.objectAt(0);
            resolveLoadClasses(modelHash);
          }, rejectLoadClasses);
        }, reject);
      });

      // Stage with type map.
      let predicateId = new Query.SimplePredicate('id', FilterOperator.Eq, stageId);

      let builderStage = new  Builder(_this.store, 'fd-dev-stage').
      select('id,typeMapCSStr').
      where(predicateId);

      let loadTypemapPromise = _this.store.query('fd-dev-stage', builderStage.build()).then((result) => {
        let stage = result.objectAt(0);
        modelHash.typemap = stage.get('typeMapCSStr');
        return modelHash;
      }, reject);

      let predicateStageId = new Query.SimplePredicate('stage.id', FilterOperator.Eq, stageId);

      // Enums
      let predicateEnumerationStereorype = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«enumeration»');
      let predicateEnumeration = new Query.ComplexPredicate(Query.Condition.And, predicateStageId, predicateEnumerationStereorype);

      let builderEnumeration = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,stage.id').
      where(predicateEnumeration);

      let promiseEnumeration = _this.store.query('fd-dev-class', builderEnumeration.build()).then((result) => {
        modelHash.enums = result;
        return modelHash;
      }, reject);

      // Type
      let predicateTypeStereorype = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«type»');
      let predicateType = new Query.ComplexPredicate(Query.Condition.And, predicateStageId, predicateTypeStereorype);

      let builderType = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,stage.id').
      where(predicateType);

      let promiseType = _this.store.query('fd-dev-class', builderType.build()).then((result) => {
        modelHash.types = result;
        return modelHash;
      }, reject);

      Ember.RSVP.all([loadClassesPromise, loadTypemapPromise, promiseEnumeration, promiseType]).then(() => {
        resolve(modelHash);
      });
    });
  },
});
