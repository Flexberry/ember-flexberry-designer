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
});
