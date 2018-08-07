import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';

export default EditFormController.extend(FdWorkPanelToggler, {
  parentRoute: 'fd-diagram-list-form',
});
