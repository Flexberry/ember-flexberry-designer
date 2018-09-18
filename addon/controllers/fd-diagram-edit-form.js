import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';
import FdAcrionsForCadPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-cad-primitives';
import FdAcrionsForCommonPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-common-primitives';

export default EditFormController.extend(
FdWorkPanelToggler,
FdAcrionsForCadPrimitivesMixin,
FdAcrionsForCommonPrimitivesMixin, {
  parentRoute: 'fd-diagram-list-form'
});
