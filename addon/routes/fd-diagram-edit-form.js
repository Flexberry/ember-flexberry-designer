import EditFormRoute from 'ember-flexberry/routes/edit-form';
import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';

export default EditFormRoute.extend(FdFormCheckTransitionMixin, {

  modelProjection: 'FdDiagram',

  modelName: 'fd-diagram'
});
