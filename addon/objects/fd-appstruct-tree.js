/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';

/**
  Describes properties on the tree.

  @class FdAppStructTree
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default EmberObject.extend({

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
    Caption property.

    @property type
    @type String
  */
  caption: undefined,

  /**
    ClassName property.

    @property type
    @type String
  */
  className: undefined,

  /**
    Description property.

    @property type
    @type String
  */
  description: undefined,

  /**
    Url property.

    @property type
    @type String
  */
  url: undefined,

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
    Parent id.

    @property idParent
    @type String
  */
  idParent: undefined,

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
    State attribute for jsTree.

    @property a_attr
    @type Object
  */
  a_attr: undefined,
});
