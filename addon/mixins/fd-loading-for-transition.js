import Ember from 'ember';

/**
  Add loading for transitions from edit form.

  @example
  To enable the loading for transitions, you need to connect this mixin to the edit form:

  ```javascript
  import FdLoadingForTransitionMixin from '../mixins/fd-loading-for-transition';
  export default Ember.Route.extend(FdLoadingForTransitionMixin, {
  });
  ```

  @class FdLoadingForTransitionMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({

  /**
    Service for managing the state of the application.
    @property appState
    @type AppStateService
  */
  appState: Ember.inject.service(),

  /**
    A hook you can use to setup the controller for the current route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_setupController).

    @method setupController
    @param {Ember.Controller} controller
    @param {Object} model
   */
  setupController() {
    this._super(...arguments);
    this.get('appState').reset();
  },

  actions: {
    /**
      It sends message about transition to corresponding controller.

      The willTransition action is fired at the beginning of any attempted transition with a Transition object as the sole argument.
      [More info](http://emberjs.com/api/classes/Ember.Route.html#event_willTransition).

      @method actions.willTransition
      @param {Object} transition
     */
    willTransition(transition) {
      this._super(...arguments);
      if (this.get('appState.state') === '') {
        transition.abort();
        this.get('appState').loading();
        Ember.run.next(() => {
          transition.retry();
        });
      }
    },
  }
});
