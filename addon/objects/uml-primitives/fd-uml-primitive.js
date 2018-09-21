/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  An object that defines any primitive on the UML diagram.

  @class FdUmlPrimitive
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default Ember.Object.extend({

  /**
    The object that describes the primitive.

    @property primitive
    @type Object
  */
  primitive: undefined,

  /**
    The unique identifier of the primitive.

    @property id
    @type String
  */
  id: Ember.computed.readOnly('primitive.$id'),

  /**
    The unique identifier of the object.

    @property repositoryObject
    @type String
  */
  repositoryObject: Ember.computed.readOnly('primitive.RepositoryObject'),

  /**
    Returns the string representation of the primitive.

    @method toString
    @return {String} A string representation of the primitive.
  */
  toString() {
    return JSON.stringify(this.get('primitive'));
  },

  /**
    Returns an object for the JointJS diagram model.

    @method JointJS
    @return {joint.shapes} Object for the JointJS diagram model.
  */
  JointJS() {
    throw new Error('Not implemented.');
  },
});
