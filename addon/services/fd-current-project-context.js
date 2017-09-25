/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Service allows to save current application context.

  @class FdCurrentProjectContextService
  @extends <a href="http://emberjs.com/api/classes/Ember.Service.html">Ember.Service</a>
*/
export default Ember.Service.extend({
  /**
    Stores current configuration, stage, class.

    @property context
    @type Object
  */
  context: {},

  /**
    Set current configuration.

    @method setCurrentConfiguration
    @param {DS.Model} configuration New current configuration.
  */
  setCurrentConfiguration(configuration) {
    this.set('context.configuration', configuration.get('id'));
    this.set('context.stage', undefined);
    this.set('context.class', undefined);
  },

  /**
    Get `id` of current configuration.

    @method getCurrentConfiguration
    @return {String} Id of current configuration.
  */
  getCurrentConfiguration() {
    let configuration = this.get('context.configuration');

    Ember.assert('Current configuration not set.', configuration);

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
    this.set('context.class', undefined);
  },

  /**
    Get `id` of current stage.

    @method getCurrentStage
    @return {String} Id of current stage.
  */
  getCurrentStage() {
    let stage = this.get('context.stage');

    Ember.assert('Current stage not set.', stage);

    return stage;
  },

  /**
    Set current class.

    @method setCurrentClass
    @param {DS.Model} clazz New current class.
  */
  setCurrentClass(clazz) {
    Ember.assert('Class must belong to the current stage.', this.get('context.stage') === clazz.get('stage.id'));

    this.set('context.class', clazz.get('id'));
  },

  /**
    Get `id` of current class.

    @method getCurrentClass
    @return {String} Id of current class.
  */
  getCurrentClass() {
    let clazz = this.get('context.class');

    Ember.assert('Current class not set.', clazz);

    return clazz;
  },
});
