/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Describes properties on the tree view.

  @class FdAttributesTree
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default Ember.Object.extend({

  /**
    Text property for jsTree.

    @property text
    @type String
  */
  text: undefined,

  /**
    Item property 'name'.

    @property name
    @type String
  */
  name: undefined,

  /**
    Type property for jsTree.

    @property type
    @type String
  */
  type: undefined,

  /**
    Type property.

    @property typeNode
    @type String
  */
  typeNode: undefined,

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
    Own property.

    @property own
    @type Boolean
  */
  own: true,

  /**
    State property for jsTree.

    @property state
    @type Object
  */
  state: undefined
});
