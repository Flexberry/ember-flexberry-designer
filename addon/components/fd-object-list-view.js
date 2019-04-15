/**
  @module ember-flexberry-designer
*/

import Component from '@ember/component';

/**
  This component render table from passed headers and rows.

  @class FdObjectListViewComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Component.extend({
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
  tagName: 'div',

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNames
  */
  classNames: ['panel-wrapper', 'overflow-panel'],
});
