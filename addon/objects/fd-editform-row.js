/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Describes one row with controls on the edit form.

  @class FdEditformRow
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default Ember.Object.extend({
  /**
    A collection of controls in row.

    @property controls
    @type Any[]
  */
  controls: undefined,

  /**
    Columns count in row.

    @property columnsCount
    @type Number
  */
  columnsCount: undefined,
});
