import EditFormNewRoute from 'ember-flexberry/routes/edit-form-new';
import FdLoadingForTransitionMixin from '../../mixins/fd-loading-for-transition';

export default EditFormNewRoute.extend(FdLoadingForTransitionMixin, {
  modelProjection: 'EditExternal',
  modelName: 'fd-dev-class',
  templateName: 'fd-external-edit-form',
});
