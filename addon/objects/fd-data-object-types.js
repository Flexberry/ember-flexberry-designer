/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';

/**
  Describes propertie DataObjectTypes.

  @class FdDataObjectTypes
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default EmberObject.extend({
  /**
    The name of the Class.

    @property className
    @type String
  */
  className: undefined,

  /**
    Name for new form.

    @property newContainerName
    @type String
  */
  newContainerName: undefined,

  /**
    Name for edit form.

    @property editContainerName
    @type String
  */
  editContainerName: undefined,
});
