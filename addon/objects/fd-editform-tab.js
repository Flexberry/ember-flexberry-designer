/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Describes one tab in a group.

  @class FdEditformTab
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default Ember.Object.extend({
  /**
    Caption of the tab.

    @property caption
    @type String
  */
  caption: undefined,

  /**
    A collection of rows with controls on the tab.

    @property rows
    @type FdEditformRow[]
  */
  rows: undefined,
});
