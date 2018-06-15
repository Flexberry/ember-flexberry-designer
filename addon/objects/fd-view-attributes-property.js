/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Describes common properties on the view.

  @class FdViewAttributesProperty
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
    Item property 'caption'.

    @property caption
    @type String
  */
  caption: undefined,

  /**
    Path of the item.

    @property path
    @type String
  */
  path: undefined,

  /**
    Flag indicates the visibility of an item.

    @property visible
    @type Boolean
  */
  visible: true,
});
