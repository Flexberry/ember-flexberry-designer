/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Describes one row at external class store instances in type.

  @class FdStoreInstancesInType
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default Ember.Object.extend({
  /**
    Columns of dataService.

    @property dataService
    @type string
  */
  dataService: undefined,

  /**
    Columns of storeInstancesInType.

    @property storeInstancesInType
    @type string
  */
  storeInstancesInType: undefined,
});
