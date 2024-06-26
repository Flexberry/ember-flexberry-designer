import { A } from '@ember/array';
import uuid from 'npm:node-uuid';
import { resolve } from 'rsvp';

export default function executeTestWithData(store, assert, done, callbackGetTestData, callbackTest) {
  let testStage;
  return createTestStage(store).then((stage) => {
    testStage = stage;
    if (callbackGetTestData == null) {
      return resolve(stage);
    }

    let arrayTestData = callbackGetTestData(stage);

    return store.batchUpdate(arrayTestData);
  }).then((arrayTestData) => {
    return callbackTest(assert, arrayTestData);
  })
  // eslint-disable-next-line no-console
  .catch((e) => console.log(e, e.message))
  .finally(() => {
    let modelsForBatchUpdate = A([
      testStage,
      testStage.get('configuration'),
      testStage.get('configuration.project'),
      testStage.get('configuration.project.repository')
    ]).map((a) => {
      a.deleteRecord();

      return a;
    });

    return store.batchUpdate(modelsForBatchUpdate).finally(() => {
      done();
    });
  });
}

let createTestStage = function(store) {
  let repositoryId = uuid.v4();
  let repository = store.createRecord('fd-repository', {
    name: `TestRepository_${repositoryId}`,
    id: repositoryId
  });

  let projectId = uuid.v4();
  let project = store.createRecord('fd-project', {
    name: `TestProject_${projectId}`,
    repository: repository,
    id: projectId
  });

  let configurationId = uuid.v4();
  let configuration = store.createRecord('fd-configuration', {
    name: `TestConfiguration_${configurationId}`,
    project: project,
    id: configurationId
  });

  let stageId = uuid.v4();
  let stage = store.createRecord('fd-dev-stage', {
    name: `TestStage_${stageId}`,
    configuration: configuration,
    id: stageId
  });

  let stageObjects = A([
    repository,
    project,
    configuration,
  ]);

  return store.batchUpdate(stageObjects).then(() => stage.save()).then((result) => {
    return result;
  });
}
