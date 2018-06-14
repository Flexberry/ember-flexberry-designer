import Ember from 'ember';
import { Query } from 'ember-flexberry-data';

const { Builder, FilterOperator } = Query;

/*
 * Returns promise to load model specified by modelName and projectionName in the context of store and stagePk.
 */
function getPromise(store, stagePk, modelName, projectionName) {
  let stagePkPredicate = new Query.SimplePredicate('stage.id', FilterOperator.Eq, stagePk);
  let q = new Builder(store, modelName)
    .selectByProjection(projectionName)
    .where(stagePkPredicate)
    .build();

  return store.query(modelName, q);
}

/**
  Returns promise to preload stage metadata specified by stagePk in the context of store.
  @param {DS.Store} store
  @param {String} stagePk
  @return {Ember.RSVP.Promise} promise
 */
export default function fdPreloadStageMetadata(store, stagePk) {

  return new Ember.RSVP.Promise(function(resolve, reject) {
    let promises = [];

    //const projectionName = 'FdPreloadMetadata';

    // stage promise
    let modelName = 'fd-dev-stage';
    let q = new Builder(store, modelName)
      .selectByProjection('EditPropertyLookups') // TODO DEV VIEW
      .byId(stagePk)
      .build();
    promises.push(store.query(modelName, q));

    // classes promise
    promises.push(getPromise(store, stagePk, 'fd-dev-class', 'FdAttributesChangeView')); // TODO DEV VIEW

    // associations promise
    promises.push(getPromise(store, stagePk, 'fd-dev-association', 'FormDesigner')); // TODO DEV VIEW

    // agregations promise
    promises.push(getPromise(store, stagePk, 'fd-dev-aggregation', 'FormConstructor')); // TODO DEV VIEW

    // inheritances promise
    promises.push(getPromise(store, stagePk, 'fd-dev-inheritance', 'EditPropertyLookups')); // TODO DEV VIEW

    // resolve, reject
    Ember.RSVP.all(promises).then(resolve, reject);
  });
}
