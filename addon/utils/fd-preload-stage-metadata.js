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

  return new Ember.RSVP.Promise(function (resolve, reject) {
    let promises = [];
    let modelName;

    const projectionName = 'FdPreloadMetadata';

    // stage promise
    modelName = 'fd-dev-stage';
    let q = new Builder(store, modelName)
      /*.selectByProjection(projectionName)*/
      .selectByProjection('EditFormView')
      .byId(stagePk)
      .build();

    promises.push(store.query(modelName, q));

    // classes promise
    modelName = 'fd-dev-class';
    /*promises.push(getPromise(store, stagePk, modelName, projectionName));*/
    promises.push(getPromise(store, stagePk, modelName, 'SearchClassLoadView'));

    /*
    // associations promise
    modelName = 'fd-dev-association';
    promises.push(getPromise(store, stagePk, modelName, projectionName));

    // agregations promise
    modelName = 'fd-dev-agregation';
    promises.push(getPromise(store, stagePk, modelName, projectionName));

    // inheritances promise
    modelName = 'fd-dev-inheritance';
    promises.push(getPromise(store, stagePk, modelName, projectionName));
    */

    // all promises
    Ember.RSVP.all(promises).then(() => {
      resolve();
    });
  });
}
