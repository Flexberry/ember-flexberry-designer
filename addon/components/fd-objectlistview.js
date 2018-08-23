/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import FdDataTypes from '../utils/fd-datatypes';

/**
  This component mimics the `flexberry-objectlistview` component in the edit form constructor.

  @class FdObjectlistviewComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Ember.Component.extend({
  /**
    @private
    @property _dataTypes
    @type Ember.Object
  */
  _dataTypes: FdDataTypes.create(),

  /**
    Table headings.

    @private
    @property _headers
    @type Ember.NativeArray
  */
  _headers: Ember.computed.map('view.definition', pd => pd.get('caption') || pd.get('name')),

  /**
    Cells for each row, they are always generated anew.

    @private
    @property _cells
    @type Ember.NativeArray
  */
  _cells: Ember.computed('_headers.length', function() {
    let cells = Ember.A();
    let types = this.get('types');
    let dataTypes = this.get('_dataTypes');
    let length = this.get('_headers.length');
    for (let i = 0; i < length; i++) {
      let type = dataTypes.flexberryTypeToFD(types && types[i] && types[i].type);
      cells.pushObject(dataTypes.randomValue(type));
    }

    return cells;
  }).volatile(),

  /**
    The rows generated for rendering in the table.

    @private
    @property _rows
    @type Ember.NativeArray
  */
  _rows: Ember.computed('rowsCount', function() {
    let rows = Ember.A();
    let rowsCount = this.get('rowsCount');
    for (let i = 0; i < rowsCount; i++) {
      rows.pushObject(this.get('_cells'));
    }

    return rows;
  }),

  /**
    The rows displayed on the current page.

    @private
    @property _rowsOnPage
    @type Ember.NativeArray
  */
  _rowsOnPage: Ember.computed('_rows.[]', 'page', 'perPage', function() {
    let { page, perPage } = this.getProperties('page', 'perPage');

    return this.get('_rows').slice((page - 1) * perPage, perPage * page);
  }),

  /**
    Page numbers.

    @private
    @property _pages
    @type Ember.NativeArray
  */
  _pages: Ember.computed('rowsCount', 'perPage', function() {
    let pages = Ember.A();
    let count = Math.ceil(this.get('rowsCount') / this.get('perPage'));
    for (let i = 1; i <= count; i++) {
      pages.pushObject(i);
    }

    return pages;
  }),

  /**
    An array of types used in the view.

    @property types
    @type Array
  */
  types: undefined,

  /**
    The view on which the table will be rendered.

    @property view
    @type FdDevViewModel
  */
  view: undefined,

  /**
    The count of rows that will be generated to render the table.

    @property rowsCount
    @type Number
    @default 15
  */
  rowsCount: 15,

  /**
    The current page.

    @property page
    @type Number
    @default 1
  */
  page: 1,

  /**
    The count of rows showing on per page.

    @property perPage
    @type Number
    @default 5
  */
  perPage: 5,
});
