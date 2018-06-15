/**
  @module ember-flexberry-designer
*/

import FdViewAttributesProperty from './fd-view-attributes-property';

/**
  Describes properties on the detail view.

  @class FdViewAttributesDetail
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default FdViewAttributesProperty.extend({

  /**
    Item property 'detailViewName'.

    @property detailViewName
    @type String
  */
  detailViewName: '',

  /**
    Item property 'loadOnLoadAgregator'.

    @property loadOnLoadAgregator
    @type Boolean
  */
  loadOnLoadAgregator: false,

  /**
    Array of possible 'detailViewName'.

    @property detailViewNameItems
    @type Array
  */
  detailViewNameItems: undefined,
});
