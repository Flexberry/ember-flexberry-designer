import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import FdDevSystemModel from 'ember-flexberry-designer/models/fd-dev-system';

// Stub store service.
const storeStub = DS.Store.extend({
  query() {
    return Ember.RSVP.resolve(null);
  }
});

// Stub fd-dev-system model.
const fdDevSystemModelStub = FdDevSystemModel.extend({
  save() {
    let _this = this;
    _this.set('id', 'subsystem');
    return Ember.RSVP.resolve(_this);
  }
});

moduleFor('service:fd-current-project-context', 'Unit | Service | fd current project context', {
  needs: ['model:fd-dev-system', 'model:fd-stage', 'model:fd-diagram', 'model:fd-diagram-link', 'model:fd-filelink'],

  beforeEach: function () {
    Ember.getOwner(this).unregister('service:store');
    Ember.getOwner(this).unregister('model:fd-dev-system');
    this.register('service:store', storeStub);
    this.register('model:fd-dev-system', fdDevSystemModelStub);
  }
});

test('it exists and works', function(assert) {
  let done = assert.async();
  assert.expect(10);

  let service = this.subject();
  assert.ok(service);

  let configuration = Ember.Object.create({ id: 'configuration' });
  let stage = Ember.Object.create({ id: 'stage' });

  assert.throws(service.getCurrentConfiguration);
  service.setCurrentConfiguration(configuration);
  assert.equal(service.getCurrentConfiguration(), 'configuration');

  assert.throws(service.getCurrentStage);
  assert.throws(() => { service.setCurrentStage(stage); });
  stage.set('configuration', configuration);
  service.setCurrentStage(stage);
  assert.notOk(service.isAutogeneratedSystemSet());
  assert.equal(service.getCurrentStage(), 'stage');

  service.getAutogeneratedSystemPromise().then(function(system) {
    assert.ok(service.isAutogeneratedSystemSet());
    assert.equal(service.getAutogeneratedSystemModel(), system);

    // Remove new model from the store.
    system.rollbackAttributes();
    service.setCurrentConfiguration(configuration);
    assert.throws(service.getCurrentStage);

    done();
  });
});
