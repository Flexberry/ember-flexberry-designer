import Ember from 'ember';

/**
  Add to form checking unsaved data when transition.

  @example
  To enable the check unsaved data for transition, you need to connect this mixin to form:

  ```javascript
  import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';
  export default Ember.Route.extend(FdFormCheckTransitionMixin, {
  });
  ```

  In template need in <form> add class {{state}}:

  ```handlebars
  <form class="ui form flexberry-vertical-form {{state}}" role="form">
  ```

  @class FdFormCheckTransitionMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
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
      let controller = this.get('controller');
      if (controller.findUnsavedFormData()) {
        this.send('showModalDialog', 'modal/save', { controller });
        controller.set('abortedTransition', transition);
        transition.abort();
      }
    }
  }
});
