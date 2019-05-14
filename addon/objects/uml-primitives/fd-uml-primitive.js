/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';
import { computed } from '@ember/object';

/**
  An object that defines any primitive on the UML diagram.

  @class FdUmlPrimitive
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default EmberObject.extend({

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
  id: computed.readOnly('primitive.$id'),

  /**
    The unique identifier of the object.

    @property repositoryObject
    @type String
  */
  repositoryObject: computed.alias('primitive.RepositoryObject'),

  /**
    Returns the string representation of the primitive.

    @method toString
    @return {String} A string representation of the primitive.
  */
  toString() {
    return JSON.stringify(this.get('primitive'));
  },

  /**
    Returns the object to convert to the JSON.

    @method toJSON
    @return {Object} A object to convert to the JSON.
  */
  toJSON() {
    return this.get('primitive');
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
