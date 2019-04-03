/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';

/**
  Describes one row at external class store instances in type.

  @class FdStoreInstancesInType
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default EmberObject.extend({
  /**
    Columns of dataService.

    @property dataService
    @type string
  */
  dataService: undefined,

  /**
    Columns of data.

    @property data
    @type string
  */
  data: undefined,
});
