import Ember from 'ember';

export default Ember.Component.extend({
  /**
    Label for field.

    @property label
    @type String
  */
  label: undefined,

  /**
    Input value.

    @property value
    @type String
  */
  value: undefined,

  /**
    Type of html input.

    @property type
    @type String
    @default 'text'
   */
  type: 'text',

});
