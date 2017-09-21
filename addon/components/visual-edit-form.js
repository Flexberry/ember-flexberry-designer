import Ember from 'ember';
import FlexberryBaseComponent from 'ember-flexberry/components/flexberry-base-component';
import layout from '../templates/components/visual-edit-form';

export default Ember.Component.extend({
  layout,

  /**
  Flag: indicates whether to show creation button at toolbar.

  @property createNewButton
  @type Boolean
  @default true
  */
  createNewButton: true,

  /**
    Flag: indicates whether to show delete button at toolbar.

    @property deleteButton
    @type Boolean
    @default true
  */
  deleteButton: true,
});
