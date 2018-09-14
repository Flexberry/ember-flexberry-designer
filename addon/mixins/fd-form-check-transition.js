import Ember from 'ember';

/**
  Add loading for transitions from edit form.

  @example
  To enable the loading for transitions, you need to connect this mixin to the edit form:

  ```javascript
  import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';
  export default Ember.Route.extend(FdFormCheckTransitionMixin, {
  });
  ```

<<<<<<< HEAD:addon/mixins/fd-form-check-transition.js
  In template need in <form> add class {{state}}:

  ```handlebars
  <form class="ui form flexberry-vertical-form {{state}}" role="form">
  ```

  @class FdFormCheckTransitionMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
=======
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

>>>>>>> develop:addon/mixins/fd-loading-for-transition.js
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
<<<<<<< HEAD:addon/mixins/fd-form-check-transition.js
      let controller = this.get('controller');
      if (controller.findUnsavedFormData()) {
        this.send('showModalDialog', 'modal/save', { controller });
        controller.set('abortedTransition', transition);
        transition.abort();
=======
      if (this.get('appState.state') === '') {
        transition.abort();
        this.get('appState').loading();
        Ember.run.next(() => {
          transition.retry();
        });
>>>>>>> develop:addon/mixins/fd-loading-for-transition.js
      }
    }
  }
});
