import { computed } from '@ember/object';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';

export default EditFormController.extend(FdFormUnsavedData, {
  parentRoute: 'fd-system-list-form',

  sybsystemName: computed.alias('model.name')
});
