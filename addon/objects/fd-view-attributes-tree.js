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

    @property text
    @type String
  */
  text: undefined,

  /**
    Type property.

    @property type
    @type String
  */
  type: undefined,

  /**
    Id property for jsTree.

    @property id
    @type String
  */
  id: undefined,

  /**
    Id property.

    @property idNode
    @type String
  */
  idNode: undefined,

  /**
    Children property.

    @property children
    @type Array
  */
  children: undefined,

  /**
    Copy children property.

    @property copyChildren
    @type Array
  */
  copyChildren: undefined,

  /**
    State property for jsTree.

    @property state
    @type Object
  */
  state: undefined,

  /**
    Array of possible 'detailViewName' for detail.

    @property detailViewNameItems
    @type Array
  */
  detailViewNameItems: undefined,
});
