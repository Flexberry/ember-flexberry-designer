import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';

export default EditFormController.extend(FdFormUnsavedData, {
  parentRoute: 'fd-class-list-form',

  /**
    @property formName
    @type String
    @default 'fd-application-edit-form'
  */
  formName: 'fd-application-edit-form',
});
