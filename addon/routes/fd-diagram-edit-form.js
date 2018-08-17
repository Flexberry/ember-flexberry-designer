import EditFormRoute from 'ember-flexberry/routes/edit-form';
import FdLoadingForTransitionMixin from '../mixins/fd-loading-for-transition';

export default EditFormRoute.extend(FdLoadingForTransitionMixin, {

  modelProjection: 'FdUmlCad',

  modelName: 'fd-dev-uml-cad',

  actions: {
    /**
      Confirm transition with unsaved fields

      @method actions.confirmCloseUnsavedForm
    */
    confirmCloseUnsavedForm() {
      this.retryTransitionForced();
    }
  }
});
