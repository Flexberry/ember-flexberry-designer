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
