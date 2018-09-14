import FdGenerationProcessFormRoute from '../fd-generation-process-form';
import FdLoadingForTransitionMixin from '../../mixins/fd-loading-for-transition';

export default FdGenerationProcessFormRoute.extend(FdLoadingForTransitionMixin, {
  templateName: 'fd-generation-process-form',

  /**
    A hook you can implement to convert the URL into the model for this route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_model).

    @method model
   */
  model() {
    return null;
  },
});
