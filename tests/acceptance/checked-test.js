import Ember from 'ember';
import { executeTest, addDataForDestroy } from './execute-test';

executeTest('test checking', (store, assert, app) => {
  assert.expect(1);
  let done = assert.async();
  Ember.run(() => {
    visit(path);
    andThen(() => {
      assert.equal(currentPath(), path);
      done();
    });
  });
});
