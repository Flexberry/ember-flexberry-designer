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

  In template need in <form> add class {{state}}:

  ```handlebars
  <form class="ui form flexberry-vertical-form {{state}}" role="form">
  ```

  @class FdLoadingForTransitionMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({

  currentTransition: null,
  _forceTransition: false,

  /**
    Retry transition forced, when there are unsaved fields

    @method retryTransitionForced
  */
  retryTransitionForced() {
    this.set('_forceTransition', true);
    this.get('currentTransition').retry();
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_setupController).

    @method setupController
    @param {Ember.Controller} controller
    @param {Object} model
   */
  setupController(controller) {
    this._super(...arguments);
    controller.set('state', '');
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
      console.log('WILL TRANS');
      console.log(this.get('_forceTransition'));
      this.set('currentTransition', transition);
      let controller = this.controller
      let isUnsavedFields = controller.findUnsavedFields();
      let forcedTransition = this.get('_forceTransition');

      if (!isUnsavedFields || forcedTransition) {
        if (controller.get('state') === '') {
          transition.abort();
          controller.set('state', 'loading');
          Ember.run.later(() => {
            transition.retry();
          });
        }
      } else {
        transition.abort();
      }
    },

    didTransition() {
      console.log('DID TRANS');
      this.set('_forceTransition', false);
    }
  }
});
