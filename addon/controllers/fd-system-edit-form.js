import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';

export default EditFormController.extend(FdFormUnsavedData, {
  parentRoute: 'fd-system-list-form',

  sybsystemName: Ember.computed.alias('model.name')
});
