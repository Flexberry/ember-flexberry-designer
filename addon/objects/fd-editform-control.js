/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';

/**
  Describes the control on the edit form.

  @class FdEditformControl
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default EmberObject.extend({
  /**
    Specifies the type of the control, `textbox`, `datepicker`, `dropdown`, etc.

    @property type
    @type String
  */
  type: undefined,

  /**
    Caption of the control.

    @property caption
    @type String
  */
  caption: undefined,

  /**
    Specifies the width of the control, in percent or in pixels.

    @property width
    @type String
  */
  width: undefined,

  /**
    The property definition from view that corresponds to this control.

    @property propertyDefinition
    @type FdViewAttributesProperty|FdViewAttributesMaster|FdViewAttributesDetail
  */
  propertyDefinition: undefined,
});
