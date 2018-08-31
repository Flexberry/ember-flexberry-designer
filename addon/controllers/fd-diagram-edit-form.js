import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';

export default EditFormController.extend(
FdWorkPanelToggler,
FdFormUnsavedData, {
  parentRoute: 'fd-diagram-list-form',

  /**
    @property formName
    @type String
    @default 'fd-diagram-edit-form'
  */
  formName: 'fd-diagram-edit-form',
});
