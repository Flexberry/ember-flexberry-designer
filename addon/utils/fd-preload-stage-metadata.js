import { Promise } from 'rsvp';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import moment from 'moment';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import Builder from 'ember-flexberry-data/query/builder';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';

/*
 * Returns query to load model specified by modelName and projectionName in the context of store and stagePk.
 */
function getBuild(store, stagePk, modelName, projectionName) {
  let stagePkPredicate = new SimplePredicate('stage.id', FilterOperator.Eq, stagePk);
  let q = new Builder(store, modelName)
    .selectByProjection(projectionName)
    .where(stagePkPredicate)
    .build();
  return q;
}

/**
  Returns promise to preload stage metadata specified by stagePk in the context of store.
  @param {DS.Store} store
  @param {String} stagePk
  @return {Promise} promise
 */
export default function fdPreloadStageMetadata(store, stagePk) {
  return new Promise(function(resolve, reject) {
    let builders = [];

    const projectionName = 'FdPreloadMetadata';

    // stage promise
    let modelName = 'fd-dev-stage';
    let q = new Builder(store, modelName)
      .selectByProjection(projectionName)
      .byId(stagePk)
      .build();
    builders.push(q);

    // classes promise
    builders.push(getBuild(store, stagePk, 'fd-dev-class', projectionName));

    // associations promise
    builders.push(getBuild(store, stagePk, 'fd-dev-association', projectionName));

    // agregations promise
    builders.push(getBuild(store, stagePk, 'fd-dev-aggregation', projectionName));

    // inheritances promise
    builders.push(getBuild(store, stagePk, 'fd-dev-inheritance', projectionName));

    // realizations promise
    builders.push(getBuild(store, stagePk, 'fd-dev-realization', projectionName));

    // system and diagrams promise
    builders.push(getBuild(store, stagePk, 'fd-dev-system', projectionName));

    // resolve, reject
    store.batchSelect(builders).then(() => {
      let currentProjectContext = getOwner(store).lookup('service:fd-current-project-context');
      let stageObj = store.peekRecord('fd-dev-stage', stagePk);

      let allDiagrams = A();
      let systems = stageObj.get('systems');
      systems.forEach((system) => {
        let diagrams = system.get('diagrams').toArray();
        allDiagrams.pushObjects(diagrams);
      });

      let changeDateValue = allDiagrams.map((d) => d.get('changeDate'));

      let changeDateStage = stageObj.get('changeDate');
      let currentVersion = normalizeChangeDate(changeDateStage);
      changeDateValue.forEach((changeDate) => {
        const momentDate = normalizeChangeDate(changeDate);
        if (momentDate.isAfter(currentVersion)) {
          currentVersion = momentDate;
        }
      });

      currentProjectContext.setVersionCurrentStage(currentVersion);

      return resolve();
    }, reject);
  });
}

/**
  Normalizes timezone of the date and returns moment object.
 */
export function normalizeChangeDate(date) {
  let momentDate = moment(date);
  if (isNone(momentDate._tzm) || momentDate._tzm === 0) {
    const offset = momentDate.utcOffset();
    momentDate = momentDate.subtract(offset, 'm');
  }

  return momentDate;
}
