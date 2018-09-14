import EditFormNewRoute from 'ember-flexberry/routes/edit-form-new';
import FdLoadingForTransitionMixin from '../../mixins/fd-loading-for-transition';

export default EditFormNewRoute.extend(FdLoadingForTransitionMixin, {
  modelProjection: 'EditFormView',
  modelName: 'fd-dev-system',
  templateName: 'fd-system-edit-form',
});
