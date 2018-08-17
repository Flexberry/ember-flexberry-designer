import Ember from 'ember';
import { executeTest, addDataForDestroy } from './execute-test';

executeTest('test checking', (store, assert, app) => {
  assert.expect(1);
  let path = 'fd-configuration-list-form';
  let done = assert.async();

  let repository;
  Ember.run(() => {
    /*
    let builder = new Query.Builder(store).from('fd-repository');
    store.query(modelName, builder.build()).then((result) => {
      let arr = result.toArray();
      repository = arr.objectAt(0);
    }).then(function() {

      let newRecords = Ember.A();
      let repository = newRecords.pushObject(store.createRecord('fd-repository', { name: 'Auto tests2'}));
      repository.save().then(() => {
        addDataForDestroy(repository);

          visit(path);
          andThen(() => {
            assert.equal(currentPath(), path);
            repository.destroyRecord();
            done();
          });
      })
    });*/
  });
});
