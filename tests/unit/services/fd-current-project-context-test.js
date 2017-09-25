import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:fd-current-project-context', 'Unit | Service | fd current project context');

test('it exists and works', function(assert) {
  let service = this.subject();
  assert.ok(service);

  let configuration = Ember.Object.create({ id: 'configuration' });
  let stage = Ember.Object.create({ id: 'stage' });
  let clazz = Ember.Object.create({ id: 'class' });

  assert.throws(service.getCurrentConfiguration);
  service.setCurrentConfiguration(configuration);
  assert.equal(service.getCurrentConfiguration(), 'configuration');

  assert.throws(service.getCurrentStage);
  assert.throws(() => { service.setCurrentStage(stage); });
  stage.set('configuration', configuration);
  service.setCurrentStage(stage);
  assert.equal(service.getCurrentStage(), 'stage');

  assert.throws(service.getCurrentClass);
  assert.throws(() => { service.setCurrentClass(clazz); });
  clazz.set('stage', stage);
  service.setCurrentClass(clazz);
  assert.equal(service.getCurrentClass(), 'class');

  service.setCurrentStage(stage);
  assert.throws(service.getCurrentClass);

  service.setCurrentConfiguration(configuration);
  assert.throws(service.getCurrentStage);
});
