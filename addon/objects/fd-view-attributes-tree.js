/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Describes properties on the tree view.

  @class FdViewAttributesTree
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default Ember.Object.extend({

  /**
    Item property 'name'.

    @property name
    @type String
  */
  name: undefined,

  /**
    Type property.

    @property caption
    @type String
  */
  type: undefined,
});
