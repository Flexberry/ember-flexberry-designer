import EditFormRoute from 'ember-flexberry/routes/edit-form';
import FdLoadingForTransitionMixin from '../mixins/fd-loading-for-transition';

export default EditFormRoute.extend(FdLoadingForTransitionMixin, {
  modelProjection: 'EditUserForm',
  modelName: 'fd-dev-class'
});
