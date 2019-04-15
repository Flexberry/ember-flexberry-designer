/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';
import { computed } from '@ember/object';

/**
  Describes one column on the list form.

  @class FdListformColumn
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default EmberObject.extend({
  /**
    Caption of the column.

    @property caption
    @type String
  */
  caption: computed.alias('propertyDefinition.caption'),

  /**
    The property definition from view that corresponds to this column.

    @property propertyDefinition
    @type FdViewAttributesProperty|FdViewAttributesMaster|FdViewAttributesDetail
  */
  propertyDefinition: undefined,
});
