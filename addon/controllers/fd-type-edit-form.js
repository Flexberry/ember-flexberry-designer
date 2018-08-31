import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';

export default EditFormController.extend(FdFormUnsavedData, {
  parentRoute: 'fd-class-list-form',

  /**
    @property formName
    @type String
    @default 'fd-type-edit-form'
  */
  formName: 'fd-type-edit-form'
});
