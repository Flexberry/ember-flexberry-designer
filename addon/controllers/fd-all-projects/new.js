/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  The controller for the project creation form.

  @class FdAllProjectsNewController
  @extends Ember.Controller
*/
export default Ember.Controller.extend({
  /**
    The project name.

    @property projectName
    @type String
  */
  projectName: undefined,

  /**
    Locale key with example project name.

    @property nameExample
    @type String
    @readOnly
  */
  nameExample: Ember.computed(function() {
    // Parts of `forms/fd-all-projects` locale keys.
    let examples = ['library', 'school', 'university', 'museum', 'gallery'];
    let example = examples[Math.floor(Math.random() * examples.length)];
    return `forms.fd-all-projects.name-examples.${example}`;
  }).readOnly(),

  /**
    A search query on the project list that will be used as the project name.

    @property nameFromSearch
    @type String
    @default ''
  */
  nameFromSearch: '',

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property queryParams
  */
  queryParams: ['nameFromSearch'],
});
