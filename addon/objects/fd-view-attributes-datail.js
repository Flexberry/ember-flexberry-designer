/**
  @module ember-flexberry-designer
*/

import FdViewAttributesProperty from './fd-view-attributes-property';

/**
  Describes properties on the datail view.

  @class FdViewAttributesDatail
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default FdViewAttributesProperty.extend({

  /**
    Item property 'datailViewName'.

    @property datailViewName
    @type String
  */
  datailViewName: undefined,

  /**
    Item property 'loadOnLoadAgregator'.

    @property loadOnLoadAgregator
    @type Boolean
  */
  loadOnLoadAgregator: false,
});
