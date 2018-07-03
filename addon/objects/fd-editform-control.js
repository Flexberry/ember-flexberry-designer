/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Describes the control on the edit form.

  @class FdEditformControl
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default Ember.Object.extend({
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
    Name of the control.

    @property name
    @type String
  */
  name: '',

  /**
    View of the control.

    @property view
    @type String
  */
  view: '',

  /**
    PropertyNameInMaster of the control.

    @property propertyNameInMaster
    @type String
  */
  propertyNameInMaster: '',

  /**
    Not null of the control.

    @property notNull
    @type Boolean
  */
  notNull: false,

  /**
    Default value of the control.

    @property defaultValue
    @type String
  */
  defaultValue: '',

  /**
    Readonly of the control.

    @property readonly
    @type Boolean
  */
  readonly: false,

  /**
    Description of the control.

    @property description
    @type String
  */
  description: '',
});
