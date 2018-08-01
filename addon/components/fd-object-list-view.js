/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  This component rendered list by view.

  @class FdObjectListViewComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Ember.Component.extend({
  /**
    Table headings.

    @private
    @property _headers
    @type Ember.NativeArray
  */
  _headers: Ember.computed.mapBy('view.definition', 'caption'),

  /**
    The rows generated for rendering in the table.

    @private
    @property _rows
    @type Ember.NativeArray
  */
  _rows: Ember.computed('view.definition', 'rowsCount', function() {
    let rows = Ember.A();
    let rowsCount = this.get('rowsCount');
    for (let i = 0; i < rowsCount; i++) {
      rows.pushObject(this.get('_cells'));
    }

    return rows;
  }),

  /**
    Cells for each row, they are always generated anew.

    @private
    @property _cells
    @type Ember.NativeArray
  */
  _cells: Ember.computed.map('_headers', () => {
    let letters = '₳฿￠₡¢₢₵₫€￡£₤₣ƒ₲₭₥₦₱＄$₮₩￦¥￥₴¤₰៛₪₯₠₧₨௹﷼㍐৲৳₹'.split('').sort(() => Math.random() - 0.5);
    let length = Math.floor(5 + Math.random() * 5);

    return letters.slice(0, length).join('');
  }).volatile(),

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
    @default 5
  */
  rowsCount: 5,

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
