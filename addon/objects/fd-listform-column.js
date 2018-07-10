/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Describes one column on the list form.

  @class FdListformColumn
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default Ember.Object.extend({
  /**
    Caption of the column.

    @property caption
    @type String
  */
  caption: Ember.computed.alias('propertyDefinition.caption'),

  /**
    The property definition from view that corresponds to this column.

    @property propertyDefinition
    @type FdViewAttributesProperty|FdViewAttributesMaster|FdViewAttributesDetail
  */
  propertyDefinition: undefined,
});
