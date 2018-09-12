import EditFormRoute from 'ember-flexberry/routes/edit-form';
import FdLoadingForTransitionMixin from '../mixins/fd-loading-for-transition';

export default EditFormRoute.extend(FdLoadingForTransitionMixin, {

  modelProjection: 'FdUmlStd',

  modelName: 'fd-dev-uml-std',
});
