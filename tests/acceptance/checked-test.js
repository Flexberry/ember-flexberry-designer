import Ember from 'ember';
import { executeTest } from './execute-test';

executeTest('test checking', (store, assert, app) => {
  assert.expect(1);
  let path = 'fd-configuration-list-form';
  let done = assert.async();
  Ember.run(() => {
    visit(path);
    andThen(() => {
      assert.equal(currentPath(), path);
      done();
    });
  });
});
