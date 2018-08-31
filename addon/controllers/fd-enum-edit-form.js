import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';

export default EditFormController.extend(FdFormUnsavedData, {
  parentRoute: 'fd-class-list-form',
  header: Ember.computed.alias('model.name'),

  /**
    @property formName
    @type String
    @default 'fd-enum-edit-form'
  */
  formName: 'fd-enum-edit-form'
});
