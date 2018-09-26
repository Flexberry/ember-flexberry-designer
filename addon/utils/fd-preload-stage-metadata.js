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

/*
 * Returns true if record is loaded to store and related to specified stage.
 */
function tryPeekRecord(store, modelName, recordId, stagePk) {
  let record = store.peekRecord(modelName, recordId);
  return record !== null && record.get('stage.id') === stagePk;
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

    const projectionName = 'FdPreloadMetadata';

    // stage promise
    let modelName = 'fd-dev-stage';
    let q = new Builder(store, modelName)
      .selectByProjection(projectionName)
      .byId(stagePk)
      .build();
    promises.push(store.query(modelName, q));

    // classes promise
    promises.push(getPromise(store, stagePk, 'fd-dev-class', projectionName));

    // associations promise
    promises.push(getPromise(store, stagePk, 'fd-dev-association', projectionName));

    // agregations promise
    promises.push(getPromise(store, stagePk, 'fd-dev-aggregation', projectionName));

    // inheritances promise
    promises.push(getPromise(store, stagePk, 'fd-dev-inheritance', projectionName));

    // system and diagrams promise
    promises.push(getPromise(store, stagePk, 'fd-dev-system', projectionName));

    // resolve, reject
    Ember.RSVP.all(promises).then(() => {
      let userService = Ember.getOwner(store).lookup('service:user');
      let userName = userService.getCurrentUserName();
      let lockModelName = 'new-platform-flexberry-services-lock';

      let lockPredicate = new Query.SimplePredicate('userName', FilterOperator.Eq, userName);
      let q = new Builder(store, lockModelName)
        .selectByProjection('LockL')
        .where(lockPredicate)
        .build();

      // delete locks for objects in current stage for current user.
      store.query(lockModelName, q).then((lockObjects) => {
        let deleteLocksPromises = [];
        lockObjects.forEach((item) => {
          let needToDeleteLock = tryPeekRecord(store, 'fd-dev-class', item.get('id'), stagePk) ||
            tryPeekRecord(store, 'fd-dev-association', item.get('id'), stagePk) ||
            tryPeekRecord(store, 'fd-dev-aggregation', item.get('id'), stagePk) ||
            tryPeekRecord(store, 'fd-dev-inheritance', item.get('id'), stagePk);

          if (needToDeleteLock) {
            deleteLocksPromises.push(item.destroyRecord());
          }
        });

        Ember.RSVP.all(deleteLocksPromises).then(resolve, reject);
      }, reject);
    }, reject);
  });
}
