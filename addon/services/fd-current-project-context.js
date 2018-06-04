/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { Query } from 'ember-flexberry-data';

const {
  Builder,
  Condition,
  FilterOperator,
  SimplePredicate,
  ComplexPredicate
} = Query;

/**
  Service allows to save current application context.

  @class FdCurrentProjectContextService
  @extends <a href="http://emberjs.com/api/classes/Ember.Service.html">Ember.Service</a>
*/
export default Ember.Service.extend({

  /**
    Flag indicates single project mode.

    @property singleStageMode
    @type Boolean
    @default false
  */
  singleStageMode: false,

  /**
    Stores current configuration, stage, class.

    @property context
    @type Object
  */
  context: {},

  /**
    Store of current application.

    @property store
    @type DS.Store or subclass
  */
  store: Ember.inject.service('store'),

  /**
    Set current configuration.

    @method setCurrentConfiguration
    @param {DS.Model} configuration New current configuration.
  */
  setCurrentConfiguration(configuration) {
    this.set('context.configuration', configuration.get('id'));
    this.set('context.configurationModel', configuration);
    this.set('context.stage', undefined);
    this.set('context.stageModel', undefined);
    this.set('context.system', undefined);
    this.set('context.systemModel', undefined);
    this.set('context.systemIsSet', false);
    this.set('context.systemPromise', undefined);
    this.set('context.class', undefined);
    this.set('context.classModel', undefined);
  },

  /**
    Get `id` of current configuration.

    @method getCurrentConfiguration
    @return {String} Id of current configuration.
  */
  getCurrentConfiguration() {
    let configuration = this.get('context.configuration');

    Ember.assert('Current configuration is not set.', configuration);

    return configuration;
  },

  /**
    Get current configuration model.

    @method getCurrentConfigurationModel
    @return {DS.Model} Current configuration model.
  */
  getCurrentConfigurationModel() {
    let configuration = this.get('context.configurationModel');

    Ember.assert('Current configuration is not set.', configuration);

    return configuration;
  },

  /**
    Set current stage.

    @method setCurrentStage
    @param {DS.Model} stage New current stage.
  */
  setCurrentStage(stage) {
    Ember.assert('Stage must belong to the current configuration.', this.get('context.configuration') === stage.get('configuration.id'));

    this.set('context.stage', stage.get('id'));
    this.set('context.stageModel', stage);
    this.set('context.system', undefined);
    this.set('context.systemModel', undefined);
    this.set('context.systemIsSet', false);
    this.set('context.systemPromise', undefined);
    this.set('context.class', undefined);
    this.set('context.classModel', undefined);

    let store = this.get('store');
    let modelName = 'fd-dev-system';
    let projectionName = 'SearchSystem';
    let systemName = 'Autogenerated';

    let stagePredicate = new SimplePredicate('stage', FilterOperator.Eq, stage.get('id'));
    let systemNamePredicate = new SimplePredicate('name', FilterOperator.Eq, systemName);
    let predicate = new ComplexPredicate(Condition.And, stagePredicate, systemNamePredicate);

    let builder = new Builder(store)
    .from(modelName)
    .selectByProjection(projectionName)
    .where(predicate);

    let _this = this;
    let promise = new Ember.RSVP.Promise(function(resolve, reject) {
      store.query(modelName, builder.build()).then((result) => {
        if (!result || result.get('length') !== undefined && result.get('length') === 0) {
          store.createRecord(modelName, {
            name: systemName,
            stage: stage
          }).save().then((systemAfterSave) => {
            _this.set('context.system', systemAfterSave.get('id'));
            _this.set('context.systemModel', systemAfterSave);
            _this.set('context.systemIsSet', true);
            resolve(systemAfterSave);
          }).catch(function(reason) {
            reject(reason);
          });
        } else {
          let system = result.objectAt(0);
          _this.set('context.system', system.get('id'));
          _this.set('context.systemModel', system);
          _this.set('context.systemIsSet', true);
          resolve(system);
        }
      }).catch(function(reason) {
        reject(reason);
      });
    });

    this.set('context.systemPromise', promise);
  },

  /**
    Get `id` of current stage.

    @method getCurrentStage
    @return {String} Id of current stage.
  */
  getCurrentStage() {
    let stage = this.get('context.stage');

    Ember.assert('Current stage is not set.', stage);

    return stage;
  },

  /**
    Get current stage model.

    @method getCurrentStageModel
    @return {DS.Model} Current stage model.
  */
  getCurrentStageModel() {
    let stage = this.get('context.stageModel');

    Ember.assert('Current stage is not set.', stage);

    return stage;
  },

  /**
    Get promise for loading stage's autogenerated system.

    @method getAutogeneratedSystemPromise
    @return {Ember.RSPV.Promise} Promise for loading stage's system.
  */
  getAutogeneratedSystemPromise() {
    let promise = this.get('context.systemPromise');

    Ember.assert('Promise for loading stage\'s system is not set.', promise);

    return promise;
  },

  /**
    Get flag indicating stage's autogenerated system model is set.

    @method isAutogeneratedSystemSet
    @return {Boolean} Flag indicating stage's autogenerated system is set.
  */
  isAutogeneratedSystemSet() {
    return this.get('context.systemIsSet');
  },

  /**
    Get `id` of autogenerated system model for current stage.

    @method getAutogeneratedSystem
    @return {String} Id of autogenerated system for current stage.
  */
  getAutogeneratedSystem() {
    let system = this.get('context.system');

    Ember.assert('Autogenerated system for stage is not set.', system);

    return system;
  },

  /**
    Get autogenerated system's model for current stage.

    @method getAutogeneratedSystemModel
    @return {DS.Model} Autogenerated system's model for current stage.
  */
  getAutogeneratedSystemModel() {
    let system = this.get('context.systemModel');

    Ember.assert('Autogenerated system for stage is not set.', system);

    return system;
  }
  
});
