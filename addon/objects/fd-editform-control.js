/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Describes the control on the edit form.

  @class FdEditformControl
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default Ember.Object.extend({
  /**
    Determines control type, `control`, 'tab', or 'group'.

    @property type
    @type String
  */
  type: undefined,

  /**
    Caption of the control.

    @property caption
    @type String
  */
  caption: undefined,

  /**
    A collection of nested controls.

    @property controls
    @type FdEditformControl[]
  */
  controls: undefined,

  /**
    The order of the control in the collection of controls.

    @property order
    @type Number
  */
  order: undefined,

  /**
    Number of the column.

    @property column
    @type Number
  */
  column: undefined,

  /**
    Determines the width of the column, in percent or in pixels.

    @property columnWidth
    @type String
  */
  columnWidth: undefined,
});
