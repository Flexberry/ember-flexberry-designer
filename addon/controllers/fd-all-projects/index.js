/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  The controller for the form with a list of all projects.

  @class FdAllProjectsIndexController
  @extends Ember.Controller
*/
export default Ember.Controller.extend({
  /**
    Set by the {{#crosslink "FdAllProjectsIndexRoute"}}route{{/crosslink}}, indicates that this controller is now active.

    @property active
    @type Boolean
    @default false
  */
  active: false,

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}{{/crossLink}}.

    @property projectContext
    @type FdCurrentProjectContextService
  */
  projectContext: Ember.inject.service('fd-current-project-context'),

  /**
    Request to search for projects.

    @property search
    @type String
    @default ''
  */
  search: '',

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property queryParams
  */
  queryParams: ['search'],

  actions: {
    /**
      Choose a project for further work with it.

      @method actions.chooseProject
      @param {DS.Model} project The selected project.
    */
    chooseProject(project) {
      this.get('projectContext').setCurrentConfiguration(project.get('configuration'));
      this.get('projectContext').setCurrentStage(project);
      this.transitionToRoute('fd-application-model');
    },

    /**
      Pin the selected project.

      @method actions.pinProject
      @param {DS.Model} project The selected project.
    */
    pinProject(/* project */) {
      throw new Error('Not implemented.');
    },
  },
});
