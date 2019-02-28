/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  The controller for the form with the projects.

  @class FdAllProjectsController
  @extends Ember.Controller
*/
export default Ember.Controller.extend({
  /**
    Link to nested controller `index`.
    More info on the [EmberJS API](https://emberjs.com/api/).

    @property indexController
    @type Ember.InjectedProperty
    @default 'fd-all-projects.index'
  */
  indexController: Ember.inject.controller('fd-all-projects.index'),
});
