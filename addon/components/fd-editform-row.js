/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  This component rendered one row with controls on the edit form.

  @class FdEditformRowComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Ember.Component.extend({
  /**
    The component is rendered as one column.

    @private
    @property _singleColumn
    @type Boolean
  */
  _singleColumn: Ember.computed.equal('row.controls.length', 1),

  /**
    The row to render.

    @property row
    @type FdEditformRow
  */
  row: undefined,

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNameBindings
  */
  classNameBindings: ['_singleColumn:field:fields', '_singleColumn::equal', '_singleColumn::width'],
});
