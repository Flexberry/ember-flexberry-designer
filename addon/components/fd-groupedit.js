/**
  @module ember-flexberry-designer
*/

import FdObjectlistviewComponent from './fd-objectlistview';

/**
  This component mimics the `flexberry-groupedit` component in the edit form constructor.

  @class FdGroupeditComponent
  @extends FdObjectlistviewComponent
*/
export default FdObjectlistviewComponent.extend({
  /**
    The count of rows that will be generated to render the table.

    @property rowsCount
    @type Number
    @default 5
  */
  rowsCount: 5,
});
