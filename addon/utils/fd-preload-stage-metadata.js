import { Promise, all } from 'rsvp';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import moment from 'moment';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import Builder from 'ember-flexberry-data/query/builder';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';

/*
 * Returns promise to load model specified by modelName and projectionName in the context of store and stagePk.
 */
function getPromise(store, stagePk, modelName, projectionName) {
  let stagePkPredicate = new SimplePredicate('stage.id', FilterOperator.Eq, stagePk);
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
  @return {Promise} promise
 */
export default function fdPreloadStageMetadata(store, stagePk) {
  return new Promise(function(resolve, reject) {
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

    // realizations promise
    promises.push(getPromise(store, stagePk, 'fd-dev-realization', projectionName));

    // system and diagrams promise
    promises.push(getPromise(store, stagePk, 'fd-dev-system', projectionName));

    // resolve, reject
    all(promises).then(() => {
      let currentProjectContext = getOwner(store).lookup('service:fd-current-project-context');
      let stageObj = store.peekRecord('fd-dev-stage', stagePk);

      let allDiagrams = A();
      let systems = stageObj.get('systems');
      systems.forEach((system) => {
        let diagrams = system.get('diagrams').toArray();
        allDiagrams.pushObjects(diagrams);
      });

      let changeDateValue = allDiagrams.map((d) => d.get('changeDate'));
      let currentVersion = moment.utc(stageObj.get('changeDate'), 'DD.MM.YYYY HH:mm');
      changeDateValue.forEach((changeDate) => {
        let momentDate = moment.utc(changeDate, 'DD.MM.YYYY HH:mm');
        if (momentDate.isAfter(currentVersion)) {
          currentVersion = momentDate;
        }
      });

      currentProjectContext.setVersionCurrentStage(currentVersion);

      return resolve();
    }, reject);
  });
}
