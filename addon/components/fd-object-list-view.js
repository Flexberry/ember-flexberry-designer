/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  This component render table from passed headers and rows.

  @class FdObjectListViewComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Ember.Component.extend({
  /**
    An array of header for rendering.

    @property headers
    @type Ember.NativeArray
  */
  headers: undefined,

  /**
    An array of rows for rendering.

    @property rows
    @type Ember.NativeArray
  */
  rows: undefined,

  /**
    Do need to render a checkbox for each row.

    @property showCheckBoxInRow
    @type Boolean
    @default true
  */
  showCheckBoxInRow: true,

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property tagName
  */
  tagName: 'table',

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNames
  */
  classNames: ['ui', 'celled', 'table'],
});
